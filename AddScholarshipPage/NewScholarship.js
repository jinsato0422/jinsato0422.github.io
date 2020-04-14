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

    })
})
