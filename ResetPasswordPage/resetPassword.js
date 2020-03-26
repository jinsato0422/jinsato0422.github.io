var pw;
var verifyPw;
var queryString;
var id;

initiateProgram();

/*Sets up all variables for the program. The queryString holds the users ID. It is set by looking at the 
commands attached to the html command. Essentially, the password reset for the user is set based on how the command
is called. Substringing of the query removes a ? from the query */
function initiateProgram() {
    pw = document.getElementById("password");
    verifyPw = document.getElementById("checkPassword");
    queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    id = queryString;
}

/*Changes a users password in the Firebase Database from its previous password to teh new password given 
by the user. The user is then alerted of the password change and the page is redirected to the login page*/
function changePassword() {
    database.collection('users').doc(id).update({
        password: pw.value
    }).then(function() {
        alert("Your password has been successfully reset. You will now be redirected to the login page");
        window.location.href = "../LoginPage/login.html";
    })
}

/* Checks whether a password is valid. If a password is valid changes the text below the 
password text area to "Valid Password" and turns the text green*/
function verifyGoodPassword() {
    if (checkPassword()) {
        goodPW.innerHTML = "Valid Password";
        goodPW.style.color = "green";
    } else {
        goodPW.innerHTML = "Requirements: 6-20 characters, one numeric digit, one uppercase, one lowercase.";
        goodPW.style.color = "red";
    }
}


/* Checks whether the two copies of the password match. If passwords match changes the text below the 
passwords match text area to "Passwords Match" and turns the text green*/
function verifyPasswordsMatch() {
    if (checkPasswordsMatch()) {
        PWMatch.innerHTML = "Passwords Match";
        PWMatch.style.color = "green";
    } else {
        PWMatch.innerHTML = "Please ensure passwords match.";
        PWMatch.style.color = "red";
    }
}


/*Ensures that passwords match and the initial password is correct. If passwords match and the initial
password is valid, returns true. Otherwise, false is returned*/
function checkPasswordsMatch() {
    if (pw.value == verifyPw.value && checkPassword()) return true;

    return false;
}


/*Checks whether a password contains 6-20 characters, one uppercase, one lowercase and one number. Returns
true if password valid otherwise returns false. 
Code adapted from: https://www.w3resource.com/javascript/form/password-validation.php*/
function checkPassword() {
    var possiblePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (pw.value.match(possiblePassword)) return true;

    return false;
}

/*Calls all the functionality to reset the password. First makes sure the password given by the user is 
valid and if the password is valid, calls the changePassword method. The event.preventDefault command 
stops the page from reloading due to pressing the submit button. If the password is invalid the user
is alerted and the page is reloaded. */
function resetPassword() {
    if (checkPassword() && checkPasswordsMatch()) {
        event.preventDefault();
        changePassword();
    } else {
        alert("It appears that you have entered an invalid password. Please try again");
    }
}