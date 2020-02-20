const myLibrary = [];
const getLibrary = document.querySelector('.my-books');

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
addBookToLibrary('Gulliver Travels II', 'Chistopher Nolan', 500, false);
addBookToLibrary('Gul Plays', 'Chisan Lopez', 150, true);



function render() {

    myLibrary.forEach(item =>  {
      
             
        let element = document.createElement('h1');
        element.innerHTML = item.info();
        getLibrary.appendChild(element)
        
    }
    )
}

render();