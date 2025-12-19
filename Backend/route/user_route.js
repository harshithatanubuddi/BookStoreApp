import express from 'express';
import { signup } from '../controller/user_controller.js';
import { login } from '../controller/user_controller.js'; 
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();
//router.post("/book", protect, createBook);
//router.get("/cart", protect, getCart);

router.post('/signup', signup);
router.post('/login', login);

// 🔒 Protected route
router.get("/profile", protect, (req, res) => {
  res.json(req.user);
});

//export router
export default router;
