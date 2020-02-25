const selectQuery = query => document.querySelector(query);
const createElement = elem => document.createElement(elem);
const appendChild = (parent, child) => parent.appendChild(child);

const getLibrary = selectQuery('.my-books');
const enterLib = selectQuery('.enter');
enterLib.onclick = () => {
  const intro = selectQuery('.intro');
  intro.setAttribute('style', 'transform: translateX(-1500px)');
};

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = 'Book uncompleted 😒';
  this.readToggle = stats => {
    this.read = stats;
  };
  this.info = () => `Book Title: ${title}, Author: ${author}, Pages: ${pages}`;
}

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException
      // everything except Firefox
      && (e.code === 22
        // Firefox
        || e.code === 1014
        // test name field too, because code might not be present
        // everything except Firefox
        || e.name === 'QuotaExceededError'
        // Firefox
        || e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
      // acknowledge QuotaExceededError only if there's something already stored
      && storage
      && storage.length !== 0
    );
  }
}

function saveLibrary(library) {
  if (storageAvailable('localStorage')) {
    const libObjs = { array: [] };
    if (localStorage.getItem('library') != null) {
      const lib = JSON.parse(localStorage.getItem('library')); // { book1:  }
      lib.array.push(library);
      localStorage.setItem('library', JSON.stringify(lib));
    } else {
      libObjs.array.push(library);
      localStorage.setItem('library', JSON.stringify(libObjs));
    }
  }
}

function retrieveLibrary() {
  if (storageAvailable('localStorage')) {
    const savedLibrary = JSON.parse(localStorage.getItem('library'));
    return savedLibrary;
  }
  return false;
}

function removeBooks(e) {
  const bookIndex = +e.target.dataset.index;
  const newLibrary = {};
  const lib = retrieveLibrary().array;
  newLibrary.array = lib.filter((item, ind) => ind !== bookIndex);
  localStorage.setItem('library', JSON.stringify(newLibrary));
  const book = selectQuery(`div[data-index="book${bookIndex}"]`);
  document.querySelector('.my-books').removeChild(book);
}

const readStatus = ['Book Completely Read! 😍', 'Book uncompleted 😒'];
let chkStatsLen = 0;
function updateStatus(e) {
  const bookIndex = +e.target.dataset.index;

  if (chkStatsLen > 1) {
    chkStatsLen = 0;
  }
  const newLibrary = { array: [] };
  const lib = retrieveLibrary().array;
  lib.forEach((item, ind) => {
    if (ind === bookIndex) {
      item.read = readStatus[chkStatsLen];
    }
    newLibrary.array.push(item);
  });
  localStorage.setItem('library', JSON.stringify(newLibrary));
  const bookRead = selectQuery(`h3[data-index="read${bookIndex}"]`);

  bookRead.innerText = `Status: ${readStatus[chkStatsLen]}`;
  chkStatsLen += 1;
}

function createElems() {
  const parents = createElement('div');
  const element = createElement('h1');
  const button = createElement('button');
  const readButton = createElement('button');
  const readElem = createElement('h3');
  readElem.classList.add('read-status');
  readButton.innerHTML = 'Read?';
  readButton.classList.add('status-button');
  button.innerHTML = 'Remove';
  button.setAttribute('type', 'submit');
  parents.classList.add('book');
  appendChild(getLibrary, parents);
  appendChild(parents, element);
  appendChild(parents, readElem);
  appendChild(parents, button);
  appendChild(parents, readButton);
  button.classList.add('removeBook');
  button.addEventListener('click', removeBooks);
  readButton.addEventListener('click', updateStatus);
  return {
    element,
    readElem,
    readButton,
    button,
    parents,
  };
}

function render() {
  if (retrieveLibrary()) {
    const {
      element, readElem, readButton, button, parents,
    } = createElems();

    const libraryLength = retrieveLibrary().array.length;
    const library = retrieveLibrary().array[libraryLength - 1];
    element.innerHTML = `Book Title: ${library.title}, Author: ${library.author}, Pages: ${library.pages} <br/>`;
    readElem.innerHTML = `Read Status: ${library.read}`;
    readElem.dataset.index = `read${libraryLength - 1}`;
    readButton.dataset.index = libraryLength - 1;
    button.dataset.index = libraryLength - 1;
    parents.dataset.index = `book${libraryLength - 1}`;
  }
}

function appendStorage() {
  if (retrieveLibrary() !== null) {
    const item = retrieveLibrary().array;
    const libraryLength = retrieveLibrary().array.length;

    for (let i = 0; i < libraryLength; i += 1) {
      const {
        element, readElem, readButton, button, parents,
      } = createElems();

      element.innerHTML = `Book Title: ${item[i].title}, Author: ${item[i].author}, Pages: ${item[i].pages} <br/>`;
      readElem.innerHTML = `Read Status: ${item[i].read}`;
      readElem.dataset.index = `read${i}`;
      readButton.dataset.index = i;
      button.dataset.index = i;
      parents.dataset.index = `book${i}`;
    }
  }
}
appendStorage();

const submitBut = document.getElementById('submit');
document.getElementById('form').onsubmit = e => e.preventDefault();
submitBut.addEventListener('click', () => {
  const title = selectQuery('#title');
  const author = selectQuery('#author');
  const pages = selectQuery('#pages');

  const checkLen = inputVal => {
    if (inputVal.length >= 1) {
      return true;
    }
    return false;
  };

  if (
    checkLen(title.value)
    && checkLen(author.value)
    && checkLen(pages.value)
  ) {
    const newBook = new Book(title.value, author.value, pages.value);
    saveLibrary(newBook);
    render();
    title.value = '';
    author.value = '';
    pages.value = '';
  }
});

const createBookButton = selectQuery('.createBookButton');
const addBookForm = selectQuery('.createBookForm');
createBookButton.addEventListener('click', () => {
  addBookForm.classList.toggle('displayForm');
});

window.onload = () => {
  getLibrary.scrollTo(0, getLibrary.scrollHeight);
};
