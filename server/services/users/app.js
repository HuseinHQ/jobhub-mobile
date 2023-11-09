const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const mainRoutes = require("./routes/");
const { connect } = require("./config/mongo");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", mainRoutes);
app.use(errorHandler);

connect()
  .then((db) => {
    app.listen(PORT, () => console.log(`App listens to port ${PORT}`));
  })
  .catch((err) => console.log(err));
