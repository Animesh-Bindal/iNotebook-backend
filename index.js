const connectToDb = require('./db');
connectToDb();

const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
var cors = require('cors') 

const app = express();
const port = process.env.SERVER_BACKENDI_PORT || 5001;

app.get('/', (req, res) => {
    res.send('hello world')
})
//AVAILABLE ROUTES
app.use(cors())
app.use(express.json());  //to use req.body we have to use this middleware
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


// START THE SERVER
app.listen(port, '0.0.0.0', () => {
    console.log(`The iNotebook application started successfully at http://localhost:${port}`);
});
// app.listen(port, () => {
//     console.log(`The iNotebook application started successfully at http://localhost:${port}`);
// });