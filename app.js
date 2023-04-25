const express = require('express');
const app = express();

const cors = require('cors');
const env = require('dotenv');
env.config();

const errHandler = require('./handlers/errorHandler');
const connectDB = require('./app/database');
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


const userRouter = require('./app/routers/userRouter');
app.use('/auth', userRouter);



app.use(errHandler);

app.use("*", (req, res, next) => {
    const error = {
        status: false,
        message: "Endpoint_Not_Found"
    };
    res.status(404).json(error);
});

const port = process.env.PORT || 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGODB_URI);
        app.listen(port, (err) => {
            if (err) throw err;
            console.log(`Server is up and running on ${port}`);
        });
    } catch (err) {
        console.log(err);
    }
};

start();