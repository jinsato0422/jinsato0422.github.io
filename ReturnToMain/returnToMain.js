var returnButton;

initiate();

function initiate(){
	returnButton  = document.getElementById("returnToMain");
	returnButton.addEventListener('click', (e) =>{
		returnToMain();
	})
}

function returnToMain(){
	var id = findUser();
	
	window.location.href ="../Homepage/Homepage.html?" ;
}

function findUser(){
	var queryString = decodeURIComponent(window.location.search);
    queryString = queryString.substring(1);
    return queryString;
}


