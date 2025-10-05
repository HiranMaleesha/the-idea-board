import { getDb } from '../config/firebase';
import { Idea, CreateIdeaDto, IdeaResponse } from '../models/idea.model';

const COLLECTION_NAME = 'ideas';

export class IdeaService {
  /**
   * Get all ideas sorted by upvotes (descending) and creation date
   */
  async getAllIdeas(): Promise<IdeaResponse[]> {
    try {
      const db = getDb();
      // Simple query without composite index requirement
      const snapshot = await db
        .collection(COLLECTION_NAME)
        .orderBy('createdAt', 'desc')
        .get();

      const ideas: IdeaResponse[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        ideas.push({
          id: doc.id,
          text: data.text,
          upvotes: data.upvotes,
          createdAt: data.createdAt.toDate().toISOString(),
          updatedAt: data.updatedAt.toDate().toISOString(),
        });
      });

      return ideas;
    } catch (error) {
      console.error('Error getting ideas:', error);
      throw new Error('Failed to fetch ideas');
    }
  }

  /**
   * Create a new idea
   */
  async createIdea(createIdeaDto: CreateIdeaDto): Promise<IdeaResponse> {
    try {
      const db = getDb();
      const now = new Date();

      const ideaData: Omit<Idea, 'id'> = {
        text: createIdeaDto.text.trim(),
        upvotes: 0,
        createdAt: now,
        updatedAt: now,
      };

      const docRef = await db.collection(COLLECTION_NAME).add(ideaData);
      const doc = await docRef.get();
      const data = doc.data()!;

      return {
        id: doc.id,
        text: data.text,
        upvotes: data.upvotes,
        createdAt: data.createdAt.toDate().toISOString(),
        updatedAt: data.updatedAt.toDate().toISOString(),
      };
    } catch (error) {
      console.error('Error creating idea:', error);
      throw new Error('Failed to create idea');
    }
  }

  /**
   * Upvote an idea
   */
  async upvoteIdea(ideaId: string): Promise<IdeaResponse> {
    try {
      const db = getDb();
      const docRef = db.collection(COLLECTION_NAME).doc(ideaId);

      // Use transaction to ensure atomic increment
      const result = await db.runTransaction(async (transaction) => {
        const doc = await transaction.get(docRef);

        if (!doc.exists) {
          throw new Error('Idea not found');
        }

        const currentUpvotes = doc.data()!.upvotes || 0;
        transaction.update(docRef, {
          upvotes: currentUpvotes + 1,
          updatedAt: new Date(),
        });

        return {
          id: doc.id,
          ...doc.data(),
          upvotes: currentUpvotes + 1,
        };
      });

      const updatedDoc = await docRef.get();
      const data = updatedDoc.data()!;

      return {
        id: updatedDoc.id,
        text: data.text,
        upvotes: data.upvotes,
        createdAt: data.createdAt.toDate().toISOString(),
        updatedAt: data.updatedAt.toDate().toISOString(),
      };
    } catch (error) {
      console.error('Error upvoting idea:', error);
      if (error instanceof Error && error.message === 'Idea not found') {
        throw error;
      }
      throw new Error('Failed to upvote idea');
    }
  }

  /**
   * Get a single idea by ID
   */
  async getIdeaById(ideaId: string): Promise<IdeaResponse | null> {
    try {
      const db = getDb();
      const doc = await db.collection(COLLECTION_NAME).doc(ideaId).get();

      if (!doc.exists) {
        return null;
      }

      const data = doc.data()!;
      return {
        id: doc.id,
        text: data.text,
        upvotes: data.upvotes,
        createdAt: data.createdAt.toDate().toISOString(),
        updatedAt: data.updatedAt.toDate().toISOString(),
      };
    } catch (error) {
      console.error('Error getting idea:', error);
      throw new Error('Failed to fetch idea');
    }
  }
}
