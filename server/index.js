const mongoose = require('mongoose');
const express = require('express');
const dotev = require('dotenv');
const productRoute = require('./routes/productRoutes');
const orderRoute = require('./routes/orderRoute');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const userRoute = require('./routes/userRoute');

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(
  '*',
  cors({
    credentials: true,
    origin: true,
  })
);
app.use(bodyParser());
app.use(cookieParser());
app.use(express.urlencoded({ limit: '50mb' }));
dotev.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => [console.log('Mongodb connected')])
  .catch((err) => {
    console.log(err);
  });

app.use('/api/v1', productRoute);
app.use('/api/v1', orderRoute);
app.use('/api/v1', userRoute);

app.listen(process.env.PORT, () => {
  console.log('Server working');
});
