const app = require('./app');

require('dotenv').config();

const { API_PORT } = process.env;
const PORT = process.env.PORT || API_PORT;

// Connect DB
const db = require('./src/Config/DB/index.config');
db.connect();

app.listen(PORT, () => console.log(`App listen at http://localhost:${PORT}`));
