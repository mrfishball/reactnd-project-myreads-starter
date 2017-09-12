import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class SearchBook extends Component {
  state = {
    query: "",
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    this.searchBook(query)
  }

  searchBook = (query) => {
    if (!query) {
      this.setState({ books: [] })
    } else {
      BooksAPI.search(query).then((books) => {
        this.setState({ books })
      })
    }
  }

  handleShelfUpdate = (book, shelf) => {
    if (this.props.onUpdateShelf)
      this.props.onUpdateShelf(book, shelf)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            <Book
              books={this.state.books}
              onUpdateShelf={(book, shelf) => {
                  this.handleShelfUpdate(book, shelf)
                }}
            />
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBook
