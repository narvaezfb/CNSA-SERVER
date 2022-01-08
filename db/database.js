const Pool = require("pg").Pool;

const pool = new Pool({
  user: "fabian",
  password: "CNSA2020",
  host: "/cloudsql/cnsadb",
  // port: process.env.DB_PORT,
  database: "cnsadb",
  connector: "postgresql",
});

// const pool = {
//   yourdbname: {
//     host: "/cloudsql/cnsadb",
//     database: "cnsadb", // Create at step 3
//     password: "CNSA2020",
//     user: "fabian",
//     name: "yourdbname",
//     connector: "postgresql",
//   },
// };

module.exports = pool;
