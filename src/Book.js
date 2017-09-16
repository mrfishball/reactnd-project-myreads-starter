import React, { Component } from 'react'

class Book extends Component {

  handleShelfUpdate = (book, shelf) => {
    if (this.props.onUpdateShelf)
      this.props.onUpdateShelf(book, shelf)
      alert("Success! " + book.title + " has been moved to the " + shelf + " shelf.")
  }

  handleGetShelf = (id) => {
    if (this.props.selectValue)
    return this.props.selectValue(id)
  }

  getImgURL = (book) => {
    let imgURL = book.imageLinks ? book.imageLinks.thumbnail : "http://d28hgpri8am2if.cloudfront.net/book_images/no_book_cover_hr.jpg"
    return { width: 128, height: 193, backgroundImage: `url(${imgURL})`, backgroundSize: "cover"}
  }

  render() {
    return (
      <ol className="books-grid">
        {this.props.books && this.props.books.length > 0 ? this.props.books.map((book) => (
          <li key={book.id}>
            <div className="book">
              <div className="book-top">
                <div className="book-cover" style={this.getImgURL(book)}></div>
                <div className="book-shelf-changer">
                  <select defaultValue={ book.shelf ? book.shelf : this.handleGetShelf(book.id) } onChange={(event) => this.handleShelfUpdate(book, event.target.value)}>
                    <option value="none" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                  </select>
                </div>
              </div>
              <div className="book-title">{book.title}</div>
              <div className="book-authors">{book.authors && book.authors.length > 1 ? book.authors.join(", ") : book.authors}</div>
            </div>
          </li>
        )): "Add more books and start reading now!"}
      </ol>
    )
  }
}

export default Book
