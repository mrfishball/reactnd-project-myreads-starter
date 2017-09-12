import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBook from './SearchBook'
import Book from './Book'
import './App.css'

class BooksApp extends Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState((state) => {
        state = books.reduce((data, book) => {
          data[book.shelf] = data[book.shelf] || []
          data[book.shelf].push(book)
          return data
        }, state)
      })
    })
  }

  updateShelf = (book, shelf) => {
    if (book.shelf && book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        BooksAPI.get(book.id).then((theBook) => {
          this.setState((state) => {
            state[book.shelf] = state[book.shelf].filter((data) => {
              return data !== book
            })
            state[shelf].push(theBook)
          })
        })
      })
    } else {
      BooksAPI.update(book, shelf).then(() => {
        BooksAPI.get(book.id).then((theBook) => {
          this.setState((state) => {
            state[shelf].push(theBook)
          })
        })
      })
    }
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <Book
                        books={this.state.currentlyReading}
                        onUpdateShelf={(book, shelf) => {
                            this.updateShelf(book, shelf)
                          }}
                      />
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <Book
                        books={this.state.wantToRead}
                        onUpdateShelf={(book, shelf) => {
                            this.updateShelf(book, shelf)
                          }}
                      />
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      <Book
                        books={this.state.read}
                        onUpdateShelf={(book, shelf) => {
                            this.updateShelf(book, shelf)
                          }}
                      />
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link
                to="/search"
              >Open Search</Link>
            </div>
          </div>
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBook
            shelves={this.state}
            onUpdateShelf={(book, shelf) => {
                this.updateShelf(book, shelf)
                // history.push('/')
              }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
