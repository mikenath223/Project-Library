const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = status;
  this.info = () => `Book Title: ${title}, Author: ${author}, Pages: ${pages}, Book Read?: ${status}.`;
}

function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
}

addBookToLibrary('Gulliver Travels', 'Chistopher Nolan', 50, true);
