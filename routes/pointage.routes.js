const express = require('express')
const connexion = require('../controller/DB')
const router = express.Router()

// router.get('/', (req, res) => {
//     connexion.query('select * from connexion', (error, data) => {
//         if (error) {
//             res.send('erreur')
//         } else {
//             // console.log(data);
//             res.send(data)
//         }
//     })
// })
router.get('/', (req, res) => {
    connexion.query( 'select * from connexion inner join apprenant on connexion.id_connexion = apprenant.id_apprenant;', (error, data) => {
        if (error) {
            res.send('erreur')
        } else {
            // console.log(data);
            res.send(data)
        }
    })
})

router.get('/dashbord', (req,res) =>{
    connexion.query(' select (select count(*) from connexion) As pointage', (error, data) =>{
        if(error){
            res.send('error')
        }else{
            res.send(data)
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