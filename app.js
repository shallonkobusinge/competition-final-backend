require('dotenv').config();

require('./src/models/db');

const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');

//Routes
const USER_ROUTES = require('./src/routes/users.route');
const AUTH_ROUTES = require('./src/routes/auth.route')


const PORT = process.env.SERVER_PORT;

// app.use("/public", express.static(path.join(__dirname, "public")));

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

app.use(USER_ROUTES);
app.use(AUTH_ROUTES)

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));