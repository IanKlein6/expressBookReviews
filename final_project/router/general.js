const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/books',function (req, res) {
    res.send(JSON.stringify({books}, null, 4));  
  return res.status(300).json({message: "Books not found"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  
  if(books.hasOwnProperty(isbn)) {
    const book = books[isbn];
    res.json(book);
  } else {
    return res.status(300).json({message: "Book not found"});
  }
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let booksbyauthor = [];
  let isbns = Object.keys(books);
  isbns.forEach((isbn) => {
    if(books[isbn]["author"] === req.params.author) {
      booksbyauthor.push({"isbn":isbn,
                          "title":books[isbn]["title"],
                          "reviews":books[isbn]["reviews"]});
    }
  });
  res.send(JSON.stringify({booksbyauthor}, null, 4));
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  let booksbytitle = [];
  let isbns = Object.keys(books);
  let bookFound = false; // Flag to track if any matching book is found

  isbns.forEach((isbn) => {
    if (books[isbn]["title"] === req.params.title) {
      booksbytitle.push({
        "isbn": isbn,
        "author": books[isbn]["author"],
        "reviews": books[isbn]["reviews"]
      });
      bookFound = true; // Set the flag to true if a matching book is found
    }
  });

  if (bookFound) {
    res.send(JSON.stringify({ booksbytitle }, null, 4));
  } else {
    res.status(404).json({ message: "Book not found" });
  }
});


//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
