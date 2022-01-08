const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "CNSA2020",
  host: "/cloudsql/cnsa-server:northamerica-northeast1:cnsadb",
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
