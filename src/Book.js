import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired
  }

  render() {
    const { book, onChangeBookshelf } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={
            {
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
            }
          }></div>
          <div className="book-shelf-changer">
            {!book.imageLinks && console.log(book)}
            <select defaultValue={book.shelf ? book.shelf : "none"} onChange={(event) => onChangeBookshelf(book, event.target.value)}>
              <option value="moveTo" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && book.authors.map(author => (
          <div key={author} className="book-authors">{author}</div>
        ))}
      </div>
    )
  }
}

export default Book