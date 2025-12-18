import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bookRoutes from './route/book_route.js';
import cors from 'cors';
import userRoutes from './route/user_route.js';
<<<<<<< HEAD
import adminRoutes from "./route/admin_route.js";
import orderRoutes from "./route/order_route.js";
=======
>>>>>>> e44d56a5e35b07ef50c9cefef0127706e2cffc5f

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
<<<<<<< HEAD
app.use("/admin", adminRoutes);
app.use("/book", bookRoutes);
app.use("/api/orders", orderRoutes);

=======
>>>>>>> e44d56a5e35b07ef50c9cefef0127706e2cffc5f

const port = process.env.PORT || 4000;

const URI = process.env.MongoDB_URI;

// Connect to MongoDB
mongoose.connect(URI, {
  dbName: "bookstore"
}).then(() => console.log("Connected to MongoDB"))
  .catch(error => console.error("Error connecting to MongoDB:", error));

app.get('/', (req, res) => {
  res.send("MERN Project hi");
});

//define book routes
app.use('/book', bookRoutes);
//define user routes
app.use('/user', userRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
