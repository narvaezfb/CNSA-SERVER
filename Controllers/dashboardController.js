const pool = require("../db/database");

exports.getTotalRecIncident = async (req, res, next) => {
  const totalRecIncident = await pool.query(
    "select count(incident_id) from TBL_RECRUITMENT_INCIDENt"
  );
  res.status(200).json({
    status: "success",
    data: totalRecIncident.rows,
  });
};

exports.getTotalPlayerIncident = async (req, res, next) => {
  const totalPlayerIncident = await pool.query(
    "Select distinct count(player_id) from TBL_RECRUITMENT_INCIDENt"
  );
  res.status(200).json({
    status: "success",
    data: totalPlayerIncident.rows,
  });
};

exports.getTotalPlayers= async (req, res, next) => {
  const totalPlayers = await pool.query(
    "Select count(player_id) from tbl_player"
  );
  res.status(200).json({
    status: "success",
    data: totalPlayers.rows,
  });
};

exports.getTotalCoaches= async (req, res, next) => {
  const totalCoaches = await pool.query(
    "Select count(staff_type_id) from tbl_staff where staff_type_id in(1,2)"
  );
  res.status(200).json({
    status: "success",
    data: totalCoaches.rows,
  });
};

exports.getTopPlayers= async (req, res, next) => {
  const topPlayers = await pool.query(
    "select player_first_name, player_last_name, ranking from tbl_player order by ranking desc limit 7"
  );
  res.status(200).json({
    status: "success",
    data: topPlayers.rows,
  });
};

exports.getMaxRanking= async (req, res, next) => {
  const maxRanking = await pool.query(
    "SELECT player_first_name, ranking FROM tbl_player WHERE ranking = ( SELECT MIN (ranking) FROM tbl_player)"
  );
  res.status(200).json({
    status: "success",
    data: maxRanking.rows,
  });
};

exports.getTotalGames= async (req, res, next) => {
  const totalGames = await pool.query(
    "Select count(game_id) from tbl_game"
  );
  res.status(200).json({
    status: "success",
    data: totalGames.rows,
  });
};

exports.getGameBarChart= async (req, res, next) => {
  const gameBarChart = await pool.query(
    "select date_trunc('MONTH', ocurrance_date)::date as dateS,COUNT(game_id) AS count, TO_CHAR( date_trunc('MONTH', ocurrance_date)::date, 'Mon') AS Monthname from tbl_game GROUP by dateS, MonthName");
  res.status(200).json({
    status: "success",
    data: gameBarChart.rows,
  });
};



