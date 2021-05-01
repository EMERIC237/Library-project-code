function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((nameA, nameB) =>
    nameA.name.last.toLowerCase() < nameB.name.last.toLowerCase() ? -1 : 1
  );
}

const findABook=(books,toDoWhenMatch) =>{
  books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if (borrow.id === account.id) {
        toDoWhenMatch(book,borrow,account);
      }
    });
  });
}

function getTotalNumberOfBorrows(account, books) {
  //create an accumulator to record the number of appearances
  let numberOfBorrows = 0;
  findABook(books,(book,borrow,account) => numberOfBorrows += 1)
  // books.forEach((book) => {
  //   book.borrows.forEach((borrow) => {
  //     if (borrow.id === account.id) {
  //       numberOfBorrows += 1;
  //     }
  //   });
  // });
  return numberOfBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  //create a list to hold all the books
  let BooksPossessedByAccount = [];
  //Go through all the books inside the array
  findABook(books,(book,borrow,account) => {
    if (!borrow.returned) {
      //add the author to the books inside the array.
      let bookAuthor = authors.find(
        (author) => author.id === book.authorId
      );
      let newBook = { ...book, author: bookAuthor };
      BooksPossessedByAccount[BooksPossessedByAccount.length] = newBook;
    }
  })
  // books.forEach((book) => {
  //   //Go through borrow array inside the book
  //   book.borrows.forEach((borrow) => {
  //     //check if the id is equal to the account id
  //     if (borrow.id === account.id) {
  //       //add the book to the initial array if returned === false
  //       // if (!borrow.returned) {
  //       //   //add the author to the books inside the array.
  //       //   let bookAuthor = authors.find(
  //       //     (author) => author.id === book.authorId
  //       //   );
  //       //   let newBook = { ...book, author: bookAuthor };
  //       //   BooksPossessedByAccount[BooksPossessedByAccount.length] = newBook;
  //       // }
  //     }
  //   });
  // });

  return BooksPossessedByAccount;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
