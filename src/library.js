const myLibrary = [];
const selectQuery = (query) => document.querySelector(query);
const createElement = (elem) => document.createElement(elem);
const appendChild = (parent, child) => parent.appendChild(child);

const getLibrary = selectQuery('.my-books');

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readToggle = (stats) => { this.read = stats; };
  this.info = () => `Book Title: ${title}, Author: ${author}, Pages: ${pages}`;
}

const removeBooks = (elem) => {
  elem.addEventListener('click', (e) => {
    const bookIndex = e.target.dataset.index;
    delete myLibrary[bookIndex];
    const book = selectQuery(`div[data-index="book${bookIndex}"]`);
    document.querySelector('.my-books').removeChild(book);
  });
};

function render() {
  const len = myLibrary.length;
  const parents = createElement('div');
  const element = createElement('h1');
  const button = createElement('button');
  const readButton = createElement('button');
  const readElem = createElement('h3');
  readElem.classList.add('read-status');
  readButton.innerHTML = 'Toggle Read Status';
  readButton.classList.add('.status-button');
  button.innerHTML = 'Remove';
  button.setAttribute('type', 'submit');
  parents.classList.add('book');
  appendChild(getLibrary, parents);
  appendChild(parents, element);
  appendChild(parents, button);
  appendChild(parents, readButton);
  appendChild(parents, readElem);
  if (len >= 1) {
    element.innerHTML = myLibrary[len - 1].info();
    readButton.dataset.index = len - 1;
    button.dataset.index = len - 1;
    parents.dataset.index = `book${len - 1}`;
  }
  button.classList.add('removeBook');
  button.addEventListener('click', removeBooks(button));

  const readStatus = ['Book Completely Read! 😍', 'Book uncompleted 😒'];
  let chkStatsLen = 0;
  function updateStatus(e) {
    const bookIndex = e.target.dataset.index;
    if (chkStatsLen > 1) { chkStatsLen = 0; }
    const book = myLibrary[bookIndex];
    book.readToggle(readStatus[chkStatsLen]);
    chkStatsLen += 1;
    const readStats = selectQuery('.read-status');
    readStats.innerHTML = book.read;
  }

  readButton.addEventListener('click', updateStatus);
}


function addBookToLibrary() {
  const submitBut = document.getElementById('submit');
  document.getElementById('form').onsubmit = (e) => e.preventDefault();
  submitBut.addEventListener('click', () => {
    const title = selectQuery('#title');
    const author = selectQuery('#author');
    const pages = selectQuery('#pages');

    const checkLen = (inputVal) => {
      if (inputVal.length >= 1) {
        return true;
      }
      return false;
    };

    if (checkLen(title.value) && checkLen(author.value) && checkLen(pages.value)) {
      const newBook = new Book(title.value, author.value, pages.value);
      myLibrary.push(newBook);
      render();
      title.value = '';
      author.value = '';
      pages.value = '';
    }
  });
}
addBookToLibrary();


const createBookButton = selectQuery('.createBookButton');
const addBookForm = selectQuery('.createBookForm');
createBookButton.addEventListener('click', () => {
  addBookForm.classList.toggle('displayForm');
});
