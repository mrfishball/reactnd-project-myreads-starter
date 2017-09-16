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
      this.setState((state) => ({
        state: books.reduce((data, book) => {
          data[book.shelf] = data[book.shelf] || []
          data[book.shelf].push(book)
          return data
        }, state),
        books: books
      }))
    })
  }

  updateShelf = (book, shelf) => {
    let targetBook = this.state.books.filter((data) => data.id === book.id)[0]
    if (targetBook && targetBook.shelf !== shelf) {
      BooksAPI.update(targetBook, shelf).then(() => {
        BooksAPI.get(targetBook.id).then((theBook) => {
          this.setState((state) => ({
            [targetBook.shelf]: state[targetBook.shelf].filter((data) => data.id !== book.id),
            books: state.books.filter((data) => data.id !== book.id).concat([ theBook ]),
            [shelf]: state[shelf].concat([ theBook ])
          }))
        })
      })
    } else {
      BooksAPI.update(book, shelf).then(() => {
        BooksAPI.get(book.id).then((theBook) => {
          this.setState((state) => ({
            [shelf]: state[shelf].concat([ theBook ]),
            books: state.books.concat([ theBook ])
          }))
        })
      })
    }
  }

  render() {
    console.log(this.state.books)
    console.log(this.state)
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
            allBooks={this.state.books}
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
