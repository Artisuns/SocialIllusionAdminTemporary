import { initializeApp} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {getAuth, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDiwNU-NOEj8gW8J9MDb2nOhRZync4Rgc",
  authDomain: "socialillusiondevlogadmin.firebaseapp.com",
  projectId: "socialillusiondevlogadmin",
  storageBucket: "socialillusiondevlogadmin.appspot.com",
  messagingSenderId: "795885451862",
  appId: "1:795885451862:web:cf5225f6f4d34c0f4799f7",
  measurementId: "G-3XDTQGB5H2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth()

import {getDatabase, ref, set, get, child, update, remove} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const db = getDatabase();

var usernametxtbox = document.getElementById("username")
var passwordtxtbox = document.getElementById("password")
var submitbtn = document.getElementById("submitbtn")
var incorrecttxt = document.getElementById("incorrecttxt")
var logoimg1 = document.getElementById("logo")
var welcometxt = document.getElementById("welcometxt")
var hopetxt = document.getElementById("hopetxt")
var todaydate1 = document.getElementById("todaydate1")
var profilepic1 = document.getElementById("profilepic1")

function signin()
{
    signInWithEmailAndPassword(auth, usernametxtbox.value, passwordtxtbox.value).then((creds) => 
    {
        const useruid = creds.user.uid;
        verifyuser(useruid)
    })
    .catch((err) => 
    {
        incorrecttxt.innerText = "Incorrect username or password"
        setTimeout(() => 
        {
            incorrecttxt.innerText = ""
        }, 2000)
    })
}

function verifyuser(uid)
{
    var dbref = ref(db)
    get(child(dbref, "Admins/" + uid)).then((snapshot) => 
    {
        if (snapshot.exists())
        {
            if (passwordtxtbox.value == snapshot.val().password)
            {
                loginfadeout(snapshot.val().name, snapshot.val().profilepic)
            }
        }
    })
}

function loginfadeout(name, profilepic)
{
    document.body.style.animation = 'changebackground 3s'
    document.body.style.animationFillMode = 'forwards'
    usernametxtbox.style.animation = 'fadeout 3s'
    usernametxtbox.style.animationFillMode = 'forwards'
    passwordtxtbox.style.animation = 'fadeout 3s'
    passwordtxtbox.style.animationFillMode = 'forwards'
    submitbtn.style.animation = 'fadeout 3s'
    submitbtn.style.animationFillMode = 'forwards'
    logoimg1.style.animation = 'fadeout 3s'
    logoimg1.style.animationFillMode = 'forwards'
    welcometxt.innerText = "Welcome, " + name
    welcometxt.style.animation = 'fadein 3s'
    welcometxt.style.animationFillMode = 'forwards'
    hopetxt.style.animation = 'fadein 3s'
    hopetxt.style.animationFillMode = 'forwards'
    todaydate1.innerText = "Today is " + new Date().toDateString()
    todaydate1.style.animation = 'fadein 3s'
    todaydate1.style.animationFillMode = 'forwards'
    profilepic1.src = profilepic
    profilepic1.style.animation = 'fadein 3s'
    profilepic1.style.animationFillMode = 'forwards'
    setTimeout(()=>
    {
        usernametxtbox.remove()
        passwordtxtbox.remove()
        submitbtn.remove()
        logoimg1.remove()
        incorrecttxt.remove()
    }, 3000)
    setTimeout(()=>
    {
        hopetxt.style.animation = 'fadeout 0.5s'
        welcometxt.innerText = name
        welcometxt.style.animation = 'welcometxtmove 2s'
        welcometxt.style.animationFillMode = 'forwards'
        todaydate1.innerText = new Date().toDateString()
        todaydate1.style.animation = 'todaydatemove 2s'
        todaydate1.style.animationFillMode = 'forwards'
        profilepic1.style.animation = 'profilepicmove 2s'
        profilepic1.style.animationFillMode = 'forwards'
    }, 6000)
}

submitbtn.addEventListener("click", signin)
