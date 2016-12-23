const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const MongoClient = require('mongodb').MongoClient;

var db

MongoClient.connect('mongodb://<dbname>:<password>@ds143588.mlab.com:43588/quotes-app', (err, database) => {
    if (err) return console.log(err)
    db = database
    app.listen(3000, () => {
        console.log('listening on 3000')
    })
})
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// })

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {quotes: result})
  })
})


app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
        res.redirect('/')
    })
})
