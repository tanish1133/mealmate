console.log("This is the detail for the message");
let toastMessage = document.getElementById("message");
let messMainDetail = document.getElementById("messMainDetail");
let completeDetailAboutMess = document.getElementById("completeDetailAboutMess");
let btnSaveProfile = document.getElementById("btnSaveProfile");

let feedbackBtn = document.getElementById('feedbackBtn');
let feedbackMessage = document.getElementById('feedbackMessage');
let messageFromFeed = document.getElementById('messageFromFeed');
let myFeedbackForm = document.getElementById('myFeedbackForm');

let feedbackDiv = document.getElementById('feedbackDiv');

let makeToast = (message) => {
    toastMessage.innerHTML += `<div class="alert alert-primary alert-dismissible fade show close1" role="alert">
    <strong>${message}</strong> 
    <button type="button" class="btn-close" data1-bs-dismiss="close1" aria-label="Close"></button>
</div>`;

    setTimeout(() => {
        toastMessage.innerHTML = ``;
    }, 6000);
};
let makeToastFeedback = (message) => {
    messageFromFeed.innerHTML = `<div class="alert alert-primary alert-dismissible fade show" role="alert">
    <strong>${message}</strong> 
    <button type="button" class="btn-close" data1-bs-dismiss="alert" aria-label="Close"></button>
</div>`
    setTimeout(() => {
        messageFromFeed.innerHTML = ``;
    }, 6000);
}
// let increaseLike = async (numberLike) => {
//     console.log("Adding the like");
//     let url = window.location.href;
//     let email = url.slice(url.indexOf("=") + 1);
//     let body = { numberLike: numberLike, email: email }
//     let res = await fetch('/dAddLike', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body),
//     });
//     let data = await res.json();

//     console.log(data);
// }

let getTheDetail = async () => {
    let url = window.location.href;
    let email = url.slice(url.indexOf("=") + 1);
    let body = {
        email: email
    }
    console.log(email);
    let res = await fetch('/dmessDetailGetData', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),

    });

    let data = await res.json();

    console.log(data);
    let { messName, messaddress, userLargeFeedback } = data[0];
    let { numberLike, numberDislike } = data[0].messlikeDislike;
    let { priceOfThali, vegitableDish, ricePlate, wheatRoti, salad, dabbaSystem, messType, messacceptingNewCustomer, messnumberOfCustomer } = data[0].messthaliDetails[0];
    let { openTime, closeTime } = data[0].messthaliDetails[0].messTime;
    if (res.status == 200) {
        messMainDetail.innerHTML = `<div class="d-flex">
        <h2 class="card-title " style="width: 100%;">${messName.toUpperCase()}</h2>
        
    </div>



    <div class="d-flex mt-4">
        <p class="card-title " style="width: 50%;">${messaddress}</p>
        <div class="d-flex aline-item-center justify-content-centerv ms-auto p=0">
            <p class="card-title " style="width: 100%;">&#8377; ${priceOfThali} for one </p>
        </div>
    </div>`;
        completeDetailAboutMess.innerHTML = `<div class="grid">
        <div class="form-group">
            <label for="veg-dish">Number of Vegetable Dish</label>
            <input disabled type="text" id="veg-dish" value=${vegitableDish} disable>
        </div>
        <div class="form-group">
            <label for="rice-count">Number of Rice Plate</label>
            <input type="text" id="rice-count" value=${ricePlate} disabled>
        </div>

        <div class="form-group">
            <label for="wheat-roti-count">Number of Wheat Roti</label>
            <input type="text" id="wheat-roti-count" value=${wheatRoti} disabled>
        </div>

        <div class="form-group">
            <label for="salad-count">Number of Salad</label>
            <input type="text" id="salad-count" value=${salad} disabled>
        </div>
        <div class="form-group">
            <label for="veg-dish">Dabba Delivery Available </label>
            <input type="text" id="wheat-roti-count" value=${dabbaSystem} disabled>
        </div>


    </div>
    <div class="grid">

        <div class="form-group">
            <label for="start-time">Mess Timing - Start Time:</label>
            <input type="text" id="wheat-roti-count" value=${openTime} disabled>
        </div>
        <div class="form-group">
            <label for="end-time">Mess Timing - End Time:</label>
            <input type="text" id="wheat-roti-count" value=${closeTime} disabled>

        </div>
        <div class="form-group">
            <label for="veg-dish">Mess Type</label>
            <input type="text" id="wheat-roti-count" value=${messType} disabled>
        </div>
        <div class="form-group">
            <label for="accept-new-members">Accept New Members</label>

            <input type="text" id="wheat-roti-count" value=${messacceptingNewCustomer == "Available" ? "Accepting" : "Not Accepting"} disabled>


        </div>

        <div class="form-group">
            <label for="total-member">Mess Total Customer</label>
            <input type="text" id="wheat-roti-count" value=${messnumberOfCustomer} disabled>
        </div>
    </div>
    `
        console.log(userLargeFeedback);
        if (userLargeFeedback.length > 0) {
            feedbackDiv.innerHTML = ``;
            userLargeFeedback.forEach(element => {
                let { name, feedback } = element;
                feedbackDiv.innerHTML += `<div class="col">
                <div class="card">
                    <div class="card-body p-4">
                        <h5 class="card-title">${name}</h5>
                        <p class="card-text">
                            ${feedback}
                        </p>
                    </div>
                </div>
            </div>`
            })
        }

    } else {
        makeToast(data.message);
    }

};
getTheDetail();

btnSaveProfile.addEventListener('click', async (e) => {
    e.preventDefault();

    console.log("Request is making ");
    let url = window.location.href;
    //email for where the changes to be make and add the detail of the user to the request
    let email = url.slice(url.indexOf("=") + 1);
    let body = { email: email };
    let res = await fetch('/dAddRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    let data = await res.json();
    if (res.status == 200) {
        let res2 = await fetch('/dRequestToTheMess', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        let data2 = await res2.json();
        console.log(data2);
        makeToast(data2.message);

    }
    makeToast(data.message);
    e.target.setAttribute("disabled", "");


});


feedbackBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    console.log("Feedback is going to backend");
    console.log(feedbackMessage.value);
    let url = window.location.href;
    let email = url.slice(url.indexOf("=") + 1);
    let body = {
        email: email,
        feedbackMessage: feedbackMessage.value,
    }

    let res = await fetch('/dAddFeedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    let data = await res.json();

    makeToastFeedback(data.message);
    myFeedbackForm.reset();

});



