const palindrome = require('../utils/for-testing').palindrome;

test('palindrome of a', () => {
  const result = palindrome('a');
  expect(result).toBe('a');
});

test('palindrome of a', () => {
  const result = palindrome('react');
  expect(result).toBe('tcaer');
});

test('palindrome of releveler', () => {
  const result = palindrome('releveler');
  expect(result).toBe('releveler');
});
