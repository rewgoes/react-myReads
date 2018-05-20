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
          <div ref={book.id} type="button" className="book-cover btn btn-info btn-lg" style={
            {
              width: 128,
              height: 193,
              backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
            }
          } data-toggle="modal" data-target={`#modal${book.id}`} />
          <div id={`modal${book.id}`} className="modal fade" role="dialog">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                  <h4 className="modal-title">{book.title}</h4>
                </div>
                <div className="modal-body">
                  <div className="modal-left">
                    <div className="book-cover" style={
                      {
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})`
                      }
                    } />
                    {book.authors && book.authors.map(author => (
                      <div key={author} className="book-authors">{author}</div>
                    ))}
                    {book.categories && (
                      <div>Categories: {book.categories}</div>
                    )}
                    {book.averageRating && (
                      <div>Rating: {book.averageRating}</div>
                    )}
                    {book.infoLink && (
                      <div><a href={book.infoLink} target="_blank">More info</a></div>
                    )}
                  </div>
                  <div className="modal-right">
                    {book.description}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                </div>
              </div>
            </div>
          </div>
          )}
          <div className="book-shelf-changer">
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