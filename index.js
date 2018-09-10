const app = require("./app");

const DB_NAME = process.env.MONGODB_URI || "mongodb://localhost/translations";
const PORT = process.env.PORT || 3000;

app({ dbName: DB_NAME, port: PORT });
