let events = [{
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 240000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 250000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "New York",
        state: "New York",
        attendance: 257000,
        date: "06/01/2019"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 130000,
        date: "06/01/2017"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 140000,
        date: "06/01/2018"
    },
    {
        event: "ComicCon",
        city: "San Diego",
        state: "California",
        attendance: 150000,
        date: "06/01/2019"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 40000,
        date: "06/01/2017"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 45000,
        date: "06/01/2018"
    },
    {
        event: "HeroesCon",
        city: "Charlotte",
        state: "North Carolina",
        attendance: 50000,
        date: "06/01/2019"
    }
]


//Will build a dropdown of distinct cities
function buildDropDown() {

    //Step 1
    let eventDD = document.getElementById("eventDropDown"); //The unordered list within app.html contains the id = eventDropDown.
    //We are initializing the variable eventDD to what the user selects from the dropdown menu.

    //Step 2
    //clears out the dropdown menu after the user makes a selection.
    eventDD.innerHTML = "";

    //Step 3
    //Get the template from HTML and initialize it to a variable.
    let ddTemplate = document.getElementById("cityDD-template");
    //In app.html, there's a template created at the bottom of the file that contains a listed item with the id of cityDD-template.
    //We are pulling that template into this js file and initializing it to the variable ddTemplate.

    //Step 4
    let currentEvents = events;
    //The object 'events' is assigned to currentEvents

    //Step 5
    //get unique values from the array
    let distinctEvents = [...new Set(currentEvents.map((event) => event.city))];

    //Step 6
    let ddItemNode = document.importNode(ddTemplate.content, true);
    //  ddItemNode is importing the listed item template assigned to the variable ddTemplate (Step 3)
    //  ddItemNode = <li><a class="dropdown-item" data-string="All" onclick="getEvent(this)">All</a></li>
    //  what does importNode method do?

    //Step 7
    let ddItem = ddItemNode.querySelector("a");
    //What a query selector does is look in the html and return all the matches that meet the criteria passed to it. 
    //In this case, we passed an 'a' tag to the query selector.
    //So what ddItem does is pull <a class="dropdown-item" data-string="All" onclick="getEvent(this)">All</a>
    //from ddItemNode in (step 6).

    ddItem.setAttribute("data-string", "All");
    //(Step 8) <a class="dropdown-item" data-string="All" onclick="getEvent(this)"></a>

    ddItem.textContent = "All";
    //(Step 9) <a class="dropdown-item" data-string="All" onclick="getEvent(this)">All</a>
    //Reminder: the goal is to write to the event dropdown

    eventDD.appendChild(ddItemNode);
    //this writes to the ul tag in the app.html page because the id matches.
}