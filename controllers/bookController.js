/* eslint-disable no-underscore-dangle */
function bookController(Book) {
  function post(req, res) {
    const book = new Book(req.body);

    if (!req.body.title) {
      res.status(400);
      return res.send('Title is required');
    }

    book.save((err) => {
      if (err) {
        return res.send(err);
      }
      res.status(201);
      return res.json(book);
    });
  }

  function get(req, res) {
    const query = {};
    if (req.query.genre) {
      query.genre = req.query.genre;
    }
    if (req.query.author) {
      query.author = req.query.author;
    }
    Book.find(query, (err, books) => {
      if (err) {
        return res.send(err);
      }
      const returnBooks = books.map((book) => {
        const returnBook = book.toJSON();
        returnBook.links = {};
        returnBook.links.self = `http://${req.headers.host}/api/books/${book._id}`;
        return returnBook;
      });
      return res.json(returnBooks);
    });
  }

  return { post, get };
}

module.exports = bookController;
