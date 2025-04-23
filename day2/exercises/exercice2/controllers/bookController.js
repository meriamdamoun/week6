const Book = require('../models/book');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.bookId);
    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, publishedYear } = req.body;
    
    if (!title || !author || !publishedYear) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    const newBook = await Book.create({ title, author, publishedYear });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const updates = req.body;
    
    const [updated] = await Book.update(updates, {
      where: { id: bookId }
    });
    
    if (updated) {
      const updatedBook = await Book.findByPk(bookId);
      res.status(200).json(updatedBook);
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const bookId = req.params.bookId;
    const deleted = await Book.destroy({
      where: { id: bookId }
    });
    
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};