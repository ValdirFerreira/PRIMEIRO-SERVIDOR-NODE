const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const res = require('express/lib/response');

// criar serviço 

const app = express();

// aplicando config dentro de express 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


var corsOptions = {
    origin: "http:\\exemplo.com",
    optionsSuccessStatus: 1200
}

var allowlist = ['http://example1.com', 'http://example2.com']

var corsOptionsDelegate = function (req, callback) {
    var corsOptions;

    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true }
    }
    else {
        corsOptions = { origin: true }
    }

    callback(null, corsOptions);
}


// Simular banco de dados

const data = [];

//http://localhost:5000
app.get('/', (req, res) => {
    return res.json({ data });
})


//http://localhost:5000/add
app.post('/add', (req, res) => {
    const result = req.body;

    if (!result) {
        return res.status(400).end();
    }

    data.push(result);
    return res.json({ result });
})


//http://localhost:5000/addCors
app.post('/addCors', cors(corsOptions), (req, res) => {
    const result = req.body;

    if (!result) {
        return res.status(400).end();
    }

    data.push(result);
    return res.json({ result });
})

//http://localhost:5000/addListCors
app.post('/addListCors', cors(corsOptionsDelegate), (req, res) => {
    const result = req.body;

    if (!result) {
        return res.status(400).end();
    }

    data.push(result);
    return res.json({ result });
})





app.listen(5000, () => console.log('Express iniciado na porta 5000  http://localhost:5000'))