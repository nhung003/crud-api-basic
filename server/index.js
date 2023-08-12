const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());

const product = require('./routes/product');

app.use(express.json());

const port = 8000;
app.listen(port, () =>{
     console.log(`Ung dung dang chay voi port ${port}`);
});

app.use('/', product);