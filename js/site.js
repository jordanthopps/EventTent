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

//This function will build a dropdown of distinct cities from the above array of objects, "events".
//Everytime the HTML page loads,  the dropdown rebuilds based on step four.
function buildDropDown() {

    //Step 1
    let eventDD = document.getElementById("eventDropDown"); //The unordered list within app.html contains the id = eventDropDown.
    //We are initializing the variable eventDD to what the user selects from the dropdown menu.

    //Step 2
    //clears out the dropdown menu after the user makes a selection.
    //For example, clicking "New York" returns "Make a Selection"
    eventDD.innerHTML = "";

    //Step 3 (11:09)
    //Get the city dropdown template we are writing to from app.html and initialize it to a variable.
    let ddTemplate = document.getElementById("cityDD-template");
    //In app.html, there's a city dropdown template created at the bottom of the file that contains a listed item with the id of cityDD-template.
    //We are pulling that city dropdown template into this JavaScript file and initializing it to the variable ddTemplate.

    //Step 4 (11:10)
    let currentEvents = JSON.parse(localStorage.getItem("eventData")) || events;; //should this say eventData-template?
    /*What this line of code says is: pull in the local storage with id "eventData 
    or just use the initial array of objects 'events' if no local storage is found.*/

    //Step 5
    //get unique values from the array
    let distinctEvents = [...new Set(currentEvents.map((event) => event.city))];
    //This loops over the entire currentEvents array and looking for unique values attached to events**.city.
    //Creates a new array of just cities without any repeat cities in it.

    //Step 6
    let ddItemNode = document.importNode(ddTemplate.content, true);
    //  ddItemNode is importing the city dropdown li template, which is assigned to the variable ddTemplate (Step 3), and making a copy of it.
    /* what does importNode method do? Instead of writing over a line of code in HTML (called "writing in place")
    importNode takes a copy of the HTML code that's passed to it and changes the copy. That copy is appended to the page.
    .content says go down a level inside the template tag and only make a copy of the nested tag. In this case, <li>...</li>*/
    //  ddItemNode = <li><a class="dropdown-item" onclick="getEvent(this)"></a></li>

    //Step 7
    let ddItem = ddItemNode.querySelector("a");
    //What a query selector does is look in the html it was passed and returns the first occurrence of an <a> tag in any document.
    //In this case, we passed an 'a' tag to the query selector.
    //So what ddItem does is pull <a class="dropdown-item" onclick="getEvent(this)"></a>
    //from ddItemNode in (step 6).

    ddItem.setAttribute("data-string", "All");
    //(Step 8) <a class="dropdown-item" data-string="All" onclick="getEvent(this)"></a>

    ddItem.textContent = "All";
    //This is giving us a selection so that ... (10:53)
    //(Step 9) <a class="dropdown-item" data-string="All" onclick="getEvent(this)">All</a>
    //This actually writes "All" to the dropdown menu because 'All' is not in the array of objects.

    eventDD.appendChild(ddItemNode);
    //this writes to the <ul></ul> tag in the app.html page because the id "eventDropDown" matches.
    /*Note: the reason why ddItemNode was appended back to eventDD is because ddItem is just a piece 
    of ddItemNode. The changes made to ddItem are carried over into ddItemNode. It's one big object.*/

    //Add the cities to the dropdown | Reminder, this entire function runs every time the page loads.
    for (let i = 0; i < distinctEvents.length; i++) {
        ddItemNode = document.importNode(ddTemplate.content, true) //Template imported
        ddItem = ddItemNode.querySelector("a"); //Pull in the a tag
        ddItem.setAttribute("data-string", distinctEvents[i]);
        ddItem.textContent = distinctEvents[i];
        eventDD.appendChild(ddItemNode);
    }

    //display stats for all events
    displayStats(currentEvents);
    //display data set
    displayData();
}

//display data for the current list of events (the table at the bottom of the live server)
function displayData() {
    let template = document.getElementById("eventData-template");
    /* Which is this:
    <template id="eventData-template">
        <tr>
            <td data-id="event"></td>
            <td data-id="city"></td>
            <td data-id="state"></td>
            <td data-id="attendance"></td>
            <td data-id="eventDate"></td>
        </tr> */
    let eventBody = document.getElementById("eventBody");
    /* Which is this:
    <tbody id="eventBody">
        <!-- Content Goes Here-->
    </tbody> */

    eventBody.innerHTML = ""; //clear eventBody because the whole table will be written to it again every time the loop runs.

    let currentEvents = JSON.parse(localStorage.getItem("eventData")) || events;

    for (let i = 0; i < currentEvents.length; i++) {
        let eventRow = document.importNode(template.content, true);
        //<tr><td>...</td></tr>
        let eventCols = eventRow.querySelectorAll("td");
        //<td>...</td> (all of them nested in the 'eventData-template)

        eventCols[0].textContent = currentEvents[i].event;
        eventCols[1].textContent = currentEvents[i].city;
        eventCols[2].textContent = currentEvents[i].state;
        eventCols[3].textContent = currentEvents[i].attendance;
        eventCols[4].textContent = new Date(
            currentEvents[i].date).toLocaleDateString(); //this dates string is different to accomodate geographic location.

        eventBody.appendChild(eventRow);
    }



}

//display stats for the filtered events
function displayStats(filteredEvents) {
    let total = 0;
    let average = 0;
    let most = 0;
    let least = -1;
    let currentAttendance = 0;

    for (let i = 0; i < filteredEvents.length; i++) {
        currentAttendance = filteredEvents[i].attendance;
        total += currentAttendance;

        if (most < currentAttendance) {
            most = currentAttendance;
        }

        if (least > currentAttendance || least < 0) {
            least = currentAttendance;
        }
    }

    //calculate average
    average = total / filteredEvents.length;

    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("most").innerHTML = most.toLocaleString();
    document.getElementById("average").innerHTML = average.toLocaleString(
        undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }
    );

    document.getElementById("least").innerHTML = least.toLocaleString();

}


//get the events for the selected city
function getEvent(ddElement) {
    let cityName = ddElement.getAttribute("data-string");
    let currentEvents = JSON.parse(localStorage.getItem("eventData")) || events;;
    let filteredEvents = currentEvents;

    document.getElementById("statsHeader").innerHTML = `Stats for ${cityName} Events`

    if (cityName != "All") {
        //Filter the array using filter array method
        filteredEvents = currentEvents.filter(function (item) {
            if (item.city == cityName) {
                return item;
            }
        })
    }
    displayStats(filteredEvents)
}

//Save event data to local storage
function saveData() {
    let currentEvents = JSON.parse(localStorage.getItem("eventData")) || events;
    let stateSelect = document.getElementById("addEventState");
    let eventDate = document.getElementById("addDate").value
    let eventDate2 = `${eventDate} 00:00`;
    let newEvent = {
        event: document.getElementById("addEventName").value,
        city: document.getElementById("addCity").value,
        state: stateSelect.options[stateSelect.selectedIndex].text,
        attendance: parseInt(document.getElementById("addAttendance").value, 10),
        date: new Date(eventDate2).toLocaleString()
    };

    currentEvents.push(newEvent);

    localStorage.setItem("eventData", JSON.stringify(currentEvents));

    buildDropDown();
    displayData();
}