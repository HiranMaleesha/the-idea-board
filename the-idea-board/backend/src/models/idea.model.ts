export interface Idea {
  id?: string;
  text: string;
  upvotes: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateIdeaDto {
  text: string;
}

export interface IdeaResponse {
  id: string;
  text: string;
  upvotes: number;
  createdAt: string;
  updatedAt: string;
}
