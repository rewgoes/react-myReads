import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './Bookshelf';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.object.isRequired,
    bookshelves: PropTypes.object.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired
  }

  render() {
    const { books, bookshelves, onChangeBookshelf } = this.props

    /**
     * Change each book.id for its respective book
     */
    Object.keys(bookshelves).forEach((key) => {
      bookshelves[key] = bookshelves[key].map((bookId) => {
        return books[bookId]
      })
    })

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <BookShelf title="Currently Reading" books={bookshelves.currentlyReading || []} onChangeBookshelf={onChangeBookshelf} />
          <BookShelf title="Want to Read" books={bookshelves.wantToRead || []} onChangeBookshelf={onChangeBookshelf} />
          <BookShelf title="Read" books={bookshelves.read || []} onChangeBookshelf={onChangeBookshelf} />
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