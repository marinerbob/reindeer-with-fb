const palindrome = (string) => {
  return string.split('')
    .reverse()
    .join('');
};

const average = (array) => {
  const reducer = (sum, item) => sum + item;
  return array.length > 0
    ? array
      .reduce((sum, item) => sum + item, 0) / array.length
    : 0;
};

module.exports = {
  palindrome,
  average,
};