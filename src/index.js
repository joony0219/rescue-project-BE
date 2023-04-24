require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const app = require('./app.js');

app.listen(port, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});