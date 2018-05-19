import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Book from './Book';
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    userBooks: PropTypes.array.isRequired,
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
          books.forEach(book => {
            var findBook = this.props.userBooks.find(userBook => book.id === userBook.id)
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
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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