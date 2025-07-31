const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const productRoutes = require("./routes/productRoutes");
const contactRoutes = require("./routes/contactRoutes");
const photoRoutes = require("./routes/photoRoutes");
const orderRoutes = require("./routes/orderRoutes");
const userRoutes = require("./routes/userRoutes");


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: [
      "https://cannibal-co-frontend.vercel.app", // Your production frontend URL
      "https://cannibalco.com",
      "http://localhost:3000", // Local development frontend URL
      "http://localhost:5173", // Vite's default development URL
      "https://canibale-production-lexient-5plu-wolferlks-projects.vercel.app/"//testcanibal
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" })); // Increased payload limit for image uploads

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Example route
app.get("/", (req, res) => {
  res.send("Hello from the backend");
});

app.use("/api/products", productRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/photos", photoRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);


// Start the server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
module.exports = app; // Export the app for testing purposes