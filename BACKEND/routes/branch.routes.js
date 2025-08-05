import express from 'express';
import { getAllBranches } from '../controllers/branch.controller.js';
const router = express.Router();

router.get('/', getAllBranches);

export default router;
