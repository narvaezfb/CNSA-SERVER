const pool = require("../db/database");

//FIND ALL PLAYERS
exports.getAllGameTypes = async (req, res, next) => {
  const allGameTypes = await pool.query("SELECT * FROM tbl_game_type");
  res.status(200).json({
    status: "success",
    data: allGameTypes.rows,
  });
};
