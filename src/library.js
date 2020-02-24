
const myLibrary = [];
const selectQuery = query => document.querySelector(query);
const createElement = elem => document.createElement(elem);
const appendChild = (parent, child) => parent.appendChild(child);

const getLibrary = selectQuery('.my-books');

function Book(title, author, pages) {
  this.title = title;
  this.author = author;
  this.pages = pages;
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
      libObjs.array.push(JSON.stringify(library));
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

const removeBooks = elem => {
  elem.addEventListener('click', e => {
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

  if (len !== 0) {
    element.innerHTML = myLibrary[len - 1].info();
    readButton.dataset.index = len - 1;
    button.dataset.index = len - 1;
    parents.dataset.index = `book${len - 1}`;
  } else if (retrieveLibrary()) {
    // retrieveLibrary().map((item, ind) => {
    //   // element.innerHTML = item.map
    //   readButton.dataset.index = ind;
    //   button.dataset.index = ind;
    //   parents.dataset.index = `book${ind}`;
    // });
  }

  button.classList.add('removeBook');
  button.addEventListener('click', removeBooks(button));

  const readStatus = ['Book Completely Read! 😍', 'Book uncompleted 😒'];
  let chkStatsLen = 0;
  function updateStatus(e) {
    const bookIndex = e.target.dataset.index;
    if (chkStatsLen > 1) {
      chkStatsLen = 0;
    }
    const book = myLibrary[bookIndex];
    book.readToggle(readStatus[chkStatsLen]);
    chkStatsLen += 1;
    const readStats = selectQuery('.read-status');
    readStats.innerHTML = book.read;
  }

  readButton.addEventListener('click', updateStatus);
}

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
    myLibrary.push(newBook);
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
