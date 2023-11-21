const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5001;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://antixxtechhub.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json({
  limit: "50mb"
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Import and use routes
const AllRoutes = require("./src/routes/allRoutes");
app.use("/", AllRoutes);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});