const User = mongoose.User('User', new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  status: { type: String, enum: ["active", "pending", "inactive"], required: true },
  tags: { type: [String], required: true },
  comments: [{
    author: { type: String, required: true },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 }
  }],
  description: { type: String, required: true },
  joinedDate: { type: Date, default: Date.now } // Added joinedDate field
}));


// Logical Operators: $and, $or, $not, $nor
app.get("/logical", async (req, res) => {
  const results = await User.find({
    $and: [
      { age: { $gte: 18 } },
      { $or: [{ status: "active" }, { status: "pending" }] },
      { $not: { status: { $eq: "inactive" } } },
      { $nor: [{ tags: "deprecated" }, { age: { $gt: 60 } }] },
    ],
  });
  res.json(results);
});

// Element Operators: $exists, $type
app.get("/element", async (req, res) => {
  const results = await User.find({
    age: { $exists: true }, // documents with the age field
    tags: { $type: "array" }, // tags field must be of type array
  });
  res.json(results);
});

// Array Operators: $all, $elemMatch, $size
app.get("/array", async (req, res) => {
  const results = await User.find({
    tags: { $all: ["tech", "news"] }, // array must contain both "tech" and "news"
    tags: { $size: 2 }, // tags array must contain exactly 2 elements
    comments: {
      $elemMatch: { author: "John", likes: { $gt: 10 } },
    }, // element in comments array must match these conditions
  });
  res.json(results);
});

// Evaluation Operator: $text
app.get("/text", async (req, res) => {
  const results = await User.find({
    $text: { $search: "technology" }, // text search for documents with "technology" in description
  });
  res.json(results);
});

