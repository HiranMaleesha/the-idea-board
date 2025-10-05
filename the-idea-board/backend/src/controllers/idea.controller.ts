import { Request, Response } from 'express';
import { IdeaService } from '../services/idea.service';

const ideaService = new IdeaService();

export class IdeaController {
  /**
   * GET /api/ideas
   * Get all ideas
   */
  async getAllIdeas(req: Request, res: Response): Promise<void> {
    try {
      const ideas = await ideaService.getAllIdeas();
      res.status(200).json({
        success: true,
        data: ideas,
        count: ideas.length,
      });
    } catch (error) {
      console.error('Error in getAllIdeas:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch ideas',
      });
    }
  }

  /**
   * POST /api/ideas
   * Create a new idea
   */
  async createIdea(req: Request, res: Response): Promise<void> {
    try {
      const { text } = req.body;

      // Validation
      if (!text || typeof text !== 'string') {
        res.status(400).json({
          success: false,
          error: 'Text is required and must be a string',
        });
        return;
      }

      const trimmedText = text.trim();

      if (trimmedText.length === 0) {
        res.status(400).json({
          success: false,
          error: 'Text cannot be empty',
        });
        return;
      }

      if (trimmedText.length > 280) {
        res.status(400).json({
          success: false,
          error: 'Text must be 280 characters or less',
        });
        return;
      }

      const idea = await ideaService.createIdea({ text: trimmedText });
      res.status(201).json({
        success: true,
        data: idea,
      });
    } catch (error) {
      console.error('Error in createIdea:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to create idea',
      });
    }
  }

  /**
   * POST /api/ideas/:id/upvote
   * Upvote an idea
   */
  async upvoteIdea(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: 'Idea ID is required',
        });
        return;
      }

      const idea = await ideaService.upvoteIdea(id);
      res.status(200).json({
        success: true,
        data: idea,
      });
    } catch (error) {
      console.error('Error in upvoteIdea:', error);
      
      if (error instanceof Error && error.message === 'Idea not found') {
        res.status(404).json({
          success: false,
          error: 'Idea not found',
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: 'Failed to upvote idea',
      });
    }
  }

  /**
   * GET /api/ideas/:id
   * Get a single idea
   */
  async getIdeaById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: 'Idea ID is required',
        });
        return;
      }

      const idea = await ideaService.getIdeaById(id);

      if (!idea) {
        res.status(404).json({
          success: false,
          error: 'Idea not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: idea,
      });
    } catch (error) {
      console.error('Error in getIdeaById:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to fetch idea',
      });
    }
  }
}
