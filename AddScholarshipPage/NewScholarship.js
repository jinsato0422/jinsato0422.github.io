var id
//References the form
const form = document.querySelector('#addscholarship');

//Saving data to the database
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('Scholarship Database').doc(form.d_id.value).set({
        name: form.name.value,
        provider: form.provider.value,
        value: form.value.value,
        numberAvailable: form.students.value,
        category: form.category.value,
        offered: form.offered.value,
        courseLoad: form.courseLoad.value,
        fieldOfStudy: form.fieldOfStudy.value,
        yearOfStudy: form.yearOfStudy.value,
        description: form.description.value,
        levelOfStudy: form.levelOfStudy.value,
		deadline: form.deadline.value,
		applicants: []

    }).then(
			/*Show that the scholarship form has been submitted */
		function sendConfirmation(){
			alert("Form successfully submitted, you will now be redirected to the homepage");
			
			var queryString = decodeURIComponent(window.location.search);
			queryString = queryString.substring(1);

			
			window.location.href = "../index.html?" + queryString;
		}
	);


})
