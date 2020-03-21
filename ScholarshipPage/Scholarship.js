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

{
    /* <div class="col-sm">
            <div class="jumbotron">
                <div class="container">
            <div class="row">
            2 of 2
        </div>
        <div class="row">
            3 of 3
        </div>
    </div>
                <h1 class="display-4">Hello, world!</h1>
                <p class="lead">asdasd</p>
                <hr class="my-4">
                <p> asdasdasdasd</p>
                <p class="lead">
                    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                </p>
            </div> 
        </div>
     */
}

{
    /* 
            <p>
                <a class="btn btn-primary" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1">Toggle first element</a>
            </p>
            <div id="multiCollapseExample1">
                Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
            </div>
        */
}


{
    /* <div class="panel-heading"><a href="url">National Geophysics Scholarship</a></div>
                <b><div class="scholarshipInfo">$1,000</div></b>
                <div class="scholarshipInfo">Duration: Year</div>
                <div class="scholarshipInfo">Field of Study: Nation-wide</div>
                <div class="scholarshipInfo">Number available: 1</div> */
}

{
    /* <div class="container">
      <div class="row">
        <div class="col">
          2 of 2
        </div>
      </div>
      <div class="row">
        <div class="col">
          3 of 3
        </div>
      </div>
    </div> */
}

function render(doc) {
    let mainGrid = document.createElement('div')
    mainGrid.classList.add("col-xl-4");
    // mainGrid.classList.add("mb-4");

    let scholarship = document.createElement('div');
    scholarship.classList.add("jumbotron");

    let name = document.createElement('h5');
    // name.classList.add("panel-heading")
    let value = document.createElement('p');
    let deadline = document.createElement('p');
    let description = document.createElement('p');

    let hideAdditionalContent = document.createElement('div');
    let category = document.createElement('p');
    let offered = document.createElement('p');
    let provider = document.createElement('p');
    let courseLoad = document.createElement('p');
    let fieldOfStudy = document.createElement('p');
    let levelOfStudy = document.createElement('p');
    let numberAvailable = document.createElement('p');

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
    learnMoreButton.classList.add("btn-lg");
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

    mainGrid.appendChild(scholarship)

    scholarship.appendChild(name);
    scholarship.appendChild(value);
    scholarship.appendChild(deadline);
    scholarship.appendChild(numberAvailable);

    hideAdditionalContent.appendChild(border);
    hideAdditionalContent.appendChild(category);
    hideAdditionalContent.appendChild(offered);
    hideAdditionalContent.appendChild(provider);
    hideAdditionalContent.appendChild(courseLoad);
    hideAdditionalContent.appendChild(fieldOfStudy);
    hideAdditionalContent.appendChild(levelOfStudy);
    hideAdditionalContent.appendChild(description);

    scholarship.appendChild(learnMoreButton);

    scholarship.appendChild(hideAdditionalContent)

    scholarshipList.appendChild(mainGrid);
}


db.collection("Scholarship Database").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        render(doc)
        console.log(doc.id.replace(/\s/g, ''))
    });
});