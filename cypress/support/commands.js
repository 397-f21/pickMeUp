// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
    apiKey: "AIzaSyAnhSevAkWPjJrUq_u64p0tRiWyuY8yOfY",
    authDomain: "pickmeup-58c4e.firebaseapp.com",
    databaseURL: "https://pickmeup-58c4e-default-rtdb.firebaseio.com",
    projectId: "pickmeup-58c4e",
    storageBucket: "pickmeup-58c4e.appspot.com",
    messagingSenderId: "377889989363",
    appId: "1:377889989363:web:e306d689d3358d42ba0d86",
    measurementId: "G-WRWZ4S88ZM"
};

firebase.initializeApp(fbConfig);

attachCustomCommands({ Cypress, cy, firebase });