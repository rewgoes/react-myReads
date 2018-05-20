import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: {},
    bookshelves: {},
    loading: true
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks() {
    this.setState({ loading: true })
    BooksAPI.getAll().then(allBooks => {
      /**
       * Spit allBooks into a bookshelves and a map of books
       */
      const bookshelves = {}
      bookshelves.currentlyReading = []
      bookshelves.wantToRead = []
      bookshelves.read = []

      const books = allBooks.reduce((map, book) => {
        bookshelves[book.shelf].push(book.id)
        map[book.id] = book
        return map;
      }, {})
      this.setState({ books, bookshelves, loading: false })
    });
  }

  changeBookShelf = (book, shelf) => {
    this.setState({ loading: true })
    BooksAPI.update(book, shelf).then(bookshelves => {
      /**
       * Modify state manually instead of calling BooksAPI.getAll()
       * 
       * TODO: does if affect performance?
       */
      const books = this.state.books

      if (shelf === "none") {
        delete books[book.id]
      } else {
        books[book.id] = book
        books[book.id].shelf = shelf
      }
      this.setState({ books, bookshelves, loading: false })
    })
  }

  render() {
    const { books, bookshelves, loading } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={books} bookshelves={bookshelves} onChangeBookshelf={this.changeBookShelf} />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks userBooks={books} onChangeBookshelf={this.changeBookShelf} />
        )} />
        {loading && (
          <div className="loading" />
        )}
      </div>
    )
  }
}

export default BooksApp
