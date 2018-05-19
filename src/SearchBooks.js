import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book';
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    userBooks: PropTypes.object.isRequired,
    onChangeBookshelf: PropTypes.func.isRequired 
  }

  state = {
    query: '',
    books: []
  }

  serchBooks = (query) => {
    this.setState({ query: query })
    if (query) {
      BooksAPI.search(query).then(books => {
        if (books.error) {
          this.setState({ books: [] })
        } else {
          /**
           * Set book's bookshelf
           */
          books.forEach(book => {
            const findBook = this.props.userBooks[book.id]
            findBook && (book.shelf = findBook.shelf)
          })
          this.setState({ books: books })
        }
      })
    } else {
      this.setState({ books: [] })
    }
  }

  componentDidMount() {
    this.searchInput.focus();
  }

  render() {
    const { books, query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              ref={(input) => {
                this.searchInput = input;
              }}
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.serchBooks(event.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books && books.map((book) => (
              <li key={book.id}>
                <Book book={book} onChangeBookshelf={this.props.onChangeBookshelf} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks