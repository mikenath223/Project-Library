const myLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = status;
  this.info = function() {
    return `Book Title: ${title}, Author: ${author}, Pages: ${pages}, Book Read?: ${status}.`;
  };
}

let book = new Book('Gulliver Travels', 'Chistopher Nolan', 50, true);


function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  myLibrary.push(newBook);
}

addBookToLibrary('Gulliver Travels', 'Chistopher Nolan', 50, true);

console.log(myLibrary);
console.log(myLibrary[0].info());
