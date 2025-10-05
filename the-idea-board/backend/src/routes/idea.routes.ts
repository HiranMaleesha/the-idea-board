import { Router } from 'express';
import { IdeaController } from '../controllers/idea.controller';

const router = Router();
const ideaController = new IdeaController();

// GET /api/ideas - Get all ideas
router.get('/', (req, res) => ideaController.getAllIdeas(req, res));

// GET /api/ideas/:id - Get a single idea
router.get('/:id', (req, res) => ideaController.getIdeaById(req, res));

// POST /api/ideas - Create a new idea
router.post('/', (req, res) => ideaController.createIdea(req, res));

// POST /api/ideas/:id/upvote - Upvote an idea
router.post('/:id/upvote', (req, res) => ideaController.upvoteIdea(req, res));

export default router;
