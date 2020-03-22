var pw;
var verifyPw;
var queryString;
var id;

initiateProgram();

function initiateProgram(){
	pw = document.getElementById("password");
	verifyPw = document.getElementById("checkPassword");
	queryString = decodeURIComponent(window.location.search);
	queryString = queryString.substring(1);
	id = queryString;
}

function changePassword(){
	console.log(id);
	database.collection('users').doc(id).update({
		password: pw.value
	}).then(function(){
		alert("Your password has been successfully reset. You will now be redirected to the login page");
		window.location.href = "login.html";
	})
}

/* Checks whether a password is valid. If a password is valid changes the text below the 
password text area to "Valid Password" and turns the text green*/
function verifyGoodPassword(){
	if (checkPassword()){
		goodPW.innerHTML = "Valid Password";
		goodPW.style.color = "green";
	} else {
		goodPW.innerHTML = "Requirements: 6-20 characters, one numeric digit, one uppercase, one lowercase.";
		goodPW.style.color = "red";
	}
}


/* Checks whether the two copies of the password match. If passwords match changes the text below the 
passwords match text area to "Passwords Match" and turns the text green*/
function verifyPasswordsMatch(){
	if (checkPasswordsMatch()){
		PWMatch.innerHTML = "Passwords Match";
		PWMatch.style.color = "green";
	} else {
		PWMatch.innerHTML = "Please ensure passwords match.";
		PWMatch.style.color = "red";
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
	var possiblePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
	if(pw.value.match(possiblePassword))return true;
	
	return false;
}


function resetPassword(){
	if (checkPassword() && checkPasswordsMatch()){
		event.preventDefault();
		changePassword();
	}
	else {
		alert("It appears that you have entered an invalid password. Please try again");
	}
}