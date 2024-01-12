const express = require('express')
const connexion = require('../controller/DB')
const router = express.Router()


router.get('/', (req, res) => {
    connexion.query( 'select * from connexion inner join apprenant on connexion.id_unique = apprenant.id_unique;', (error, data) => {
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
    const { id_unique } = req.body;
    if(id_unique){
        connexion.query('insert into connexion (id_unique) value (?)',[id_unique] ,(error, data) => {
            if(error){
                res.send('erreur')
            }else{
                res.send('pointage succès')
                console.log(data);
            }
            
        })
    }else{
        res.send('veillez remplir le champs ')
    }
    
})

router.delete('/:id_connexion', (req,res) => {
    const id_connexion = req.params.id_connexion;
    connexion.query('delete from connexion where id_connexion = ?',[id_connexion], (error,data) => {
        if(error) throw error
        res.send('suppression réussi')
    })
})






module.exports = router