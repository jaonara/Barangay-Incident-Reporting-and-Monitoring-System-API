const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ======================
// TEMP DATABASE (IN MEMORY)
// ======================
let incidents = [];

// ======================
// GET ALL INCIDENTS
// ======================
app.get("/incidents", (req, res) => {
  res.json(incidents);
});

// ======================
// CREATE INCIDENT
// ======================
app.post("/incidents", (req, res) => {
  const { reporter_name, contact, incident_type, location, description } = req.body;

  // Basic validation
  if (!reporter_name || !incident_type || !location) {
    return res.status(400).json({
      message: "reporter_name, incident_type, and location are required"
    });
  }

  const newIncident = {
    id: incidents.length + 1,
    reporter_name,
    contact: contact || "N/A",
    incident_type,
    location,
    description: description || "",
    status: "pending",
    date_reported: new Date().toISOString().split("T")[0]
  };

  incidents.push(newIncident);

  res.status(201).json(newIncident);
});

// ======================
// UPDATE INCIDENT
// ======================
app.put("/incidents/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = incidents.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Incident not found" });
  }

  incidents[index] = {
    ...incidents[index],
    ...req.body
  };

  res.json({
    message: "Incident updated successfully",
    data: incidents[index]
  });
});

// ======================
// DELETE INCIDENT
// ======================
app.delete("/incidents/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = incidents.findIndex(i => i.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Incident not found" });
  }

  incidents.splice(index, 1);

  res.json({ message: "Incident deleted successfully" });
});

// ======================
// SERVER START
// ======================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});