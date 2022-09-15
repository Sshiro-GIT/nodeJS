const express = require("express");
const apiRoutes = require("./routers/app.routers");

const app = express();
const PORT = process.env.PORT || 8080;

//Middlewares a nivel de aplicación
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use("/api", apiRoutes);
app.use(express.static("public"));

const connectedServer = app.listen(PORT, () => {
  console.log(`Server is up and running on port ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.error("Error: ", error);
});
