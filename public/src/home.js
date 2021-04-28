function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let total = 0;
  books.forEach((book) => {
    if (!book.borrows[0].returned) {
      total += 1;
    }
  });
  return total;
}

function getMostCommonGenres(books) {
  //create an array of all the genres inside the book array
  const genres = books.map((book) => (book = book.genre));
  //function to count the number of occurrences.
  const countOccurrences = (genres, value) =>
    genres.reduce((sum, genre) => (genre === value ? sum + 1 : sum), 0);
  //create a list of uniques genre
  const uniqueGenre = [];
  genres.forEach((genre) => {
    if (!uniqueGenre.includes(genre)) {
      uniqueGenre.push(genre);
    }
  });
  //create objects with the genre name and the count.
  const genresWithCount = uniqueGenre.map((genre) => {
    let object = {};
    object.name = genre;
    object.count = countOccurrences(genres, genre);
    return object;
  });

  //order my array of objects
  genresWithCount.sort((countA, countB) => countB.count - countA.count);
  //Return the top five genres
  return genresWithCount.length >= 5
    ? genresWithCount.slice(0, 5)
    : genresWithCount;
}

function getMostPopularBooks(books) {
  //create an array of objects with the book title and the borrow count.
  const borrowCountPerBook = books.map((book) => {
    let object = {};
    object.name = book.title;
    object.count = book.borrows.length;
    return object;
  });

  //order my array of objects by count
  borrowCountPerBook.sort((countA, countB) => countB.count - countA.count);
  return borrowCountPerBook.length >= 5
    ? borrowCountPerBook.slice(0, 5)
    : borrowCountPerBook;
}

function getMostPopularAuthors(books, authors) {
  //create an object with the authors and the books borrowed count
  const borrowCountPerAuthor = authors.map((author) => {
    let object = {};
    const fullName = author.name.first + " " + author.name.last;
    //create a list of books written by the author
    const booksByAuthor = books.filter((book) => book.authorId === author.id);
    //count all the borrows books
    let count = 0;
    booksByAuthor.forEach((book) => (count += book.borrows.length));
    object.name = fullName;
    object.count = count;
    return object;
  });

  borrowCountPerAuthor.sort((countA, countB) => countB.count - countA.count);
  return borrowCountPerAuthor.length >= 5
    ? borrowCountPerAuthor.slice(0, 5)
    : borrowCountPerAuthor;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
