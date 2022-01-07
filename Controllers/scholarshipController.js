const pool = require("./../db/database");

//FIND ALL SCHOLARSHIPS
exports.getAllScholarships = async (req, res, next) => {
  const allScholars = await pool.query("SELECT * FROM tbl_scholarship");
  res.status(200).json({
    status: "success",
    data: allScholars.rows,
  });
};

//FIND SCHOLARSHIPS BY ID
exports.getOneScholarship = async (req, res, next) => {
    const scholar_id = req.params.id;
    const scholar = await pool.query(
      "SELECT * FROM tbl_scholarship WHERE scholarship_id = $1 ",
      [scholar_id]
    );
  
    if (scholar.rowCount === 0) {
      return next(
        res.json({ status: "failed", message: "could find this scholarship" })
      );
    }
  
    res.status(200).json({
      status: "success",
      data: scholar.rows,
    });
  };


  //CREATE A NEW SCHOLARSHIP
exports.createScholarship = async (req, res, next) => {
    const {
        scholarship_name,
        scholarship_description,
    } = req.body;
  
    const newScholar = await pool.query(
      "INSERT INTO tbl_scholarship ( scholarship_name, scholarship_description) VALUES ($1, $2) RETURNING *",
      [
        scholarship_name,
        scholarship_description,
      ]
    );
  
    if (newScholar.rowCount === 0) {
      return next(
        res.json({ status: "failed", message: "could not create this scholarship" })
      );
    }
  
    res.json({ status: "success", data: newScholar.rows });
  };

  //UPDATE A SCHOLARSHIP
exports.updateScholarship = async (req, res, next) => {
    const scholarship_id = req.params.id;
    const {
        scholarship_name,
        scholarship_description,
    } = req.body;
  
    const updatedScholar = await pool.query(
      "UPDATE  tbl_scholarship SET  scholarship_name = $1, scholarship_description = $2  WHERE scholarship_id = $3",
      [
        scholarship_name,
        scholarship_description,
        scholarship_id,
      ]
    );
  
    if (updatedScholar.rowCount === 0) {
      return next(
        res.json({ status: "failed", message: "could not find this scholarship" })
      );
    }
  
    res.status(200).json({
      status: "success",
      message: "Scholarship successfully updated",
    });
  };

  //DELETE A SCHOLARSHIP
exports.deleteScholarship = async (req, res, next) => {
    const scholarship_id = req.params.id;
    const deletedScholar = await pool.query(
      "DELETE FROM tbl_scholarship WHERE scholarship_id = $1",
      [scholarship_id]
    );
  
    if (deletedScholar.rowCount === 0) {
      return next(
        res.json({ status: "failed", message: "could not find this scholarship" })
      );
    }
  
    res.status(200).json({
      status: "success",
      message: "Scholarship deleted",
    });
  };
  
  
  