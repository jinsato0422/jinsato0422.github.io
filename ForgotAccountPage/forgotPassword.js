var email;

/*Sets up the email variable to the field with the id "email" when the page is loaded*/
function initiateProgram(){
	email = document.getElementById("email");
}

/*Sends an alert to the user saying an email has been sent to their email address */
function sendEmail(){
	alert("An email has been sent to " + email.value + " with your login information.");
}





/* More functionality will be put into this code at a later date including the verification
that the email given by the user is in our database and actually
sending a password request form to that email.... but the database needs to be set up
first so for now forgetting ones password is very simple 8*/