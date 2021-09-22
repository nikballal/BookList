//Book Constructor
function Book(title, author, isbn) {
  this.title = title
  this.author = author
  this.isbn = isbn
}

//UI Constructor
function UI() {}

//Add Book to List
UI.prototype.addBookToList = function (book) {
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

//show alert
UI.prototype.showAlert = function (message, className) {
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

//Delete Book
UI.prototype.deleteBook = function (target) {
  if (target.className === 'delete') {
    target.parentElement.parentElement.remove()
  }
}

//Clear Fields
UI.prototype.clearFields = function () {
  document.getElementById('title').value = ''
  document.getElementById('author').value = ''
  document.getElementById('isbn').value = ''
}

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

  //Validate
  if (title === '' || author === '' || isbn === '') {
    //Error alert
    ui.showAlert('Please fill in all fields', 'error')
  } else {
    //Add book to list
    ui.addBookToList(book)
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

  //show an alert

  ui.showAlert('Book is removed', 'success')
  e.preventDefault()
})
