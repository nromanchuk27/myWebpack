import './index.sass';

const soulution = str => {
  let result = str;
  str.split('').forEach((it, i) => {
    if (str[i] == it.toUpperCase()) {
      result = str.substring(0, i) + ' ' + str.substring(i, str.length);
    }
  });

  return result;
};

console.log(soulution('abcdFeff'));
