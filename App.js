const express = require('express');
const app = express();
const port = 7000;
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
const MongoServer = require('mongodb');
const MongoUrl = 'mongodb://localhost:27017';
const MongoClient = MongoServer.MongoClient;
let db;

app.get('/restaurants/:mealtype', (req,res) => {
    query = {"type.mealtype":req.params.mealtype};
    sort_cost = {"cost": 1};

    //Filter by price(high to low)
    if(req.query.hTol) {
        sort_cost = {"cost": Number(req.query.hTol)}
    }

    //Filter based on city
    if(req.query.city) {
        query = {"type.mealtype":req.params.mealtype, "city":req.query.city};
    }

    db.collection('restaurant').find(query).sort(sort_cost).toArray((err,result) => {
        if(err) throw err;
        res.send(result);
    })
})


MongoClient.connect(MongoUrl,(err,client) => {
    if(err) throw err; 
    db = client.db('edurekainternship');
    app.listen(port ,(err) => {
        if(err) throw err;
        console.log(`Server running on port ${port}`);
    })
})