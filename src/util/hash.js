const crypto = require('crypto');

module.exports = (password) => {
  const hash = crypto.createHash('sha256').update(password);
  return hash.digest('hex');
};
