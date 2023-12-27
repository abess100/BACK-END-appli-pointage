const express = require('express')
const connexion = require('../controller/DB')
const router = express.Router()

router.get('/', (req, res) => {
    connexion.query('select * from connexion ', (error, data) => {
        if (error) {
            res.send('erreur')
        } else {
            console.log(data);
            res.send('le pointage')
        }
    })
})

router.post('/', (req, res) => {
    const { id_apprenant } = req.body
    connexion.query('insert into connexion ( id_apprenant ) value (?)', [id_apprenant], (error, data) => {
        if (error) {
            res.send('erreur de pointage')
        } else {
            res.send('pointage réussi');
            console.log(data);
        }
    })
})






module.exports = router