const express = require('express')
const mysql = require('mysql2')

const connexion = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '#Abess1000',
    database:'xpoint'
})

connexion.connect((error) =>{
    if(error){
        console.log('erreur de connexion');
    }else{
        console.log('base de donnée connecté avec succès');
    }
})

module.exports = connexion