var email;

function initiateProgram(){
	email = document.getElementById("email");
}


function sendEmail(){
	alert("An email has been sent to " + email.value + " with your login information.");
}