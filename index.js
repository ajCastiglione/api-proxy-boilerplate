const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// Create a new express server
const app = express();

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 10 requests per windowMs
});

// Initalize the rate limiter
app.use(limiter);

// trust first proxy
app.set("trust proxy", 1);

// Set static folder
app.use(express.static(__dirname + "/public"));

// Routes
app.use("/api", require("./routes"));

// Enable CORS
app.use(cors());

// Start the server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
