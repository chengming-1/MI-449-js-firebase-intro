/* global firebase addWoofRow updateWoofRow deleteWoofRow */

// NOTE:
//   Ignore the comments with "eslint" -- those comments are telling
//   the linter it can safely hide the errors on those lines.

// TODO Sign into Firestore
const firebaseConfig = {
  apiKey: 'AIzaSyBDX5xeKvev8Fx4Zba-Dqs9ojqeczBI5kc',
  authDomain: 'js-firebase-intro-1e925.firebaseapp.com',
  projectId: 'js-firebase-intro-1e925',
  storageBucket: 'js-firebase-intro-1e925.appspot.com',
  messagingSenderId: '59947072055',
  appId: '1:59947072055:web:837168fb8230f24739ddb2'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
// CREATE a new woof in the database
function createWoofInDatabase (woof) { // eslint-disable-line no-unused-vars
  db.collection('woofs').add(woof)// TODO create a new document in the collection
}

// READ from Firestore when woofs are added, modified, or removed
// Call one of the following functions for each changed document:
//  1. addWoofRow(<woofKey>, <woof>)
//  2. updateWoofRow(<woofKey>, <woof>)
//  3. deleteWoofRow(<woofKey>)
// Make sure to pass the correct parameters!
function readWoofsInDatabase () {
  db.collection('woofs')
    .onSnapshot(function (snapshot) {
      snapshot.docChanges().forEach(function (change) {
        const woof = change.doc.data()
        if (change.type === 'added') {
          addWoofRow(woof.key, woof.val())
        } else if (change.type === 'modified') {
          updateWoofRow(woof.key, woof.val())
        } else if (change.type === 'removed') {
          deleteWoofRow(woof.key)
        }
      })
      updateWoofInDatabase()
    })
}

// UPDATE the woof in the database
function updateWoofInDatabase (woofKey, woofText) { // eslint-disable-line no-unused-vars
  db.collection('woofs').doc(woofKey).set({ woofText }, { merge: true })// TODO update the document in the collection
}

// DELETE the woof from the database
function deleteWoofFromDatabase (woofKey) { // eslint-disable-line no-unused-vars
  db.collection('woofs').doc(woofKey).delete()// TODO delete the document from the collection
}

// Load all of the data
readWoofsInDatabase()
