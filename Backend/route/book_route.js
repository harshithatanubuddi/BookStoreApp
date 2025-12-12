import express from 'express';
import { getBooks } from '../controller/book_controller.js';
const router = express.Router();

router.get('/', getBooks);
export default router;