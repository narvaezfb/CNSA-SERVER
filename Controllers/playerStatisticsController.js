const pool = require("./../db/database");

//FIND ALL PLAYERS
exports.getPlayerStatistics = async (req, res, next) => {
  const allPlayers = await pool.query(
    "select * from tbl_player_statistics ps join tbl_player pl on ps.player_id = pl.player_id;"
  );
  res.status(200).json({
    status: "success",
    data: allPlayers.rows,
  });
};

//CREATE A NEW PLAYER
exports.createPlayerStatistics = async (req, res, next) => {
    const {
        player_goal_kick,
        player_corner_kick,
        player_penalty_kick,
        player_passes,
        player_free_kicks,
        player_turnovers,  
        player_touches,
        player_red_cards,
        player_yellow_cards,
        player_fouls,
        game_id,
        player_id,
    } = req.body;
  
    const newPlayerStatistics = await pool.query(
      "INSERT into tbl_player_statistics( player_goal_kick, player_corner_kick,player_penalty_kick,player_passes,player_free_kicks,player_turnovers, player_touches,player_red_cards,player_yellow_cards,player_fouls,game_id,player_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
      [
        player_goal_kick,
        player_corner_kick,
        player_penalty_kick,
        player_passes,
        player_free_kicks,
        player_turnovers,  
        player_touches,
        player_red_cards,
        player_yellow_cards,
        player_fouls,
        game_id,
        player_id,
      ]
    );
  
    if (newPlayerStatistics.rowCount === 0) {
      return next(
        res.json({ status: "failed", message: "could not create player stats" })
      );
    }
  
    res.json({ status: "success", data: newPlayerStatistics.rows });
  };