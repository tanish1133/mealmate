console.log("Complete the profile and enjoy");
//values to be save to the database and to complete the profile
// let veg_dish = document.getElementById('veg-dish');
// let rice_count = document.getElementById('rice-count');
// let wheat_roti_count = document.getElementById('wheat-roti-count');
// let salad_count = document.getElementById('salad-count');
let thali_price = document.getElementById('thali-price');
let dilivery_system = document.getElementById('dilivery-system');
// let start_time = document.getElementById('start-time');
// let end_time = document.getElementById('end-time');
let mess_type = document.getElementById('mess-type');
let new_Member = document.getElementById('new-Member');
// let total_member = document.getElementById('total-member');
let getInputs = document.querySelectorAll('.grid>.form-group>input');
let messageDiv = document.getElementById('message');

var makeToast = (mess) => {
    console.log("making chages");
    messageDiv.innerHTML += `<div class="alert alert-primary alert-dismissible fade show" role="alert">
    <strong>Holy user!</strong> ${mess}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`
}

var data = {};
console.log(getInputs);
getInputs.forEach((curr) => {
    curr.addEventListener('change', (e) => {
        let name = e.target.name;
        let value = e.target.value;
        data = { ...data, [name]: value };
    });
});





let btnSaveProfile = document.getElementById('btnSaveProfile');

btnSaveProfile.addEventListener('click', async (e) => {
    e.preventDefault();
    // console.log("click");
    //adding the change event
    if (Object.keys(data).length == 0) {
        console.log("emptyData");
        makeToast("Enter something in following fields");
        return;
    }
    console.log(dilivery_system.value);
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
    console.log(mess_type.value);
    console.log(data);
    console.log(diliveryAvialbal);
    console.log(typeMess);
    data = { ...data, ['dabbaSystem']: diliveryAvialbal, ['messType']: typeMess, ['messacceptingNewCustomer']: new_Member, ['priceOfThali']: thali_price.value };

    console.log(data);

    let res = await fetch('/completeProfile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    let data1 = await res.json();
    console.log(data1);
    if (res.status === 200) {
        document.location.href = '/vlogin';
    }
    else {
        makeToast(data1.message);
    }
});
