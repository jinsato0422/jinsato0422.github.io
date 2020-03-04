var username;
var pw;
var textElements;
var startingTextElements;

var userInformation;


/*Begins the program by establishing the essential variables and creating the userInformation
array */

function initiateProgram(){
	username = document.getElementById("user");
	pw = document.getElementById("pw");
	textElements = new Array(username, pw);
	startingTextElements = ["Username", "Password"];
	
	userInformation = new Array(
		{username: "ebrintn", pw: "dog"},
		{username: "frog", pw: "piano"},
		{username: "jjrey", pw: "cat"},
		{username: "leopard", pw: "leopard"}
	);

	
}

/* Ensures that a given username aligns to a given password, sends an error 
message and rejects password if incorrect */
function verifyPassword(){
	var user = binarySearch(userInformation, username.value, 0, userInformation.length - 1);
	if (user === undefined || pw.value != user.pw){
		document.mainform.action = "login.html";
		alert("Sorry you entered an incorrect username or password, please try again");
	}
}


/* Performs a binary search to find the data for a given username -- eventually
this should be converted to a search of a database to find the information for
the user */
function binarySearch (d, t, s, e) {
  const m = Math.floor((s + e)/2);
  if (t == d[m].username)return d[m];
  if ((e-1) === s ){
	  if (t == d[e].username) return d[e];
	  else return undefined; 
  }
  if (t > d[m].username){
	  return binarySearch(d,t,m,e);
  }
  if (t < d[m].username){
	  return binarySearch(d,t,s,m);
  }
}

/*The next two functions load other windows when certain buttons are pressed*/
function forgotPassword(){
	window.location.href = "forgotPassword.html";
}

function newAccount(){
	window.location.href = "createAccount.html";
}

	