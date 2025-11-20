const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());               // <-- ADD THIS
app.use(express.json());

// your routes here
app.use("/auth", require("./routes/authRoutes"));
