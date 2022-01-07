const pool = require("./../db/database");

//FIND ALL Locations
exports.getAllLocations = async (req, res, next) => {
  const allLocations = await pool.query("SELECT * FROM tbl_location");
  res.status(200).json({
    status: "success",
    data: allLocations.rows,
  });
};

//FIND Location BY ID
exports.getOneLocation = async (req, res, next) => {
  const location_id = req.params.id;
  const location = await pool.query(
    "SELECT * FROM tbl_location WHERE location_id = $1 ",
    [location_id]
  );

  if (location.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could find this location" })
    );
  }

  res.status(200).json({
    status: "success",
    data: location.rows,
  });
};

//CREATE A NEW Location
exports.createLocation = async (req, res, next) => {
  const {
    location_name,
    location_street_address,
    location_zipcode,
    location_city,
    province_id,
    country,
  } = req.body;

  const newLocation = await pool.query(
    "INSERT INTO tbl_location (location_name, location_street_address, location_zipcode, location_city, province_id, country) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
    [
      location_name,
      location_street_address,
      location_zipcode,
      location_city,
      province_id,
      country,
    ]
  );

  if (newLocation.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not create this location" })
    );
  }

  res.json({ status: "success", data: newLocation.rows });
};

//UPDATE A Location
exports.updateLocation = async (req, res, next) => {
  const location_id = req.params.id;
  const {
    location_name,
    location_street_address,
    location_zipcode,
    location_city,
    province_id,
    country,
  } = req.body;

  const updatedLocation = await pool.query(
    "UPDATE  tbl_location SET  location_name = $1, location_street_address = $2, location_zipcode = $3, location_city = $4, province_id = $5, country = $6 WHERE location_id = $7",
    [
      location_name,
      location_street_address,
      location_zipcode,
      location_city,
      province_id,
      country,
      location_id,
    ]
  );

  if (updatedLocation.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not find this location" })
    );
  }

  res.status(200).json({
    status: "success",
    message: "location successfully updated",
  });
};

//DELETE A Location
exports.deleteLocation = async (req, res, next) => {
  const location_id = req.params.id;
  const deletedLocation = await pool.query(
    "DELETE FROM tbl_location WHERE location_id = $1",
    [location_id]
  );

  if (deletedLocation.rowCount === 0) {
    return next(
      res.json({ status: "failed", message: "could not find this location" })
    );
  }

  res.status(200).json({
    status: "success",
    message: "location deleted",
  });
};
