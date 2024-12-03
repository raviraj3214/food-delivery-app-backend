const express = require('express');
const cors = require('cors');
// const globalErrorHandler = require('./controllers/errorController');
// const authRouter = require('./routes/authRoute');
// const taskRouter = require('./routes/taskRoute');
 const userRoute = require('./routes/userRoute');
// const memberRouter = require('./routes/memberRoute')
// const AppError = require('./utils/AppError');
// const morgan = require('morgan');


const cookieParser = require('cookie-parser')
const restaurantRoute = require('./routes/restaurantRoute')
const categoryRoute = require('./routes/categoryRoute')
const foodItemRoute = require('./routes/foodItemRoute')
const app = express();
app.use(cookieParser())

app.use(cors({
  origin: 'https://ravi-food-delivery-app.netlify.app', 
  credentials: true      
}));

// app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true
// }))
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send('Welcome to server');
});

app.get('/api/v1/', (req, res) => {
  return res.status(200).send('Explore version 1 of project manager server.');
});

// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/tasks', taskRouter);
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/members',memberRouter);
app.use('/api/v1/restaurant',restaurantRoute);
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/user',userRoute);
app.use('/api/v1/fooditem',foodItemRoute);



// app.all('*', (req, res, next) => {
//   throw new AppError('Route does not exists', 404);
// });

// app.use(globalErrorHandler);

module.exports = app;
