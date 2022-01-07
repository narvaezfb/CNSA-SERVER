const pool = require("./../db/database");

exports.getAllGames = async (req, res, next) => {
  const allGames = await pool.query(
    "select game_id, st.team_name as vistor_team, ft.team_name as local_team, visitor_team_score, home_team_score, gt.game_type from tbl_game g join tbl_game_type gt on g.game_type_id = gt.game_type_id join tbl_stadium s on g.stadium_id = s.stadium_id join tbl_team ft on s.team_id = ft.team_id join tbl_team st on g.visitor_team_id = st.team_id "
  );
  res.status(200).json({
    status: "success",
    data: allGames.rows,
  });
};

exports.getOneGame = async (req, res, next) => {
  const game_id = req.params.id;
  const game = await pool.query(
    "select game_id, st.team_name as vistor_team, ft.team_name as local_team, visitor_team_score, home_team_score, gt.game_type from tbl_game g join tbl_game_type gt on g.game_type_id = gt.game_type_id join tbl_stadium s on g.stadium_id = s.stadium_id join tbl_team ft on s.team_id = ft.team_id join tbl_team st on g.visitor_team_id = st.team_id  WHERE game_id = $1 ",
    [game_id]
  );

  if (game.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could find this game" })
    );
  }

  res.status(200).json({
    status: "success",
    data: game.rows,
  });
};

exports.createGame = async (req, res, next) => {
  const {
    ocurrance_date,
    game_attendance,
    stadium_id,
    visitor_team_id,
    home_team_score,
    visitor_team_score,
    game_type_id,
  } = req.body;

  const newGame = await pool.query(
    "INSERT INTO tbl_game ( ocurrance_date, game_attendance, stadium_id, visitor_team_id, home_team_score, visitor_team_score, game_type_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [
      ocurrance_date,
      game_attendance,
      stadium_id,
      visitor_team_id,
      home_team_score,
      visitor_team_score,
      game_type_id,
    ]
  );

  if (newGame.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not create this game" })
    );
  }

  res.json({ status: "success", data: newGame.rows });
};
exports.updateGame = async (req, res, next) => {};
exports.deleteGame = async (req, res, next) => {};
