import express from "express";
import Item from "../models/Item.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// 🔥 FILE LOAD CHECK
console.log("✅ ITEM ROUTES FILE LOADED");

// 🔥 ROUTER MIDDLEWARE CHECK
router.use((req, res, next) => {
  console.log("➡️ Item route accessed:", req.method, req.originalUrl);
  next();
});


// ================= ADD ITEM =================
router.post("/items", authMiddleware, async (req, res) => {
  try {
    console.log("🟢 POST /items HIT");

    const { itemName, type } = req.body;

    if (!itemName || !type) {
      return res.status(400).json({ message: "itemName and type required" });
    }

    const item = new Item({
      ...req.body,
      user: req.user.id
    });

    const savedItem = await item.save();

    res.status(201).json(savedItem);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});


// ================= GET ITEMS =================
router.get("/items", async (req, res) => {
  try {
    console.log("🔵 GET /items HIT");

    const items = await Item.find().populate("user", "name email");
    res.json(items);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// ================= UPDATE ITEM =================
router.put("/items/:id", authMiddleware, async (req, res) => {
  try {
    console.log("🟡 PUT ROUTE HIT");
    console.log("ID:", req.params.id);
    console.log("BODY:", req.body);
    console.log("USER:", req.user);

    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    if (item.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updatedItem = await Item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedItem);

  } catch (error) {
    console.log("❌ ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});

export default router;