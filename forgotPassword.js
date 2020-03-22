var email;
var userInfo = null;
var emailText;

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
	

	setEmailText();
	
	Email.send({
		SecureToken : "ea494848-e3e2-4607-a7bc-17103bbc8aa1",
		To : email.value,
		From : "scholarships@jjreyconsulting.xyz",
		Subject : "Password Request for U of S Scholarships",
		Body : emailText
	}).then(function(){
		alert("An email has been sent to " + email.value + " with your login information.");
		window.location.href = "login.html";
	});

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


function setEmailText(){
	var docLocation = document.location;
	docLocation = docLocation.toString();
	var placeToTrim = docLocation.search("forgotPassword.html");
	docLocation = docLocation.substring(0,placeToTrim);
	docLocation = docLocation + "resetPassword.html?" +userInfo.data().id;
	
	
	emailText = "Hi "+ userInfo.data().name + ", <br> We recieved a request"+
		" to reset your password on the University of Saskatchewan Scholarships page. We are here to help! <br> If you made this" +
		" request, simply click on the link to reset your password: " + docLocation + " <br> If you did not" +
		" make this request, you may ignore this email. Your personal information is safe with us!";
}
