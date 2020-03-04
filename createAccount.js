var fname;
var lname;
var id;
var email;
var user;
var pw;
var verifyPw;




function initiateProgram(){
	fname = document.getElementById("fname");
	lname = document.getElementById("lname");
	id = document.getElementById("id");
	user = document.getElementById("user");
	pw = document.getElementById("pw");
	verifyPw = document.getElementById("trupw");
	email = document.getElementById("email");
}

function verifyGoodEmail(){
	if (validateEmail()){
		validEmail.innerHTML = "Valid Email.";
		validEmail.style.color = "green";
	}
}

function verifyGoodPassword(){
	// alert("verifying");
	if (checkPassword()){
		goodPW.innerHTML = "Valid Password";
		goodPW.style.color = "green";
	}
}

function verifyPasswordsMatch(){
	if (checkPasswordsMatch()){
		PWMatch.innerHTML = "Passwords Match";
		PWMatch.style.color = "green";
	}
}


function checkPasswordsMatch(){
	if (pw.value == verifyPw.value && checkPassword()) return true;
	
	return false;
}


/* Code adapted from: https://www.w3resource.com/javascript/form/password-validation.php*/
function checkPassword() 
{ 
	var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
	if(pw.value.match(passw))return true;
	
	return false;
}


/* Code adapted from: https://www.w3resource.com/javascript/form/email-validation.php */
function validateEmail() 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) return true;
 
 return false;
}


function returnToSignIn(){
	window.location.href = "login.html";
}


function verifyValidSubmission(){
	if (!(checkPasswordsMatch() && validateEmail())||(fname.value == "") || 
						(lname.value == "") || (id.value == "") || (user.value == "")){
		document.mainform.action = "createAccount.html";
		alert("One or more fields has invalid information, please try again");
	}
}	