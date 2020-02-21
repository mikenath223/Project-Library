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
  const len = myLibrary.length;
  const element = document.createElement('h1');
  element.innerHTML = myLibrary[len - 1].info();
  getLibrary.appendChild(element);
}

render();

function displayLibrary() {
  const submitBut = document.getElementById('submit');
  document.getElementById('form').onsubmit = (e) => e.preventDefault();
  submitBut.addEventListener('click', () => {
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const pages = document.querySelector('#pages').value;
    const readElem = document.querySelectorAll('input[type="radio"]');
    let readStatus;
    readElem.forEach((elem, i) => {
      if (readElem[i].checked) {
        readStatus = readElem[i].value;
      }
    });

    const checkLen = (inputVal) => {
      if (inputVal.length >= 1) {
        return true;
      }
      return false;
    };

    function callRenderOnValid() {
      if (checkLen(title) && checkLen(author) && checkLen(pages)) {
        addBookToLibrary(title, author, pages, readStatus);
        render();
      }
    }

    callRenderOnValid();
  });
}

displayLibrary();