const currentDate = Date.now();
var unaccepted;


removeUnaccepted();

/* Removes scholarship offers if they have not been accepted after 2 weeks of the offer. Called
   every time the login page is accessed*/
function removeUnaccepted(){
	unaccepted = new Array();
	findUnacceptedApplications();
}


/* Parses the database for scholarship offers that have passed their scholarship offer date,
   calls the functions to remove the scholarship offers */
function findUnacceptedApplications(){
	var acceptanceData;
	
	database.collection('offers').get().then((snapshot) => {
        snapshot.docs.forEach(offer => {
			acceptanceData = offer.data();
			dates = acceptanceData.acceptDate;
			offers = acceptanceData.scholarshipID;
			accepted = acceptanceData.acceptedScholarships;
			
			//Parse through all scholarships to see if their acceptance date is before todays date
			for(var scholarshipNum = 0; scholarshipNum < dates.length; scholarshipNum++){
				if(dates[scholarshipNum] < currentDate){
					const scholarshipName = offers[scholarshipNum];
					var isAccepted = false;
					
					//Check to see if scholarship has been accepted
					accepted.forEach(acceptance => {
						if (acceptance == scholarshipName){
							isAccepted = true;
						}
					});
					
					
					//Has not been accepted, needs to be removed
					if (!isAccepted){
						unaccepted.push({
						id: acceptanceData.id,
						scholarshipID: scholarshipName,
						offerID: offer.id,
						arrayLocation: scholarshipNum
						})
					}
				}
			}
        })
		
		
		removeApplication();
		removeAcceptance();
    })
	
}

/* Removes the application for a scholarship that has not been accepted after two weeks 
   from the database so that the scholarship coordinator does not try to make the offer
   again */
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


/* Removes the offer from the offer section of the scholarship database */
function removeAcceptance(){
	unaccepted.forEach(function(toRemove){
		database.collection('offers').doc(toRemove.id)
			.get().then(scholarship =>{
					const updatedOffers = scholarship.data().scholarshipID.splice(toRemove.arrayLocation-1,1);
					const updatedDates = scholarship.data().acceptDate.splice(toRemove.arrayLocation-1,1);
					
					database.collection('offers').doc(toRemove.id).update({
						acceptDate: updatedDates,
						scholarshipID: updatedOffers
					});
		});
	});

}


