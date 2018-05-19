import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import ListBooks from './ListBooks.js'
import SearchBooks from './SearchBooks.js'
import * as BooksAPI from './BooksAPI'
import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.getAllBooks()
  }

  getAllBooks() {
    BooksAPI.getAll().then(books => {
      this.setState({ books })
    });
  }

  changeBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.getAllBooks()
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks books={this.state.books} onChangeBookshelf={this.changeBookShelf} />
        )} />
        <Route path="/search" render={() => (
          <SearchBooks userBooks={this.state.books} onChangeBookshelf={this.changeBookShelf} />
        )} />
      </div>
    )
  }
}

export default BooksApp
