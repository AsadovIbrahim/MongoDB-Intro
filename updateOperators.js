const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    age: Number,
    joinedDate: Date,
    tags: [String]
}));

// Using update operators with Mongoose
async function updateUser(userId) {
    try {
        // $currentDate: Sets the field value to the current date
        await User.updateOne({ _id: userId }, { $currentDate: { joinedDate: true } });

        // $inc: Increments the field value
        await User.updateOne({ _id: userId }, { $inc: { age: 1 } });

        // $rename: Renames the field
        await User.updateOne({ _id: userId }, { $rename: { name: "fullName" } });

        // $set: Sets the value of a field
        await User.updateOne({ _id: userId }, { $set: { age: 30 } });

        // $unset: Removes the field from the document
        await User.updateOne({ _id: userId }, { $unset: { age: "" } });
    } catch (err) {
        console.error("Error updating user:", err);
    }
}


// For Arrays

async function updateUserArray(userId) {
    try {
        // $addToSet: Adds distinct elements to an array
        await User.updateOne({ _id: userId }, { $addToSet: { tags: "newTag" } });

        // $pop: Removes the first or last element of an array
        await User.updateOne({ _id: userId }, { $pop: { tags: 1 } });  // -1 for first element, 1 for last

        // $pull: Removes all elements from an array that match the query
        await User.updateOne({ _id: userId }, { $pull: { tags: "oldTag" } });

        // $push: Adds an element to an array
        await User.updateOne({ _id: userId }, { $push: { tags: "anotherTag" } });
    } catch (err) {
        console.error("Error updating user array:", err);
    }
}
