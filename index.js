const connectToDb = require('./db');
connectToDb();

const express = require("express");
var cors = require('cors') 

const app = express();
const port = process.env.REACT_APP_PORT;

app.get('/', (req, res) => {
    res.send('hello world')
})
//AVAILABLE ROUTES
app.use(cors())
app.use(express.json());  //to use req.body we have to use this middleware
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// START THE SERVER
app.listen(port, () => {
    console.log(`The iNotebook application started successfully at http://localhost:${port}`);
});