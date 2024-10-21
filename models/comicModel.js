const mongoose = require('mongoose');

// Define the Book schema
const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true, 
        trim: true
    },
    authorName: {
        type: String,
        required: true,
        trim: true
    },
    yearOfPublication: {
        type: Number,
        required: true 
    },
    price: {
        type: Number,
        required: true 
    },
    discount: {
        type: Number,
        default: 0 
    },
    numberOfPages: {
        type: Number,
        required: true
    },
    condition: {
        type: String,
        enum: ['new', 'used'], 
        required: true 
    },
    description: {
        type: String,
        trim: true 
    },
    publisher: {
        type: String, 
        trim: true
    },
    language: {
        type: String, 
        trim: true
    },
    stock: {
        type: Number,
        default: 0 
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
