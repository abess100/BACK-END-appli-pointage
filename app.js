const express = require("express")
const parser = require('body-parser')
const mysql = require('./controller/DB')
const connexion = require("./controller/DB")
const session = require('express-session')
const ejs = require('ejs')
const cors = require('cors')

const permission = require('./routes/connexion-admin.routes')

const port = 5000
const app = express()

//moteur de vue de vue ejs
app.set('views engine', 'ejs')
app.set('views')


app.use(express.json())
app.use(parser.urlencoded({ extended: false }))
// app.use(cors)
app.use(session({
    name: 'session_pointage',
    resave: true,
    saveUninitialized: true,
    secret: "appli_de_pointage",
    cookie:{ secure:true }
}))

app.get('/', (req, res) => {
    // res.send('bonjour')
    res.render('index.ejs')
    // console.log(req.session);
})



app.use('/admin', require('./routes/connexion-admin.routes'));
app.use('/apprenant', require('./routes/apprenant.routes'))
app.use('/pointage', require('./routes/pointage.routes'))
app.listen(port, () => {
    console.log('le serveur tourne au port ' + port);
})