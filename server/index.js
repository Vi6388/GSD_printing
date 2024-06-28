const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const joiValidator = require("./middlewares/joiValidator");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const path = require('path');
require("dotenv").config();
const crypto = require('crypto');
const cors = require('cors');

const categoryRoutes = require('./routes/category-route');
const productRoutes = require('./routes/product-route');
const imageRouter = require('./routes/image-route');
const invoiceRouter = require('./routes/invoice-route');
const lockProductAreaRouter = require('./routes/lockProductArea-route');
const paperTypeRouter = require('./routes/paperType-route');
const productTemplateRouter = require('./routes/productTemplate-route');
const settingRouter = require('./routes/setting-route');
const transactionRouter = require('./routes/transaction-route');
const userRouter = require('./routes/user-route');
const authRouter = require('./routes/auth-route');
const dashboardRouter = require('./routes/dashboard-route');
const adminInfoRouter = require('./routes/adminInfo-route');
const shopRouter = require('./routes/shop-route');

global.__basedir = __dirname;

const dbUrl = "mongodb://localhost:27017/printing";

// Swagger
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const SwaggerOptions = require('./swagger/swagger.json');
const swaggerDocument = swaggerJsDoc(SwaggerOptions);

const app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors({
    origin: '*',
    credentials: true
}));
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Methods",'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers",'Content-Type,Authorization');
    next();
}) 

app.use('/api/auth', authRouter);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
// app.use('/api/image', imageRouter);
app.use('/api/invoice', invoiceRouter);
app.use('/api/lockProductArea', lockProductAreaRouter);
app.use('/api/paperType', paperTypeRouter);
app.use('/api/productTemplate', productTemplateRouter);
app.use('/api/settings', settingRouter);
app.use('/api/transaction', transactionRouter);
app.use('/api/user', userRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/adminInfo', adminInfoRouter);
app.use('/api/shop', shopRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(joiValidator);
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .catch(error => console.log(error));

var port = process.env.PORT;
app.listen(port, () => {
    console.log('Server is up and running on port: ' + port);
});

// create storage engine
// const storage = new GridFsStorage({
//     url: process.env.MONGO_DB_URL,
//     file: (req, file) => {
//         return new Promise((resolve, reject) => {
//             crypto.randomBytes(16, (err, buf) => {
//                 if (err) {
//                     return reject(err);
//                 }
//                 const filename = buf.toString('hex') + path.extname(file.originalname);
//                 const fileInfo = {
//                     filename: filename,
//                     bucketName: 'uploads'
//                 };
//                 resolve(fileInfo);
//             });
//         });
//     }
// });

// const upload = multer({ storage });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.urlencoded({ extended: true }))
const filePath = path.join(__dirname,'public');
app.use(express.static(filePath));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/')
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname)
    },
})

app.use(express.urlencoded({ extended: true }));
const upload = multer({ limits: { fileSize: 10 * 1024 * 1024 } }, { storage: storage })
app.use('/assets', express.static('assets'));
app.use('/api/image', imageRouter(upload));