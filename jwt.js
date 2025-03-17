const jwt = require('jsonwebtoken');

function create(username) {
  return jwt.sign({ username }, 'abcd1234');
}

function verify(token) {
  try {
    let decoded = jwt.verify(token, 'abcd1234');
    return decoded;
  } catch(e) {
    return undefined;
  }
}

module.exports = {
  create,
  verify
};
