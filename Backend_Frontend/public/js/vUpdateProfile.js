// console.log("Complete the profile and enjoy");
//values to be save to the database and to complete the profile
let veg_dish = document.getElementById('veg-dish');
let rice_count = document.getElementById('rice-count');
let wheat_roti_count = document.getElementById('wheat-roti-count');
let salad_count = document.getElementById('salad-count');
let thali_price = document.getElementById('thali-price');
let dilivery_system = document.getElementById('dilivery-system');
let start_time = document.getElementById('start-time');
let end_time = document.getElementById('end-time');
let mess_type = document.getElementById('mess-type');
let new_Member = document.getElementById('new-Member');
let total_member = document.getElementById('total-member');
let vname = document.getElementById('vname');
let vaddress = document.getElementById('vaddress');
let vphone = document.getElementById('vphone');
let vcity = document.getElementById('vcity');

let getInputs = document.querySelectorAll('.grid>.form-group>input');
let messageDiv = document.getElementById('message');

window.onload = async () => {
    let res = await fetch("/vSavedData", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    let userData = await res.json();

    // console.log(userData);

    let { messName, messaddress, messPhoneNumber, city } = userData;
    let { vegitableDish, wheatRoti, salad, ricePlate, messnumberOfCustomer, messacceptingNewCustomer, messType, dabbaSystem, priceOfThali } = userData.messthaliDetails[0];
    console.log(city);
    let { closeTime, openTime } = userData.messthaliDetails[0].messTime;
    vname.value = messName;
    vaddress.value = messaddress;
    vphone.value = messPhoneNumber;
    veg_dish.value = vegitableDish;
    rice_count.value = ricePlate;
    wheat_roti_count.value = wheatRoti;
    salad_count.value = salad;
    thali_price.value = priceOfThali;
    start_time.value = openTime;
    end_time.value = closeTime;
    total_member.value = messnumberOfCustomer;
    vcity.value = city;

    if (messType === "vag") {
        mess_type.value = 1;

    } else if (messType === "Non-veg") {
        mess_type.value = 2;
    } else {
        mess_type.value = 3;
    };
}







var makeToast = (mess) => {
    console.log("making chages");
    messageDiv.innerHTML += `<div class="alert alert-primary alert-dismissible fade show" role="alert">
    <strong>Holy user!</strong> ${mess}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

    setTimeout(() => {
        messageDiv.innerHTML = ``;
    }, 5000)
}

var data = {};

// console.log(getInputs);
getInputs.forEach((curr) => {
    curr.addEventListener('change', (e) => {
        btnSaveProfile.removeAttribute('disabled');
    });
});






let btnSaveProfile = document.getElementById('btnSaveProfile');

btnSaveProfile.addEventListener('click', async (e) => {
    e.preventDefault();

    // console.log(dilivery_system.value);
    //dilivery avilable
    let diliveryAvialbal = dilivery_system.value = "val1" ? "Available" : "Not Available";
    let new_Member = dilivery_system.value = "val1" ? "Available" : "Not Available";

    //mess type 
    var typeMess;
    if (mess_type.value == "1") {
        typeMess = "Veg";
    } else if (mess_type.value == "2") {
        typeMess = "Non-veg";
    } else {
        typeMess = "Veg/Non-Veg";
    }


    // let thali_price = thali_price.value;
    // console.log(mess_type.value);
    // console.log(diliveryAvialbal);
    // console.log(typeMess);
    // console.log(data);
    data = { ['messName']: vname.value, ['messaddress']: vaddress.value, ['messPhoneNumber']: vphone.value, ['vegitableDish']: veg_dish.value, ['ricePlate']: rice_count.value, ['wheatRoti']: wheat_roti_count.value, ['salad']: salad_count.value, ['priceOfThali']: thali_price.value, ['starttime']: start_time.value, ['endtime']: end_time.value, ['messnumberOfCustomer']: total_member.value, ['city']: vcity.value, ['dabbaSystem']: diliveryAvialbal, ['messType']: typeMess, ['messacceptingNewCustomer']: new_Member, ['priceOfThali']: thali_price.value };

    if (Object.keys(data).length == 0) {
        console.log("emptyData");
        makeToast("Make change something in following fields");
        return;
    }

    console.log("The data lastly:", data);

    let res = await fetch('/vsaveEditProfile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    let data1 = await res.json();
    console.log(data1);

    makeToast(data1.message);
});
