import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired
  }

  render() {
    const { title, books, onChangeBookshelf } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          {(!books || books.length === 0) ?
            (<div className="empty-list">
              Empty list
            </div>)
            :
            (<ol className="books-grid">
              {books && books.map((book) => (
                <li key={book.id}>
                  <Book book={book} onChangeBookshelf={onChangeBookshelf} />
                </li>
              ))}
            </ol>
            )}
        </div>
      </div>
    )
  }
}

export default BookShelf
