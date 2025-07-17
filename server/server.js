const express = require("express");
const cors = require("cors");
const sql = require("mssql/msnodesqlv8");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Windows Authentication + msnodesqlv8 config
const dbConfig = {
  server: "TAN_OMEN\\SQLEXPRESS", // double backslash!
  database: "itc2",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
  },
};

// API Route
app.get("/api/employees", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .query(
        `SELECT empno, swipe_date_time FROM factory_emp ORDER BY swipe_date_time DESC`
      );

    res.json(result.recordset);
  } catch (err) {
    console.error("❌ SQL error:", err);
    res.status(500).send("Server error");
  }
});

// Root route (optional)
app.get("/", (req, res) => {
  res.send("API running");
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
sql
  .connect(dbConfig)
  .then(() => console.log("Connected to SQL Server successfully!"))
  .catch((err) => console.error("❌ Failed to connect:", err));


// Machine Map API Route

app.get("/api/machine-map", async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool
      .request()
      .query(
        `SELECT empno, machinenumber
      FROM (
        SELECT *,
               ROW_NUMBER() OVER (
                 PARTITION BY empno
                 ORDER BY CONVERT(datetime, swipe_date_time, 120) DESC
               ) AS rn
        FROM factory_emp
      ) AS ranked
      WHERE rn = 1`
      );

    res.json(result.recordset);
  } catch (err) {
    console.error("❌ SQL error:", err);
    res.status(500).send("Server error");
  }
});