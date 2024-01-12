const express = require('express')
const router = express.Router()
const connexion = require('../controller/DB')


router.get('/', (req, res) => {
    connexion.query('select * from admin', (error, data) => {
        console.log(data);
        res.send('bonjour  Mr admin')
    })
})



router.post('/connexion', (req, res) => {
    let { nom, pwd } = req.body
    if (nom && pwd) {
        connexion.query('select * from admin where nom = ? ', [nom], (error, data) => {
            console.log(data);
            if (data.length) {
                if (data[0].pwd == pwd) {
                        console.log(data);
                    // req.session.id_admin = data[0].id_admin
                    res.render('ok');

                } else {

                    res.json({ message:'mot de passe incorrect '});
                }
            } else {
                console.log(data);
                res.send('nom incorrect')

            }
        })
    } else {
        res.json({message:'remplir tous les champs '})
    }
})


router.post('/déconnexion', (req, res) => {
    req.session.destroy((error) =>{
        if(error){
            return  res.send('page d\'accueil')
        }
        res.clearCookie('session_pointage')
        return res.send('page d\'accueil')
    })
    console.log('passe précédente');
})

// fonction qui me permet de mettre une condition d'authentification de session sur une route

// const permission = (req, res, next ) =>{
//     if(!req.session.id_admin){
//         res.send('veillez vous connectez')
//     }else{
//         next()
//     }
// }




module.exports = router;
// module.exports = permission;