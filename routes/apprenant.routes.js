const express = require('express')
const connexion = require('../controller/DB')
const router = express.Router()


router.get('/', (req, res) => {
    connexion.query('select * from apprenant', (error, data) => {
        console.log(data);
        res.send(data)
    })
})

router.post('/', (req, res) => {
    const { id_unique, nom, prenom, referentiel } = req.body
    connexion.query('insert into apprenant ( id_unique, nom, prenom, referentiel) values (?, ?, ?, ?)', [id_unique, nom, prenom, referentiel], (error, data) => {
        if (error) {
            res.send('erreur d\'ajout d\'apprenent')
        } else {
            res.send('apprenant ajouté avec succès')
        }
    })
})


router.put('/:id_apprenant', (req, res) => {
    const id_apprenant = req.params.id_apprenant
    const { id_unique, nom, prenom, referentiel } = req.body
    connexion.query('update apprenant set id_unique = ?, nom =? , prenom = ?, referentiel = ?where id_apprenant =?', [id_unique, nom, prenom, referentiel, id_apprenant], (error, data) => {
        if (error) {
            res.send('erreur de mise à jour de l\'apprenant');
        } else {
            res.send('mise à jour de l\' apprenant effectuée');
            console.log(data);
        }
    })
})

router.delete('/:id_apprenant', (req, res) => {
    const id_apprenant = req.params.id_apprenant;
    connexion.query('delete from apprenant where id_apprenant = ?', [req.params.id_apprenant], (error, data) => {
        if (error) {
            res.send('erreur de suppression')
        } else {
            res.send('suppression effectée avec succès')
        }
    })

})


module.exports = router