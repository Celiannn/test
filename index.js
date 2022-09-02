const express = require("express")
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, onValue, set, get } = require('firebase/database');

const app = express();

const firebaseConfig = {
    apiKey: "AIzaSyBCCl-xvjkJ-S-gK9DhIewsJYpEMXAHTAg",
    authDomain: "virtual-tag-6eb92.firebaseapp.com",
    databaseURL: "https://virtual-tag-6eb92-default-rtdb.firebaseio.com",
    projectId: "virtual-tag-6eb92",
    storageBucket: "virtual-tag-6eb92.appspot.com",
    messagingSenderId: "268850849904",
    appId: "1:268850849904:web:3f281c24b45ba31a056cb5"
};

const fireApp = initializeApp(firebaseConfig);
const db = getDatabase(fireApp);

const gRef = ref(db, 'Graffitis');
let emailMaxLike;
let idMaxLike;
onValue(gRef, (snap) => {
    const likes = []

    let maxLike = 0
    let idMax = 0
    snap.forEach(child => {

        let data = child.val()

        likes.push(data['like'],data['email'],data['id'])
        if(data['like'] > maxLike && data['id']){
            emailMaxLike = data['email']
            maxLike = data['like']
            idMaxLike = data['id']
        }
    })
    module.exports = {emailMaxLike}
    module.exports = {idMaxLike}

});



const nodemailer = require("nodemailer")
//var {emailMaxLike} = require("./index")
//let sprintf = require('sprintf-js').sprintf;
module.exports.send = async function(){
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user: "lopezchefchoufi.celian@gmail.com",
            pass: "enwburwetfldbmed"
        }
    })
    const mailOption = {
        from: "lopezchefchoufi.celian@gmail.com",
        to: emailMaxLike,
        subject:"test",
        text: "https://www.google.fr/" + idMaxLike


    }

    console.log(mailOption)
    await transporter.sendMail(mailOption, function (err){
        if (err){
            console.log(err)
        }
        else {
            console.log("email sent: " + infos.response)
        }

    })
}