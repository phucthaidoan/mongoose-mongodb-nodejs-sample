const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/sampledb', (error) => {
    if(error) {
        throw error;
    }
    console.log('Successfully connected.');
});

const authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        firstName: String,
        lastname: String
    },
    biography: String,
    twitter: String,
    facebook: String,
    linkedin: String,
    profilePicture: Buffer,
    created: {
        type: Date,
        default: Date.now
    }
});

const bookSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    summary: String,
    isbn: String,
    thumbnail: Buffer,
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    ratings: [
        {
            summary: String,
            detail: String,
            numberOfStars: Number,
            created: {
                type: Date,
                default: Date.now
            }
        }
    ],
    created: {
        type: Date,
        default: Date.now
    }
});

const Author = mongoose.model('Author', authorSchema);
const Book = mongoose.model('Book', bookSchema);

const headAuthor = new Author({
    _id: new mongoose.Types.ObjectId(),
    name: {
        firstName: 'Head',
        lastName: 'First'
    },
    biography: 'Head First ebooks serires',
    twitter:  'https://twitter.com/headfirst',
    facebook: 'https://www.facebook.com/headFirst/'
});

headAuthor.save(err => {
    if(err) {
        throw err;
    }

    console.log('Author successfully saved.');

    const headFirstJava = new Book({
        _id: new mongoose.Types.ObjectId(),
        title: 'Head First Java',
        author: headAuthor._id,
        ratings:[{
            summary: 'Great read'
        }        ]
    });

    headFirstJava.save(err => {
        if(err) {
            throw err;
        }
        console.log('Book successfully saved.');
    })
});