const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const pool = require("./db/database");
const playerRouter = require("./Routes/playerRoutes");
const positionRouter = require("./Routes/positionRoutes");
const schoolRouter = require("./Routes/schoolRoutes");
const teamRouter = require("./Routes/teamRoutes");
const stadiumRouter = require("./Routes/stadiumRoutes");
const provinceRouter = require("./Routes/provinceRoutes");
const locationRouter = require("./Routes/locationRoutes");
const gameRouter = require("./Routes/gameRoutes");
const gameTypeRouter = require("./Routes/gameTypeRoutes");
const scholarshipRouter = require("./Routes/scholarshipRoutes");
const recruitmentRulesRouter = require("./Routes/recruitmentRulesRoutes");
const recruitmentIncidentRouter = require("./Routes/recruitmentIncidentRoutes");
const dashboardRouter = require("./Routes/dashboardRoutes");
const totalPlayerIncidentRouter = require("./Routes/TotalPlayerIncidentRoutes");
const totalCoachesRouter = require("./Routes/totalCoachesRoutes");
const totalRecIncidentRouter = require("./Routes/totalRecIncidentRoutes");
const topPlayersRouter = require("./Routes/topPlayersRoutes");
const maxRankingRouter = require("./Routes/maxRankingRoutes");
const totalGamesRouter = require("./Routes/totalGamesRoutes");
const gameStatistics = require("./Routes/gameStatistics");
const playerStatisticsRouter = require("./Routes/playerStatisticsRoutes");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Routes
app.use("/cnsa/v1/players", playerRouter);
app.use("/cnsa/v1/positions", positionRouter);
app.use("/cnsa/v1/teams", teamRouter);
app.use("/cnsa/v1/schools", schoolRouter);
app.use("/cnsa/v1/locations", locationRouter);
app.use("/cnsa/v1/provinces", provinceRouter);
app.use("/cnsa/v1/stadiums", stadiumRouter);
app.use("/cnsa/v1/games", gameRouter);
app.use("/cnsa/v1/gameTypes", gameTypeRouter);

app.use("/cnsa/v1/scholarships", scholarshipRouter);
app.use("/cnsa/v1/recRules", recruitmentRulesRouter);
app.use("/cnsa/v1/recIncident", recruitmentIncidentRouter);

app.use("/cnsa/v1/dashboard", dashboardRouter);
app.use("/cnsa/v1/totalPlayerInc", totalPlayerIncidentRouter);
app.use("/cnsa/v1/totalCoaches", totalCoachesRouter);
app.use("/cnsa/v1/totalRecIncident", totalRecIncidentRouter);
app.use("/cnsa/v1/topPlayer", topPlayersRouter);
app.use("/cnsa/v1/maxRanking", maxRankingRouter);
app.use("/cnsa/v1/totalGames", totalGamesRouter);
app.use("/cnsa/v1/gameStatistics", gameStatistics);

app.use("/cnsa/v1/playerStatistics", playerStatisticsRouter);
module.exports = app;
