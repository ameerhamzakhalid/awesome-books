const listBooks = document.querySelector('.list-books');
const form = document.querySelector('.form-input');
const [title, author] = form.elements;

const inputBook = {};
let books = new Array([]);
if (localStorage.savedBooks) {
  books = JSON.parse(localStorage.getItem('savedBooks'));
}
title.addEventListener('change', () => {
  inputBook.title = title.value;
});

author.addEventListener('change', () => {
  inputBook.author = author.value;
});

const populateFields = () => {
  localStorage.setItem('savedBooks', JSON.stringify(books));
};

const Book = class {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  static removeBook(book) {
    const result = books.filter((b) => b !== book);
    books = result;
    populateFields();
  }

  static addBook = (newBook) => {
    books.push(newBook);
    populateFields();
    this.displayBooks();
  };

  static displayBooks = () => {
    listBooks.innerHTML = `
        <table class="btable">
        </table>
    `;

    const btable = document.querySelector('.btable');

    if (books.length === 0) {
      btable.style.display = 'none';
    }
    // Create the table body only once
    const body = btable.appendChild(document.createElement('tbody'));
    body.setAttribute('class', 'bbody');

    books.map((book) => {
      // Create table rows every time a book is added
      const tr = document.createElement('tr');
      const td = document.createElement('td');
      const deleteBtn = document.createElement('button');

      // Display the remove button
      deleteBtn.textContent = 'Remove';

      // Populate the data
      td.textContent = `"${book.title}" by ${book.author}`;
      td.appendChild(deleteBtn);

      // Create separate rows for each book
      tr.appendChild(td);

      // Append the rows inside the body
      const bBody = document.querySelector('.bbody');
      const uniqueBook = bBody.appendChild(tr);

      deleteBtn.addEventListener('click', () => {
        this.removeBook(book);
        bBody.removeChild(uniqueBook);
      });

      return listBooks;
    });
  };
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  Book.addBook(new Book(inputBook.title, inputBook.author));
  form.submit();
});

Book.displayBooks();
populateFields();
