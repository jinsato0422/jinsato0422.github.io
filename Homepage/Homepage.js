function findUser() {
    var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    return queryString;
}

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

function InitHomepage() {
    var navbarElementsList = document.querySelectorAll('.nav-link');
    navbarElementsList[0].setAttribute('href', "../HomePage/HomePage.html?" + findUser());
    navbarElementsList[1].setAttribute('href', "../ScholarshipPage/ScholarshipPage.html?" + findUser());
    navbarElementsList[2].setAttribute('href', "../StatisticsPage/StatisticsPage.html?" + findUser());
    navbarElementsList[3].setAttribute('href', "../AddScholarshipPage/NewScholarship.html?" + findUser());
    navbarElementsList[4].setAttribute('href', "../PickRecipientPage/pickRecipient.html?" + findUser());
    console.log(document.querySelector('#apply'));

    if (document.querySelector('#apply') != null) {
        document.querySelector('#apply').setAttribute("onclick", "window.location.href ='../ApplyPage/applicationform.html?" + findUser() + "';");
    }
}
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

InitHomepage();
var dataList = getDatabase("users");
console.log(dataList);
wait(1 * 1000).then(() => {
    render();
});