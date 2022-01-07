const pool = require("./../db/database");

//FIND ALL RECRUITMENT RULES
exports.getAllRecRules = async (req, res, next) => {
  const allRecRules = await pool.query("SELECT * FROM tbl_recruitment_rules");
  res.status(200).json({
    status: "success",
    data: allRecRules.rows,
  });
};

//FIND RECRUITMENT RULE BY ID
exports.getOneRecRules = async (req, res, next) => {
  const recruitment_rule_id = req.params.id;
  const recRules = await pool.query(
    "SELECT * FROM tbl_recruitment_rules WHERE recruitment_rule_id = $1 ",
    [recruitment_rule_id]
  );

  if (recRules.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could find this recruitment rule." })
    );
  }

  res.status(200).json({
    status: "success",
    data: recRules.rows,
  });
};

//CREATE A NEW RECRUITMENT RULE
exports.createRecRules = async (req, res, next) => {
  const {
    rule_name,
    rule_description,
  } = req.body;

  const newRecRules = await pool.query(
    "INSERT INTO tbl_recruitment_rules ( rule_name, rule_description) VALUES ($1, $2) RETURNING *",
    [
        rule_name,
        rule_description,
    ]
  );

  if (newRecRules.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not create this recruitment rule" })
    );
  }

  res.json({ status: "success", data: newRecRules.rows });
};

//UPDATE A RECRUITMENT RULE
exports.updateRecRules = async (req, res, next) => {
  const recruitment_rule_id = req.params.id;
  const {
    rule_name,
    rule_description,
  } = req.body;

  const updatedRecRules = await pool.query(
    "UPDATE  tbl_recruitment_rules SET  rule_name = $1, rule_description = $2 WHERE recruitment_rule_id = $3",
    [
        rule_name,
        rule_description,
        recruitment_rule_id,
    ]
  );

  if (updatedRecRules.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not find this recruitment rule" })
    );
  }

  res.status(200).json({
    status: "success",
    message: "Recruitment rule successfully updated",
  });
};

//DELETE A RECRUITMENT RULE
exports.deleteRecRules = async (req, res, next) => {
  const recruitment_rule_id = req.params.id;
  const deletedRecRules = await pool.query(
    "DELETE FROM tbl_recruitment_rules WHERE recruitment_rule_id = $1",
    [recruitment_rule_id]
  );

  if (deletedRecRules.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not find this recruitment rule" })
    );
  }

  res.status(200).json({
    status: "success",
    message: "Recruitment rule deleted",
  });
};
