const User = mongoose.model('User', new mongoose.Schema({
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
async function getLogicalResults() {
    const results = await Model.find()
        .and([
            { age: { $gte: 18 } },
            { $or: [{ status: "active" }, { status: "pending" }] },
            { $not: { status: { $eq: "inactive" } } },
            { $nor: [{ tags: "deprecated" }, { age: { $gt: 60 } }] },
        ]);
    return results;
}

// Element Operators: $exists, $type
async function getElementResults() {
    const results = await Model.find({
        age: { $exists: true }, // documents with the age field
        tags: { $type: "array" }, // tags field must be of type array
    });
    return results;
}

// Array Operators: $all, $elemMatch, $size
async function getArrayResults() {
    const results = await Model.find({
        tags: { $all: ["tech", "news"] }, // array must contain both "tech" and "news"
        tags: { $size: 2 }, // tags array must contain exactly 2 elements
        comments: {
            $elemMatch: { author: "John", likes: { $gt: 10 } },
        }, // element in comments array must match these conditions
    });
    return results;
}

// Evaluation Operator: $text
async function getTextResults() {
    const results = await Model.find({
        $text: { $search: "technology" }, // text search for documents with "technology" in description
    });
    return results;
}
