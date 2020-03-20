var email;
var userInfo = null;

initiateProgram();

/*Sets up the email variable to the field with the id "email" when the page is loaded*/
function initiateProgram(){
	email = document.getElementById("email");
}


function retrieveAccountInformation(){
	event.preventDefault();
	findUser();
}


/*Sends an alert to the user saying an email has been sent to their email address */
function sendEmail(){
	alert("An email has been sent to " + email.value + " with your login information.");
}

function returnToMain(){
	window.location.href = "login.html";
}
	


function findUser(){
	database.collection('users').get().then((snapshot)=>{
		snapshot.docs.forEach(doc => {
			if(doc.data().email == email.value){
				userInfo = doc;
			}
		})
		
		if(userInfo == null){
			alert ("We're sorry, there is no account attached to that email. Please verify that you entered the correct email address "+ 
				"and that there is an account attached to the email.");
			location.reload();
		} else {
			sendEmail();
		}
	})
}
