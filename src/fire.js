import * as firebase from "firebase";

const configOptions = {//LAS CREDENCIALES DE LA BASE DE DATOS DE FIREBASE
    apiKey: "AIzaSyCszWN2jo87JxcTmeHec-Pz7nNX7YBAYXI",
    authDomain: "cripto-app.firebaseapp.com",
    databaseURL: "https://cripto-app.firebaseio.com/",
    projectId: "cripto-app",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

firebase.initializeApp(configOptions);
export const db = firebase.database();//ESTA ES LA CONSTANTE QUE HACE REFERENCIA AL NOMBRE DE DB DE FIREBASE QUE SE UTILIZARA