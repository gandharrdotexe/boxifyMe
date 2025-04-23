const express = require("express");
const cors = require("cors");
const imageRoutes = require("./routes/imageRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/", imageRoutes);

// Future routes
// app.use("/reference", referenceRoutes);
// app.use("/product", productRoutes);
// app.use("/box", boxRoutes);
// app.use("/cost", costRoutes);
// app.use("/report", reportRoutes);

module.exports = app;
