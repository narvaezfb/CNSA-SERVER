const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   host: process.env.HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
// });

const pool = {
  yourdbname: {
    host: "/cloudsql/cnsadb",
    database: "cnsadb", // Create at step 3
    password: "CNSA2020",
    user: "fabian",
    name: "cnsadb",
    connector: "postgresql",
  },
};

module.exports = pool;
