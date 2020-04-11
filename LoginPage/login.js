var username;
var pw;
var textElements;
var startingTextElements;

var userInformation;

initiateProgram();

/*Begins the program by establishing the essential variables and creating the userInformation
array */

function initiateProgram() {
    username = document.getElementById("user");
    pw = document.getElementById("pw");
    textElements = new Array(username, pw);
    startingTextElements = ["Username", "Password"];

    userInformation = new Array();

    loadUserInformation();


}

/* Loads the usernames and passwords for the users and holds these in  an array that is acessed  
in later functions. This process takes some time, so the snapshot is used to enter the information
only after all the data has been accessed */
function loadUserInformation() {
    database.collection('users').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            addToUserInformation(doc)
        })
    })
}

/* Adds a user to the user information array by taking an input of information about that user. 
Adds the variable created from the user information to the userInformation array*/
function addToUserInformation(info) {
    var user = {
        username: info.data().id,
        pw: info.data().password
    }

    userInformation.push(user);
}


/* Ensures that a given username aligns to a given password, sends an error 
message and rejects password if incorrect */
function verifyPassword() {
	event.preventDefault();
    var user = binarySearch(userInformation, username.value, 0, userInformation.length - 1);
    if (user === undefined || pw.value != user.pw) {
        window.location.href = "login.html";
        alert("Sorry you entered an incorrect username or password, please try again");
    } else {
		window.location.href ="../Homepage/Homepage.html?" + user.username;
	}

}


/* Performs a binary search to find the data for a given username -- eventually
this should be converted to a search of a database to find the information for
the user */
function binarySearch(d, t, s, e) {
    const m = Math.floor((s + e) / 2);
    if (t == d[m].username) return d[m];
    if ((e - 1) === s) {
        if (t == d[e].username) return d[e];
        else return undefined;
    }
    if (t > d[m].username) {
        return binarySearch(d, t, m, e);
    }
    if (t < d[m].username) {
        return binarySearch(d, t, s, m);
    }
}

/*Loads the forgotPassword page when the forgot password button*/
function forgotPassword() {
    window.location.href = "../ForgotPasswordPage/forgotPassword.html";
}


/*Loads the createAcount page when the function is called - new account button is pressed */
function newAccount() {
    window.location.href = "../CreateAccountPage/createAccount.html";
}