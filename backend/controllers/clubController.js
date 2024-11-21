const pool = require('../db');
const bcrypt = require('bcryptjs');

const addClub = async (req, res) => {
  const { name, description, eligibility } = req.body;
  try {
    const query = `INSERT INTO clubs (name, description, eligibility) VALUES ($1, $2, $3) RETURNING *`;
    const result = await pool.query(query, [name, description, eligibility]);
    res.status(201).json({ success: true, club: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding club', error });
  }
};

const getAllClubs = async (req, res) => {
  try {
    const query = `SELECT * FROM clubs`; // Query to get all clubs from the clubs table
    const result = await pool.query(query);
    res.status(200).json(result.rows); // Send all clubs in JSON format
  } catch (error) {
    console.error("Error fetching clubs:", error);
    res.status(500).json({ error: "An error occurred while retrieving clubs." });
  }
};


const updateClub = async (req, res) => {
  const { id, name, description, eligibility } = req.body;
  try {
    const query = `
      UPDATE clubs
      SET name = $1, description = $2, eligibility = $3
      WHERE id = $4
      RETURNING *`;
    const result = await pool.query(query, [name, description, eligibility, id]);

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Club updated successfully', club: result.rows[0] });
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (error) {
    console.error("Error updating club:", error);
    res.status(500).json({ message: 'Error updating club', error });
  }
};


const deleteClub = async (req, res) => {
  const { id } = req.params; // Get club ID from request parameters
  try {
    const query = `DELETE FROM clubs WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [id]);

    if (result.rows.length > 0) {
      res.status(200).json({ success: true, message: 'Club deleted successfully', club: result.rows[0] });
    } else {
      res.status(404).json({ success: false, message: 'Club not found' });
    }
  } catch (error) {
    console.error("Error deleting club:", error);
    res.status(500).json({ success: false, message: 'Error deleting club', error });
  }
};
const submitJoinRequest = async (req, res) => {
  const { userName, userEmail, userPhone, clubName, contribution } = req.body;

  try {
      const query = `
          INSERT INTO club_requests (user_name, user_email, user_phone, club_name, contribution)
          VALUES ($1, $2, $3, $4, $5) RETURNING *`;
      const result = await pool.query(query, [userName, userEmail, userPhone, clubName, contribution]);
     
      res.status(201).json({ success: true, request: result.rows[0] });
  } catch (error) {
      console.error('Error submitting join request:', error);
      res.status(500).json({ success: false, message: 'Error submitting request', error });
  }
};

const checkJoinRequest = async (req, res) => {
  const { userEmail, clubName } = req.query; // Assuming userEmail and clubName are passed as query parameters

  try {
      const query = `
          SELECT * 
          FROM club_requests
          WHERE user_email = $1 AND club_name = $2`;
      const result = await pool.query(query, [userEmail, clubName]);

      if (result.rows.length > 0) {
          res.status(200).json({ requested: true }); // Request already sent
      } else {
          res.status(200).json({ requested: false }); // No request found
      }
  } catch (error) {
      console.error('Error checking join request:', error);
      res.status(500).json({ success: false, message: 'Error checking request', error });
  }
};

module.exports = { addClub, getAllClubs, updateClub,deleteClub,submitJoinRequest,checkJoinRequest };
