const app = require('./app.js');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});