// // Initialize Cloud Firestore through Firebase
// firebase.initializeApp({
//     apiKey: "AIzaSyDg47nllVUMwivPM9UcXWzdBpQVYayD-MY",
//     authDomain: "scholarshipdatabase-a4ba6.firebaseapp.com",
//     projectId: "scholarshipdatabase-a4ba6"
// });



const firebaseConfig = {
    apiKey: "AIzaSyDg47nllVUMwivPM9UcXWzdBpQVYayD-MY",
    authDomain: "scholarshipdatabase-a4ba6.firebaseapp.com",
    databaseURL: "https://scholarshipdatabase-a4ba6.firebaseio.com",
    projectId: "scholarshipdatabase-a4ba6",
    storageBucket: "scholarshipdatabase-a4ba6.appspot.com",
    messagingSenderId: "664316210117",
    appId: "1:664316210117:web:664d9e3b601d0f6d31b9ac",
    measurementId: "G-T4BS1QM4Y5"
};

firebase.initializeApp(firebaseConfig);

//Get element
var db = firebase.firestore();
const scholarshipList = document.querySelector('#scholarship-list');

function render(doc) {
    let mainGrid = document.createElement('div')
    mainGrid.classList.add("col-xl-6");
    // mainGrid.classList.add("panel-body")

    // let subGrid = document.createElement('div')
    // subGrid.classList.add("col-xl-4");

    // mainGrid.classList.add("mb-4");

    let scholarship = document.createElement('div');
    scholarship.classList.add("card");
    scholarship.classList.add("xs-success")
        // scholarship.classList.add("panel-default")
        // scholarship.classList.add("rounded")

    let nameDiv = document.createElement('div');
    nameDiv.classList.add("card-header")

    let group = document.createElement('div');
    group.classList.add("card-body")
    let name = document.createElement('a');
    name.setAttribute("href", "url")
    let value = document.createElement('div');
    value.classList.add("scholarshipInfo");
    let deadline = document.createElement('div');
    deadline.classList.add("scholarshipInfo");
    let description = document.createElement('div');
    description.classList.add("scholarshipInfo");

    let hideAdditionalContent = document.createElement('div');
    let category = document.createElement('div');
    category.classList.add("scholarshipInfo");
    let offered = document.createElement('div');
    offered.classList.add("scholarshipInfo");
    let provider = document.createElement('div');
    provider.classList.add("scholarshipInfo");
    let courseLoad = document.createElement('div');
    courseLoad.classList.add("scholarshipInfo");
    let fieldOfStudy = document.createElement('div');
    fieldOfStudy.classList.add("scholarshipInfo");
    let levelOfStudy = document.createElement('div');
    levelOfStudy.classList.add("scholarshipInfo");
    let numberAvailable = document.createElement('div');
    numberAvailable.classList.add("scholarshipInfo");

    categoryTextContent = "Category: " + doc.data()['category'];
    nameTextContent = doc.data()['name'];
    deadlineTextContent = "Deadline: " + doc.data()['deadline'];
    descriptionTextContent = "Description: " + doc.data()['description'];
    offeredTextContent = "Offered: " + doc.data()['offered'];
    providerTextContent = "Provider: " + doc.data()['provider'];
    valueTextContent = "$" + doc.data()['value'];
    courseLoadTextContent = "Course Load: " + doc.data()['courseLoad'];
    fieldOfStudyTextContent = "Field of Study: " + doc.data()['fieldOfStudy'];
    levelOfStudyTextContent = "Level of Study: " + doc.data()['levelOfStudy'];
    numberAvailableTextContent = "Number Available: " + doc.data()['numberAvailable'];

    var docID = nameTextContent.replace(/\s/g, '')

    hideAdditionalContent.setAttribute("id", docID)
    hideAdditionalContent.classList.add("collapse")

    //Border
    let border = document.createElement('hr');
    border.classList.add("my-4");

    // //Create button 
    let learnMoreButton = document.createElement('a');
    learnMoreButton.innerHTML = "Learn More";
    learnMoreButton.style.color = "white";
    learnMoreButton.classList.add("btn");
    learnMoreButton.classList.add("btn-primary");
    learnMoreButton.classList.add("btn-md");
    learnMoreButton.setAttribute("data-toggle", "collapse")
    learnMoreButton.setAttribute("aria-expanded", "false")
    learnMoreButton.setAttribute("aria-controls", docID)
    learnMoreButton.setAttribute("href", "#" + docID);
    learnMoreButton.setAttribute("role", "button");


    scholarship.setAttribute('data-id', toString(doc.id));

    category.textContent = categoryTextContent;
    name.textContent = nameTextContent;
    deadline.textContent = deadlineTextContent;
    description.textContent = descriptionTextContent;
    offered.textContent = offeredTextContent;
    provider.textContent = providerTextContent;
    value.textContent = valueTextContent;
    courseLoad.textContent = courseLoadTextContent;
    fieldOfStudy.textContent = fieldOfStudyTextContent;
    levelOfStudy.textContent = levelOfStudyTextContent;
    numberAvailable.textContent = numberAvailableTextContent;

    // mainGrid.appendChild(subGrid)

    // subGrid.appendChild(scholarship)
    mainGrid.appendChild(scholarship)

    nameDiv.appendChild(name)
    scholarship.appendChild(nameDiv);
    group.appendChild(value);
    group.appendChild(deadline);
    group.appendChild(numberAvailable);

    hideAdditionalContent.appendChild(border);
    hideAdditionalContent.appendChild(category);
    hideAdditionalContent.appendChild(offered);
    hideAdditionalContent.appendChild(provider);
    hideAdditionalContent.appendChild(courseLoad);
    hideAdditionalContent.appendChild(fieldOfStudy);
    hideAdditionalContent.appendChild(levelOfStudy);
    hideAdditionalContent.appendChild(description);

    group.appendChild(learnMoreButton);

    group.appendChild(hideAdditionalContent);

    scholarship.appendChild(group);

    scholarshipList.appendChild(mainGrid);
}


db.collection("Scholarship Database").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        render(doc)
        console.log(doc.id.replace(/\s/g, ''))
    });
});