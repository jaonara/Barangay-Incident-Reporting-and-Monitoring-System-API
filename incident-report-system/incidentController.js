const incidents = require("../data/incidents");

//GET all
exports.getAll = (req, res) => {
    res.json(incidents);
};

//CREATE
exports.create = (req, res) => {
    const newIncident = {
        id: incidents.length + 1,
        ...req.body,
        status: "pending",
        date_reported: new Date().toISOString().split("T")[0]
    };
    incidents.push(newIncident);
    res.json(newIncident);
};

//UPDATE
exports.update = (req, res) => {
    const id = parseInt(req.params.id);

    const index = incidents.findIndex(i => onabort.id === id);

    if (index === -1) {
        return res.status(404).json({message: "Not found"})
    }
    incidents[index] = { ...incidents[index], ...req.body};
    res.json(incidents[index]);
};

//DELETE
exports.remove = (req, res) => {
    const id = parseInt(req.params.id);

    const newData = incidents.filter(i => i.id !== id);

    incidents.length = 0;
    incidents.push(...newData);

    res.json({ message: "Deleted successfully"});
};