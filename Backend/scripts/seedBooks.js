import mongoose from "mongoose";
import axios from "axios";
import dotenv from "dotenv";
import Book from "../model/book_model.js"


dotenv.config();

const queries = [
  // CSE
  { q: "Operating System Concepts Silberschatz", branch: "CSE", subject: "OS" },
  { q: "Database System Concepts Silberschatz", branch: "CSE", subject: "DBMS" },
  { q: "Computer Networks Kurose Ross", branch: "CSE", subject: "CN" },
  { q: "Introduction to Algorithms CLRS", branch: "CSE", subject: "Algorithms" },
  { q: "Theory of Computation Sipser", branch: "CSE", subject: "TOC" },

  // ECE
  { q: "Signals and Systems Oppenheim", branch: "ECE", subject: "Signals" },
  { q: "Control Systems Nagrath Gopal", branch: "ECE", subject: "Control" },
  { q: "Microelectronic Circuits Sedra Smith", branch: "ECE", subject: "Analog" },
  { q: "Digital Electronics Morris Mano", branch: "ECE", subject: "Digital" },

  // EE
  { q: "Electrical Machinery P S Bimbhra", branch: "EE", subject: "Machines" },
  { q: "Power System Analysis Hadi Saadat", branch: "EE", subject: "Power Systems" },
  { q: "Power Electronics Muhammad Rashid", branch: "EE", subject: "Power Electronics" },

  // ME
  { q: "Engineering Thermodynamics P K Nag", branch: "ME", subject: "Thermodynamics" },
  { q: "Strength of Materials Bansal", branch: "ME", subject: "SOM" },
  { q: "Heat Transfer Incropera", branch: "ME", subject: "Heat Transfer" },

  // CE
  { q: "Structural Analysis C S Reddy", branch: "CE", subject: "Structures" },
  { q: "Geotechnical Engineering K R Arora", branch: "CE", subject: "Geotech" },
  { q: "Environmental Engineering Peavy Row", branch: "CE", subject: "Environment" },

  // CH
  { q: "Chemical Engineering Thermodynamics Smith Van Ness", branch: "CH", subject: "Thermodynamics" },
  { q: "Chemical Reaction Engineering Levenspiel", branch: "CH", subject: "Reaction Engg" },

  // BT
  { q: "Bioprocess Engineering Shuler Kargi", branch: "BT", subject: "Bioprocess" },
  { q: "Molecular Biology of the Cell Alberts", branch: "BT", subject: "Cell Biology" }
];

async function seedBooks() {
  try {
    await mongoose.connect(process.env.MongoDB_URI, {
      dbName: "bookstore"
    });
    console.log("Connected to MongoDB for seeding");

    // clear existing books
    await Book.deleteMany({});

    const bookMap = new Map();

    for (const item of queries) {
      const res = await axios.get(
        "https://www.googleapis.com/books/v1/volumes",
        {
          params: {
            q: item.q,
            maxResults: 10,
            key: process.env.GOOGLE_BOOKS_API_KEY
          }
        }
      );

      for (const v of res.data.items || []) {
  const info = v.volumeInfo;

  const isbn = info.industryIdentifiers?.find(
    id => id.type === "ISBN_13"
  )?.identifier;

  if (!isbn) continue;
  if (bookMap.has(isbn)) continue;

  // REALISTIC PRICING LOGIC
  const pages = info.pageCount || 300;

  const price =
    pages < 300 ? 399 :
    pages < 500 ? 499 :
    pages < 700 ? 599 :
    699;

  bookMap.set(isbn, {
    title: info.title,
    author: info.authors?.join(", ") || "Unknown",
    isbn,
    examType: "GATE",
    branch: item.branch,
    subject: item.subject,
    image: info.imageLinks?.thumbnail || "",
    publicationYear: parseInt(info.publishedDate) || null,
    price,                    // CHANGED
    stockQuantity: 20,
    reorderLevel: 5
  });
}
    }

    const books = Array.from(bookMap.values());
    await Book.insertMany(books);

    console.log(`Seeded ${books.length} GATE books successfully`);
    process.exit(0);

  } catch (err) {
    console.error("❌ Seeding failed:", err.message);
    process.exit(1);
  }
}

seedBooks();
