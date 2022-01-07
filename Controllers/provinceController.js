//This is implemented to demonstrate integrity
const pool = require("./../db/database");

//GET ALL PROVINCES
exports.getAllProvinces = async (req, res, next) => {
  const allProvinces = await pool.query("SELECT * FROM tbl_province");
  res.status(200).json({
    status: "success",
    data: allProvinces.rows,
  });
};

//FIND PROVINCES BY ID
exports.getOneProvince = async (req, res, next) => {
  const province_id = req.params.id;
  const province = await pool.query(
    "SELECT * FROM tbl_province WHERE province_id = $1 ",
    [province_id]
  );

  if (province.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could find this province" })
    );
  }

  res.status(200).json({
    status: "success",
    data: province.rows,
  });
};

//CREATE PROVINCE
exports.createProvince = async (req, res, next) => {
  const { province_name } = req.body;

  const newProvince = await pool.query(
    "INSERT INTO tbl_province ( province_name) VALUES ($1) RETURNING *",
    [province_name]
  );

  if (newProvince.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not create this province" })
    );
  }

  res.json({ status: "success", data: newProvince.rows });
};

//UPDATE PROVINCES BY ID
exports.updateProvince = async (req, res, next) => {
  const province_id = req.params.id;
  const { province_name } = req.body;
  const updatedProvince = await pool.query(
    "UPDATE tbl_province SET province_name = $1 WHERE province_id = $2",
    [province_name, province_id]
  );

  if (updatedProvince.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not find this province" })
    );
  }

  res.status(200).json({
    status: "success",
    message: "province successfully updated",
  });
};

//DELETE PROVINCES BY ID
exports.deleteProvince = async (req, res, next) => {
  const province_id = req.params.id;
  const deletedProvince = await pool.query(
    "DELETE FROM tbl_province WHERE province_id = $1",
    [province_id]
  );

  if (deletedProvince.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not find this province" })
    );
  }

  res.status(200).json({
    status: "success",
    message: "province deleted",
  });
};
