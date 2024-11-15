console.log("This is just to populating to");
let listOfTheDMessList = document.getElementById('listOfTheDMessList');

let populatingTheList = async () => {
    let res = await fetch('/dgetTheListOfRequestToMesses', {
        method: 'GET',
    });
    let data = await res.json();

    if (data.user.userlistOfRequestToMess[0]) {

        console.log(data.user.userlistOfRequestToMess);
        data.user.userlistOfRequestToMess.forEach(element => {

            let { messName, messPhoneNumber, messemail, timestamp } = element;

            // console.log(messName, messPhoneNumber, messemail, timestamp);
            // console.log(typeof (timestamp));
            // console.log(new Date(timestamp).getDate());
            const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN",
                "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
            ];
            let d = new Date(timestamp);
            let date = d.getDate();
            let month = monthNames[d.getMonth()];




            listOfTheDMessList.innerHTML += `<div class="card-container">
        <div class="photo-container">
            <div class="date">
                <div class="day">${date}</div>
                <div class="month">${month}</div>
            </div>
            <div class="image"></div>
        </div>
        <div class="info-container">
            <div class="event-name">
                ${messName}
            </div>
            <div class="event-location">
                ${messemail}
            </div>
            <div class="event-location">
                ${messPhoneNumber}
            </div>
        </div>
    </div>`
        });

    } else {
        listOfTheDMessList.innerHTML = `<h3>You not yet send any request</h3>`
    }

};
populatingTheList();