import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBook from './SearchBook'
import Book from './Book'
import './App.css'

class BooksApp extends Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }
  componentDidMount() {
    this.groupingBooks()
  }

  groupingBooks = () => {
    BooksAPI.getAll().then((books) => {
      books.forEach((book) => {
        if (book.shelf === "currentlyReading") {
          this.setState((state) => ({
            currentlyReading: state.currentlyReading.concat([ book ])
          }))
        } else if (book.shelf === "wantToRead") {
          this.setState((state) => ({
            wantToRead: state.wantToRead.concat([ book ])
          }))
        } else {
          this.setState((state) => ({
            read: state.read.concat([ book ])
          }))
        }
      })
    })
  }

  updateShelf = (book, shelf) => {
    if (book.shelf !== shelf) {
      BooksAPI.update(book, shelf).then(() => {
        this.setState({
          currentlyReading: [],
          wantToRead: [],
          read: []
        })
      })
    }
    this.groupingBooks()
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
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
