var fname;
var lname;
var id;
var email;
var user;
var pw;
var verifyPw;

initiateProgram();


/*Sets up all the required variables for the program when the page is first loaded. All
variables are text areas that users can fill in on the main form*/
function initiateProgram(){
	fname = document.getElementById("fname");
	lname = document.getElementById("lname");
	id = document.getElementById("id");
	pw = document.getElementById("pw");
	verifyPw = document.getElementById("trupw");
	email = document.getElementById("email");
	
	 

}


/* Checks whether an email is valid. If an email is valid changes the text below the 
email text area to "Valid Email" and turns the text green*/
function verifyGoodEmail(){
	if (validateEmail()){
		validEmail.innerHTML = "Valid Email.";
		validEmail.style.color = "green";
	}
}


/* Checks whether a password is valid. If a password is valid changes the text below the 
password text area to "Valid Password" and turns the text green*/
function verifyGoodPassword(){
	if (checkPassword()){
		goodPW.innerHTML = "Valid Password";
		goodPW.style.color = "green";
	}
}


/* Checks whether the two copies of the password match. If passwords match changes the text below the 
passwords match text area to "Passwords Match" and turns the text green*/
function verifyPasswordsMatch(){
	if (checkPasswordsMatch()){
		PWMatch.innerHTML = "Passwords Match";
		PWMatch.style.color = "green";
	}
}


/*Ensures that passwords match and the initial password is correct. If passwords match and the initial
password is valid, returns true. Otherwise, false is returned*/
function checkPasswordsMatch(){
	if (pw.value == verifyPw.value && checkPassword()) return true;
	
	return false;
}


/*Checks whether a password contains 6-20 characters, one uppercase, one lowercase and one number. Returns
true if password valid otherwise returns false. 
Code adapted from: https://www.w3resource.com/javascript/form/password-validation.php*/
function checkPassword() 
{ 
	var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
	if(pw.value.match(passw))return true;
	
	return false;
}


/*Checks whether an email contains the @ sign, and .ca, .com, etc. Returns true if a correct email
otherwise returns false.
Code adapted from: https://www.w3resource.com/javascript/form/email-validation.php */
function validateEmail() 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) return true;
 
 return false;
}


/*Changes the main page to the login page. Code run when the "Return to sign in" button is
pressed */
function returnToSignIn(){
	window.location.href = "login.html";
}


/*Verifies whether a submission of the form is valid by checking that the passwords match,
that the email is valid and that every field is filled in. If something is invalid,
an alert is sent to the user to try again and the create account page is reloaded. Otherwise,
the successful login page is loaded.*/
function verifyValidSubmission(){
	
	
	if (!(checkPasswordsMatch() && validateEmail())||(fname.value == "") || 
						(lname.value == "") || (id.value == "")){
		alert("One or more fields has invalid information, please try again");
	}
	else {
		event.preventDefault();
		writeUserData();
	}
}	




function writeUserData() {
	
	database.collection('users').doc(id.value).set({
		name: fname.value + " " + lname.value,
		id: id.value,
		email: email.value,
		password: pw.value
	}).then((snapshot)=>{
		window.location.href = "Homepage.html";
	})
  
}