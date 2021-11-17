require('dotenv').config();

require('./src/models/db');
var express = require("express");
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');

//Routes
const USER_ROUTES = require('./src/routes/users.route');
const AUTH_ROUTES = require('./src/routes/auth.route')
const EMPLOYEES_ROUTES = require('./src/routes/employees.route')
const PRODUCTS_ROUTES = require('./src/routes/product.route')



const PORT = process.env.SERVER_PORT;


app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

app.use(USER_ROUTES);
app.use(AUTH_ROUTES)
app.use(EMPLOYEES_ROUTES)
app.use(PRODUCTS_ROUTES)

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));