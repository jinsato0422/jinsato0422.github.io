function findUser() {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    return queryString;
}
// Configuration for the Firebase
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

//Get the database
var db = firebase.firestore();

// This retrieves the scholarship data from Firebase
function render() {
    if (findUser() != '') {
        var counter = 0;
        db.collection("users").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                if (findUser() == doc.id) {
                    console.log(doc.id)
                    var userType = doc.data()['type'];
                    console.log(userType);
                    UserDisplay(userType);
                } else if (findUser() != doc.id) {
                    counter += 1;
                    console.log(counter);
                    console.log(dataList.length);
                    if (counter == dataList.length) {
                        alert('It seems that we detected that you are not an authorized user\nRedirecting you to Login Page');
                        window.location.href = "../LoginPage/login.html";
                    }
                }
            });
        });
    } else {
        alert('It seems that we detected that you have not logged in properly\nRedirecting you to Login Page');
        window.location.href = "../LoginPage/login.html";
    }
}


function getDatabase(name) {
    var databaseList = []
    db.collection(name).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(doc.id);
            databaseList.push(doc.id);
        });
    })
    return databaseList;
}




function UserDisplay(userType) {
    if (userType == 'Student') {
        var navbarElementsList = document.querySelectorAll('.nav-item');
        console.log("This is the list");
        console.log(navbarElementsList);
        var totalLength = navbarElementsList.length;
        console.log(navbarElementsList[totalLength - 1].classList);
        // const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
        // wait(1 * 1000).then(() => {
        navbarElementsList[totalLength - 1].classList.add("d-none");
        navbarElementsList[totalLength - 1].classList.add("disabled");
        navbarElementsList[totalLength - 2].classList.add("d-none");
        navbarElementsList[totalLength - 2].classList.add("disabled");
        console.log(navbarElementsList[totalLength - 1].classList);
        // })


    } else if (userType == 'Coordinator') {

    } else if (userType == 'Professor') {
        var navbarElementsList = document.querySelectorAll('.nav-item');
        console.log("This is the list");
        console.log(navbarElementsList);
        var totalLength = navbarElementsList.length;
        console.log(navbarElementsList[totalLength - 1].classList);
        // const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
        // wait(1 * 1000).then(() => {
        navbarElementsList[totalLength - 1].classList.add("d-none");
        navbarElementsList[totalLength - 1].classList.add("disabled");
        navbarElementsList[totalLength - 2].classList.add("d-none");
        navbarElementsList[totalLength - 2].classList.add("disabled");
        console.log(navbarElementsList[totalLength - 1].classList);
    } else {
        alert('It seems that we detected that you are not an authorized user\nRedirecting you to Login Page');
        window.location.href = "../LoginPage/login.html";
    }
}
var dataList = getDatabase("users");
console.log(dataList);
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
wait(0.5 * 1000).then(() => {
    render();
})