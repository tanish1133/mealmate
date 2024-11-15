
let toastMessage = document.getElementById("message");
let messListPopulation = document.getElementById("messListPopulation");
let BasedOnLocatio = document.getElementById('BasedOnLocatio');
let clearFilter = document.getElementById('clearFilter');
let makeToast = (message) => {
    toastMessage.innerHTML = `<div class="alert alert-primary alert-dismissible fade show" role="alert">
    <strong>${message}</strong> 
    <button type="button" class="btn-close" data1-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

    setTimeout(() => {
        toastMessage.innerHTML = ``;
    }, 5000);
};

let populateDataToDiv = (data) => {
    messListPopulation.innerHTML = ``;
    data.forEach(element => {

        let { messName, messaddress, messEmail } = element;
        let { priceOfThali } = element.messthaliDetails[0];
        let { numberLike, numberDislike } = element.messlikeDislike;

        // console.log(messName, messaddress, priceOfThali);

        // console.log(element);
        messListPopulation.innerHTML += `
        <a style="color:black; text-decoration: none;" href="/detailOfMess?eid=${messEmail}">
        <div class="col">
        <div class="card box">
            <img src="https://thumbs.dreamstime.com/b/indian-thali-masala-bhandi-dal-alu-39486294.jpg" class="card-img-top"
                alt="Hollywood Sign on The Hill" />
            <div class="card-body">
                <div class="d-flex">
                    <h5 class="card-title p-2" style="width: 100%;text-align: start;">${messName}</h5>
                    
                </div>

                <div class="d-flex mt-3">
                    <p class="card-title " style="width: 50%;">${messaddress}</p>
                    <div class="d-flex aline-item-center justify-content-centerv ms-auto p=0">
                        <p class="card-title " style="width: 100%;">&#8377; ${priceOfThali} for one </p>
                    </div>
                </div>

            </div>
        </div>
        </div>
        </a>
        `
    });
}

var mainData;



let getMessList = async () => {
    let response = await fetch('/getMessList');

    var data = await response.json();
    // console.log(data);
    mainData = data;
    console.log(response.status);

    if (response.status === 200) {
        populateDataToDiv(data);
    } else {
        makeToast(data.message);
    }





}


getMessList();

let success = async (postion) => {
    console.log(postion);

    let { longitude, latitude } = postion.coords;

    console.log(longitude, latitude);
    let res = await fetch(`https://us1.locationiq.com/v1/reverse?key=pk.58e853c0649e91d7c8c9207067146358&lat=${latitude}&lon=${longitude}&format=json`)
    let data = await res.json();
    console.log(data);
    let { county } = data.address;

    console.log(mainData);
    console.log(county);
    let filterLocationData = mainData.filter((element) => {
        let { city } = element;
        console.log(city);
        if (city == county) {
            return element;
        }
    });
    populateDataToDiv(filterLocationData);
    makeToast(`The list is filtered based on your location ${county}`);
    console.log(filterLocationData);



}
let err = () => {
    makeToast("We are unable to determine your location to find nearby dining");
}

BasedOnLocatio.addEventListener('click', () => {
    console.log("Clicking by the location");
    navigator.geolocation.getCurrentPosition(success, err);
});

clearFilter.addEventListener('click', () => {
    populateDataToDiv(mainData);
    // getMessList(mainData);
    console.log(mainData);
})




