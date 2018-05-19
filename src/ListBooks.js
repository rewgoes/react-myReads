import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './Bookshelf';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired 
  }

  render() {
    const bookshelves = this.props.books.reduce((shelves, book) => {
      if (!shelves[book.shelf]) {
        shelves[book.shelf] = [];
      }
      shelves[book.shelf].push(book);

      return shelves;
    }, {
        currentlyReading: [],
        wantToRead: [],
        read: []
      })

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf title="Currently Reading" books={bookshelves.currentlyReading} onChangeBookshelf={this.props.onChangeBookshelf} />
          <BookShelf title="Want to Read" books={bookshelves.wantToRead} onChangeBookshelf={this.props.onChangeBookshelf} />
          <BookShelf title="Read" books={bookshelves.read} onChangeBookshelf={this.props.onChangeBookshelf} />
        </div>
        <div className="open-search">
          <Link
            to="/search"
          >Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks