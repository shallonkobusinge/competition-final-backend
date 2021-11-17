require('dotenv').config();

require('./src/models/db');
var express = require("express"),
    Formidable = require("formidable"),
    path = require("path");
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');

//Routes
const USER_ROUTES = require('./src/routes/users.route');
const AUTH_ROUTES = require('./src/routes/auth.route')


const PORT = process.env.SERVER_PORT;

// app.use("/public", express.static(path.join(__dirname, "public")));
const uploadDir = path.join(__dirname, "/uploads");

app.post("/", (req, res, next) => {
    let data = {};
    var form = new Formidable.IncomingForm();
    form.multiples = true;
    form.keepExtensions = true;
    form.uploadDir = uploadDir;

    //   Target when a file begin to upload
    form.on("fileBegin", (name, file) => {
        const [fileName, fileExt] = file.name.split(".");
        const newFileName = `${fileName}_${new Date().getTime()}.${fileExt}`;
        data.file = newFileName;
        file.path = path.join(uploadDir, newFileName);
    });

    form.parse(req, (err, fields, files) => {
        //get other fields
        data = { ...data, ...fields };
        if (err) return res.status(500).json({ error: err });
        res.status(200).json({ uploaded: true, data });
    });
});

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());
app.use(cors());

app.use(USER_ROUTES);
app.use(AUTH_ROUTES)

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));