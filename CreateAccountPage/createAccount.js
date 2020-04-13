var fname;
var lname;
var id;
var email;
var user;
var pw;
var verifyPw;
var userType;
var admin = false;

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
	userType = document.getElementById("userTypes");
}


/* Checks whether an ID is valid. If an email is valid changes the text below the 
email text area to "Valid ID" and turns the text green*/
function verifyGoodID(){
	if(validateID()){
		validID.innerHTML = "Valid ID.";
		validID.style.color = "green";
	} else {
		validID.innerHTML = "Please enter your 8-digit ID number.";
		validID.style.color = "red";
	}
}
	

/* Checks whether an email is valid. If an email is valid changes the text below the 
email text area to "Valid Email" and turns the text green*/
function verifyGoodEmail(){
	if (validateEmail()){
		validEmail.innerHTML = "Valid Email.";
		validEmail.style.color = "green";
	} else {
		validEmail.innerHTML = "Please enter a valid email address.";
		validEmail.style.color = "red";
	}
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


/*Checks whether an ID is 8 characters long and only contains numbers. Returns true if an ID contains 
appropriate characters and is 8 characters long. Otherwise, returns falsee.*/
function validateID(){
	var possibleID = /^(?=.*\d).{8}$/
	
	if(id.value.match(possibleID)) return true;
	
	return false;
}


/*Checks whether an email contains the @ sign, and .ca, .com, etc. Returns true if a correct email
otherwise returns false.
Code adapted from: https://www.w3resource.com/javascript/form/email-validation.php */
function validateEmail() 
{
	var possibleEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
	if (possibleEmail.test(email.value)) return true;
 
 return false;
}


/*Changes the main page to the login page. Code run when the "Return to sign in" button is
pressed */
function returnToSignIn(){
	window.location.href = "../LoginPage/login.html";
}



/*Verifies whether a submission of the form is valid by checking that the passwords match,
that the email is valid, the ID is valid and that every field is filled in. If something is invalid,
an alert is sent to the user to try again and the create account page is reloaded. Otherwise,
the successful login page is loaded.*/
function verifyValidSubmission(){
	event.preventDefault();
	
	//Submission must have a valid password, email, ID and the first and last name must not be empty
	if (!(checkPasswordsMatch() && validateEmail() && validateID())||
			(fname.value == "") || (lname.value == "")){
		alert("One or more fields has invalid information, please try again");
	}
	//If someone is the admin, the admin password must be correct to proceed
	else if (admin){
		verifyAdminPassword();
	}
	//If everything is correct the account is created
	else{
		writeUserData();
	}
}	

/* Looks to find if someone has selected the admin option in the select displaying
   potential account creation types. If someone has selected the administration option
   from potential account creation types, displays the box requesting the administration
   password */
function checkIfCoordinator(){
	adminPWStyle = document.getElementById("adminPW");
	
	if (userType.value == "Coordinator"){
		adminPWStyle.style.display = "inline-block";
		admin = true;
	} else{
		adminPWStyle.style.display = "none";
		admin = false;
	}
}



/* Verifies the administration password if a request for the password is made by 
   comparing the inputted password to the administration password stored in the
   database */
function verifyAdminPassword(){
	
	const enteredPassword = document.getElementById("adminPWInput").value;

	//Parse for admin password in database
	database.collection('administration').get().then((snapshot) => {
		snapshot.docs.forEach(doc => {
			if (doc.data().pw == enteredPassword) {
				
				//Admin password is correct so user data can be written
				writeUserData();
			}
			else {
				alert("Incorrect administrator password.");
			}	
		})
	})
}



/* Writes the account infomation for a new account if an account linked to the users ID value does not exist.
If this account is created, a notification is given to the user and the user is redirected to the login page.
If the account linked to the user's given ID number already exists, then the user is alerted that the given
ID has been already selected and they need to get a new ID. These commands are completed by accessing given
Firebase commands. */
function writeUserData() {
	
	var data = database.collection('users').doc(id.value);
	
	database.runTransaction(function(transaction){
		transaction.get(data).then(function(doc){
			if(!doc.exists){
				return data.set({
					name: fname.value + " " + lname.value,
					id: id.value,
					email: email.value,
					password: pw.value,
					type: userType.value
					}).then((snapshot)=>{
					alert("Account created. You will now be redirected to the login page");
					window.location.href = "../LoginPage/login.html";
				})
			}
			else{
				alert("Sorry this user ID is already assigned to another user, please verify that you have entered the correct ID");
			}
		})
	}).catch(function(error) {
	});
	

  
}