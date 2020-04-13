// Runs functionality for the return to main button on many pages

var returnButton;

initiate();

// Sets up event listener for the returnToMain button
function initiate(){
	returnButton  = document.getElementById("returnToMain");
	returnButton.addEventListener('click', (e) =>{
		returnToMain();
	})
}

// Moves the user to the main homepage, passing along the user ID of the user
function returnToMain(){
	var id = findUser();
	window.location.href ="../Homepage/Homepage.html?" + id;
}

// Finds the user ID of the current user
function findUser(){
	var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    return queryString;
}


