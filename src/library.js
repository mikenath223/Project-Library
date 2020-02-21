const myLibrary = [];
const selectQuery = (query) => document.querySelector(query);
const createElement = (elem) => { return document.createElement(elem)};
const appendChild = (parent, child) => { return parent.appendChild(child)};

const getLibrary = selectQuery('.my-books');

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readToggle = (stats) => this.read = stats;
  this.info = () => `Book Title: ${title}, Author: ${author}, Pages: ${pages}`;
}

function addBookToLibrary(title, author, pages) {
  const newBook = new Book(title, author, pages);
  myLibrary.push(newBook);
}


let removeBooks = (elem) => {
  elem.addEventListener('click', function(e){
    const bookIndex = e.target.dataset.index;
  delete myLibrary[bookIndex];
  const book = selectQuery(`div[data-index="book${bookIndex}"]`);
  document.querySelector('.my-books').removeChild(book);
})}



function render() {

  const len = myLibrary.length;
  const parents = createElement('div');
  const element = createElement('h1');
  const button = createElement('button');
  const readButton = createElement('button');
  const readStatus = createElement('h3');
  readStatus.classList.add('read-status');
  readButton.innerHTML = 'Toggle Read Status';
  readButton.classList.add('.status-button')
  button.innerHTML = 'Remove'
  button.setAttribute('type', 'submit')
  parents.classList.add('book');
  appendChild(getLibrary, parents);
  appendChild(parents, element);
  appendChild(parents, button);
  appendChild(parents, readButton);
  appendChild(parents, readStatus);
    if (len >= 1) {
    element.innerHTML = myLibrary[len - 1].info()
    readButton.dataset.index = len - 1;
    button.dataset.index =  len - 1;
    parents.dataset.index =  `book${len - 1}`;
  }
  button.classList.add('removeBook');
  button.addEventListener('click', removeBooks(button));
  readButton.addEventListener('click', updateStatus)
}

const readStatus = ['Book Completely Read! 😍', 'Book uncompleted 😒'];
let chkStatsLen = 0;
function updateStatus(e) {
  const bookIndex =  e.target.dataset.index;
  if (chkStatsLen > 1) {chkStatsLen = 0}
  const book = myLibrary[bookIndex];
  book.readToggle(readStatus[chkStatsLen]);
  chkStatsLen++;
  const readStats = selectQuery('.read-status');
  readStats.innerHTML = book.read;
}

(function(){
  const createBookButton = selectQuery('.createBookButton');
 const addBookForm = selectQuery('.createBookForm');
 createBookButton.addEventListener('click', function(e) {
   addBookForm.classList.toggle('displayForm');
 })
})();

function displayLibrary() {
  const submitBut = document.getElementById('submit');
  document.getElementById('form').onsubmit = (e) => e.preventDefault();
  submitBut.addEventListener('click', () => {
    const title = selectQuery('#title').value;
    const author = selectQuery('#author').value;
    const pages = selectQuery('#pages').value;

    const checkLen = (inputVal) => {
      if (inputVal.length >= 1) {
        return true;
      }
      return false;
    };

    function callRenderOnValid() {
      if (checkLen(title) && checkLen(author) && checkLen(pages)) {
        addBookToLibrary(title, author, pages);
        render();
      }
    }

    callRenderOnValid();
  });
}

displayLibrary();
