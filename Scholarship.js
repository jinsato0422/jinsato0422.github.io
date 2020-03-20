// // Initialize Cloud Firestore through Firebase
// firebase.initializeApp({
//     apiKey: "AIzaSyDg47nllVUMwivPM9UcXWzdBpQVYayD-MY",
//     authDomain: "scholarshipdatabase-a4ba6.firebaseapp.com",
//     projectId: "scholarshipdatabase-a4ba6"
// });



const firebaseConfig = {
    apiKey: "AIzaSyDg47nllVUMwivPM9UcXWzdBpQVYayD-MY",
    authDomain: "scholarshipdatabase-a4ba6.firebaseapp.com",
    databaseURL: "https://scholarshipdatabase-a4ba6.firebaseio.com",
    projectId: "scholarshipdatabase-a4ba6",
    storageBucket: "scholarshipdatabase-a4ba6.appspot.com",
    messagingSenderId: "664316210117",
    appId: "1:664316210117:web:664d9e3b601d0f6d31b9ac",
    measurementId: "G-T4BS1QM4Y5"
};

firebase.initializeApp(firebaseConfig);

//Get element
var db = firebase.firestore();
const cafeList = document.querySelector('#cafe-list');

function render(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data()['Number_Available'];
    city.textContent = doc.data()['Deadline'];

    li.appendChild(name);
    li.appendChild(city);

    cafeList.appendChild(li);
}


db.collection("Scholarship Database").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        render(doc)
    });
});