var email;
var userInfo = null;
var emailText;

initiateProgram();

/*Sets up the email variable to the field with the id "email" when the page is loaded*/
function initiateProgram() {
    email = document.getElementById("email");
}

/* Calls to other functions to get account information about a given user, ie. the user that forgot
their password. Prevent default stops the page from reloading when a user presses the submit button */
function retrieveAccountInformation() {
    event.preventDefault();
    findUser();
}


/*First, sets up the email to be sent to the user by calling the setEmailText() command. Then, sends and email using smtp.js and 
elastic email with the email text to be sent out. This command uses a secure token that links to the email address scholarships@jjreyconsulting.xyz.
This email address was made specifically for the software and an email will be sent, allowing the user to reset their password. We bought the 
domain jjreyconsulting.xyz to allow or email hositing. Once the email sends (hopefully right away - it can be delayed due to spam alerts), an
alert is given to the user saying the email is sent. The page is then redirected to the login page */
function sendEmail() {


    setEmailText();

    Email.send({
        SecureToken: "ea494848-e3e2-4607-a7bc-17103bbc8aa1",
        To: email.value,
        From: "scholarships@jjreyconsulting.xyz",
        Subject: "Password Request for U of S Scholarships",
        Body: emailText
    }).then(function() {
        alert("An email has been sent to " + email.value + " with your login information.");
        window.location.href = "../LoginPage/login.html";
    });

}

/*When the return to main page button is pressed the user is redirected to the login page*/
function returnToMain() {
    window.location.href = "../LoginPage/login.html";
}


/*Looks into the firebase data base for the user who wants to reset their password. If the user is found then the userInfo variable is set to
the given user, the sendEmail() function is then called to send the email to the user at their specified email. If the user's email is not 
found an alert is given and the page is reloaded*/
function findUser() {
    database.collection('users').get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            if (doc.data().email == email.value) {
                userInfo = doc;
            }
        })

        if (userInfo == null) {
            alert("We're sorry, there is no account attached to that email. Please verify that you entered the correct email address " +
                "and that there is an account attached to the email.");
            location.reload();
        } else {
            sendEmail();
        }
    })
}

/*Sets the text of the email to a given body of text. The first few variables are called to set up the correct reset password link. It 
does this by looking where the information is stored and then adds the resetpassword page to the current location */
function setEmailText() {
    var docLocation = document.location;
    docLocation = docLocation.toString();
    var placeToTrim = docLocation.search("../ForgotPasswordPage/forgotPassword.html");
    docLocation = docLocation.substring(0, placeToTrim);
    docLocation = docLocation + "../ResetPasswordPage/resetPassword.html?" + userInfo.data().id;


    emailText = "Hi " + userInfo.data().name + ", <br> We recieved a request" +
        " to reset your password on the University of Saskatchewan Scholarships page. We are here to help! <br> If you made this" +
        " request, simply click on the link to reset your password: " + docLocation + " <br> If you did not" +
        " make this request, you may ignore this email. Your personal information is safe with us!";
}