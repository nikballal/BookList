class Book {
  constructor(title, author, isbn) {
    this.title = title
    this.author = author
    this.isbn = isbn
  }
}

//include all the prototypes set in app.js
class UI {
  addBookToList(book) {
    const list = document.getElementById('book-list')
    //Create tr element
    const row = document.createElement('tr')
    //insert cols
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `
    list.appendChild(row)
  }
  showAlert(message, className) {
    //create div
    const div = document.createElement('div')
    //add class
    div.className = `alert ${className}`
    //add text
    div.appendChild(document.createTextNode(message))
    //get parent
    const container = document.querySelector('.container')
    //get form
    const form = document.querySelector('#book-form')
    //insert in between form and container
    container.insertBefore(div, form)
    //set timeout
    setTimeout(function () {
      document.querySelector('.alert').remove()
    }, 3000)
  }
  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove()
    }
  }
  clearFields() {
    document.getElementById('title').value = ''
    document.getElementById('author').value = ''
    document.getElementById('isbn').value = ''
  }
}

//Local Storage Class
class Store {
  static getBooks() {
    let books
    if (localStorage.getItem('books') === null) {
      books = []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books
  }

  static displayBooks() {
    const books = Store.getBooks()
    books.forEach(function (book) {
      //instantiate UI
      const ui = new UI()

      //Add book to UI
      ui.addBookToList(book)
    })
  }

  static addBook(book) {
    const books = Store.getBooks()
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
  }

  static removeBook(isbn) {
    const books = Store.getBooks()
    //loop through the books
    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1)
      }
    })
    localStorage.setItem('books', JSON.stringify(books))
  }
}

//DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks)

//Event Listener for add book
document.getElementById('book-form').addEventListener('submit', function (e) {
  //Get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

  //Instantiate book
  const book = new Book(title, author, isbn)

  //Instantiate UI
  const ui = new UI()
  console.log(ui)

  //Validate
  if (title === '' || author === '' || isbn === '') {
    //Error alert
    ui.showAlert('Please fill in all fields', 'error')
  } else {
    //Add book to list
    ui.addBookToList(book)
    //Add to local storage
    Store.addBook(book)
    ui.showAlert('Book has been added', 'success')
    //clear fields once added
    ui.clearFields()
  }

  e.preventDefault()
})

//Event Listener to delete book
document.getElementById('book-list').addEventListener('click', function (e) {
  //instantiate UI
  const ui = new UI()

  ui.deleteBook(e.target)

  //remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent) //this gives the ISBN number

  //show an alert

  ui.showAlert('Book is removed', 'success')
  e.preventDefault()
})
