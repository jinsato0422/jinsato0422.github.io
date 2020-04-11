const currentDate = Date.now();
var unaccepted;


removeUnaccepted();

function removeUnaccepted(){
	console.log(currentDate);
	unaccepted = new Array();
	findUnacceptedApplications();
}

function findUnacceptedApplications(){
	var acceptanceData;
	
	database.collection('offers').get().then((snapshot) => {
        snapshot.docs.forEach(offer => {
			acceptanceData = offer.data();
			
			if(acceptanceData.acceptDate < currentDate){			
				unaccepted.push({
					id: acceptanceData.id,
					scholarshipID: acceptanceData.scholarshipID,
					offerID: offer.id
				})
			}
        })
		
		removeApplication();
		removeAcceptance();
    })
	
}


function removeApplication(){
	unaccepted.forEach(function(toRemove){
		database.collection('Scholarship Database').doc(toRemove.scholarshipID)
			.get().then(scholarship =>{
					const scholarshipApplicants = scholarship.data().applicants;
					const numTaken = scholarship.data().numberTaken;				
					const databaseRef = database.collection('Scholarship Database').doc(toRemove.scholarshipID);
					
					
					for( var applicantNum = 0; applicantNum < scholarshipApplicants.length; applicantNum++)
						{ if ( scholarshipApplicants[applicantNum] == toRemove.id) 
							{ scholarshipApplicants.splice(applicantNum, 1); applicantNum--; }}
					
					databaseRef.update({
						applicants: scholarshipApplicants,
						numberTaken: numTaken - 1
					});	
		});
	});
}

function removeAcceptance(){
	unaccepted.forEach(function(toRemove){
		database.collection('offers').doc(toRemove.offerID).delete();
	});

}


