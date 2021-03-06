const express = require('express');
const app = express()
const AccountCreator = require('./models/accountCreator')
const mongoose = require('mongoose')
require('dotenv/config')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/', async (req, res, next) => {
    console.log(req.body)
    const accountCreator = await AccountCreator(
        server= req.body.server,
        key= req.body.key,
        howMany= +req.body.howMany,
    )
    res.json(accountCreator)
})
//Import Routers
const authRoute = require('./routes/auth')

app.use('/api/user', authRoute)

app.get('/', (req,res) => {
    res.send('You are in home')
});

// Connect to DB
mongoose.connect(
    process.env.DB_connection,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
)
    .then(console.log('MongoDB Connected'))
    .catch((err) => console.log(`MongoDB error is ${err}`))


app.listen(8080, function () {
    console.log('Listening!')
})

