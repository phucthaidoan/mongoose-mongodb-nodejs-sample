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
        firstName: {
            type: String,
            required: true
        },
        lastname: String
    },
    biography: String,
    twitter: {
        type: String,
        validate: {
            validator: function(text) {
                return text.indexOf('https://twitter.com/') === 0;
            },
            message: 'Twitter handle must start with https://twitter.com/'
        }
    },
    facebook: {
        type: String,
        validate: {
            validator: function(text) {
                return text.indexOf('https://www.facebook.com/') === 0;
            },
            message: 'Twitter handle must start with https://www.facebook.com/'
        }
    },
    linkedin: {
        type: String,
        validate: {
            validator: function(text) {
                return text.indexOf('https://www.linkedin.com/') === 0;
            },
            message: 'Twitter handle must start with https://www.linkedin.com/'
        }
    },
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

// ===========================================
// sample: creating and saving Mongoose models
// ===========================================
/*const headAuthor = new Author({
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
});*/

// ===========================================
// sample: Validating Data Before Saving
// ===========================================
/*const invalidAuthor = new Author({
    _id: new mongoose.Types.ObjectId(),
    name: {        
        lastName: 'First'
    },
    biography: 'Head First ebooks serires',
    twitter:  'https://notwitter.com/headfirst',
    facebook: 'https://www.nofacebook.com/headFirst/'
});

invalidAuthor.save(err => {
    if(err) {
        throw err;
    }    
    console.log('Author successfully saved - invalidAuthor.');
});*/

// ===========================================
// sample: searching for and updating data
// ===========================================
/*Author.findById('5a4f5a5ddc57464a384e1248', (err, author) => {
    if(err) {
        throw err;
    }

    author.biography = `Author's biography content11.`;
    author.save(author, (err) => {
        console.log('Author updated successfully');
    });

    console.log('AUTHORS: ', author);
});*/

// searching for with projection
Author.findById(
    '5a4f5a5ddc57464a384e1248', 
    {'_id': true, 'name.firstName': true}, 
    (err, author) => {
    if(err) {
        throw err;
    }

    author.biography = `Author's biography content11.`;
    author.save(author, (err) => {
        console.log('Author updated successfully');
    });

    console.log('AUTHORS: ', author);
});

/*Author.findByIdAndUpdate(
    '5a4f5a5ddc57464a384e1248', 
    {name: {firstName: 'Author first name updated 6699'}},
    {new: true},
    (err, author) => {
        if(err) {
            throw err;
        }
        console.log('Author is updated: ', author);
    });*/


/*
Book
    .find({
        title: /Head/i
    })
    .sort('-created')
    .limit(10)
    .exec((err, books) => {
        if(err) {
            throw err;
        }

        console.log('BOOKS: ', books);
    });*/
