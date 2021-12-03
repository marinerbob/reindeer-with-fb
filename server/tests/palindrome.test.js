const palindrome = require('../utils/for_testing').palindrome;

test('palindrome of "a"', () => {
  expect(palindrome('a')).toBe('a');
});

test('palindrome of "reindeer"', () => {
  expect(palindrome('reindeer'))
    .toBe('reednier');
});

test('palindrome of "racecar"', () => {
  expect(palindrome('racecar'))
    .toBe('racecar');
});