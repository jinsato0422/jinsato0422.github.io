// Finds the user 
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
                    var userType = doc.data()['type'];
                    UserDisplay(userType);
                } else if (findUser() != doc.id) {
                    counter += 1;
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

// gets the database of the argument and stores into a list
function getDatabase(name) {
    var databaseList = []
    db.collection(name).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            databaseList.push(doc.id);
        });
    });
    return databaseList;
}

// Checks if the user is vaild
function UserDisplay(userType) {
    var navbarElementsList = document.querySelectorAll('.nav-item');
    if (userType == 'Student') {
        if (document.querySelector('#apply') != null) {
            document.querySelector('#apply').setAttribute("onclick", "window.location.href ='../ApplyPage/applicationform.html?" + findUser() + "';");
        }
        //show apply 
        navbarElementsList[2].classList.remove("d-none");
        navbarElementsList[2].classList.remove("disabled");
        //show status
        navbarElementsList[4].classList.remove("d-none");
        navbarElementsList[4].classList.remove("disabled");
    } else if (userType == 'Coordinator') {
        var navbarElementsList = document.querySelectorAll('.nav-item');
        var totalLength = navbarElementsList.length;
        // const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
        // wait(1 * 1000).then(() => {
        navbarElementsList[totalLength - 1].classList.remove("d-none");
        navbarElementsList[totalLength - 1].classList.remove("disabled");
        navbarElementsList[totalLength - 2].classList.remove("d-none");
        navbarElementsList[totalLength - 2].classList.remove("disabled");
        if (document.querySelector('#apply') != null) {
            document.querySelector('#apply').classList.add('disabled');
        }
    } else if (userType == 'Professor') {
        navbarElementsList[5].classList.remove("d-none");
        navbarElementsList[5].classList.remove("disabled");
    } else {
        alert('It seems that we detected that you are not an authorized user\nRedirecting you to Login Page');
        window.location.href = "../LoginPage/login.html";
    }
}

// sets the links and buttons
function InitHomepage() {
    var navbarElementsList = document.querySelectorAll('.nav-link');
    navbarElementsList[0].setAttribute('href', "../HomePage/HomePage.html?" + findUser());
    navbarElementsList[1].setAttribute('href', "../ScholarshipPage/ScholarshipPage.html?" + findUser());

    navbarElementsList[2].setAttribute('href', "../StatisticsPage/StatisticsPage.html?" + findUser());
    navbarElementsList[3].setAttribute('href', "../AddScholarshipPage/NewScholarship.html?" + findUser());
    navbarElementsList[4].setAttribute('href', "../PickRecipientPage/pickRecipient.html?" + findUser());

    navbarElementsList[2].setAttribute('href', "../ApplyPage/applicationform.html?" + findUser());
    navbarElementsList[3].setAttribute('href', "../StatisticsPage/StatisticsPage.html?" + findUser());
    navbarElementsList[4].setAttribute('href', "../AcceptancePage/AcceptancePage.html?" + findUser());
    navbarElementsList[5].setAttribute('href', "../ApplyPage/nomination.html?" + findUser());
    navbarElementsList[6].setAttribute('href', "../AddScholarshipPage/NewScholarship.html?" + findUser());
    navbarElementsList[7].setAttribute('href', "../PickRecipientPage/pickRecipient.html?" + findUser());

    if (document.querySelector('#learn') != null) {
        document.querySelector('#learn').setAttribute("onclick", "window.location.href ='../ScholarshipPage/ScholarshipPage.html?" + findUser() + "';");
    }

}
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

InitHomepage();
var dataList = getDatabase("users");
wait(0.1 * 1000).then(() => {
    render();
});