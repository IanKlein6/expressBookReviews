const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

// Register user
public_users.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required" });
  }

  if (isValid(username)) {
    return res.status(409).json({ message: "Username is already taken" });
  }

  const newUser = { username, password };

  users.push(newUser);

  return res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get('/books', function (req, res) {
  res.send(JSON.stringify({ books }, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books.hasOwnProperty(isbn)) {
    const book = books[isbn];
    return res.json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Get book details based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;
  const booksByAuthor = Object.values(books).filter(book => book.author === author);

  if (booksByAuthor.length > 0) {
    return res.send(JSON.stringify({ booksByAuthor }, null, 4));
  } else {
    return res.status(404).json({ message: "No books found for the author" });
  }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
  const title = req.params.title;
  const booksByTitle = Object.values(books).filter(book => book.title === title);

  if (booksByTitle.length > 0) {
    return res.send(JSON.stringify({ booksByTitle }, null, 4));
  } else {
    return res.status(404).json({ message: "No books found with the title" });
  }
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;

  if (books.hasOwnProperty(isbn)) {
    const book = books[isbn];
    if (book.hasOwnProperty("reviews")) {
      const reviews = book.reviews;
      return res.json(reviews);
    } else {
      return res.status(404).json({ message: "No reviews found for the book" });
    }
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

module.exports = {
  general: public_users
};
