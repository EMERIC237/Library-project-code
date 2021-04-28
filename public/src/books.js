function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  //create an array for the books _that have been loaned out
  const notReturnedBook = books.filter(
    (book) => book.borrows[0].returned === false
  );
  //create an array for the books _that have been returned
  const returnBook = books.filter((book) => book.borrows[0].returned === true);

  return [notReturnedBook, returnBook];
}

function getBorrowersForBook(book, accounts) {
  let bookTransaction = book.borrows.map((borrow) => {
    const account = accounts.find((account) => account.id === borrow.id);
    return { ...borrow, ...account };
  });
  return bookTransaction.length >= 10
    ? bookTransaction.slice(0, 10)
    : bookTransaction;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
