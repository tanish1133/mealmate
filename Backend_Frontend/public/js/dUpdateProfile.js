// console.log("Complete the profile and enjoy");
//values to be save to the database and to complete the profile

let dname = document.getElementById('dname');
let daddress = document.getElementById('daddress');
let dphone = document.getElementById('dphone');

let btnSaveProfile = document.getElementById('btnSaveProfile');

let getInputs = document.querySelectorAll('.grid>.form-group>input');
let messageDiv = document.getElementById('message');

window.onload = async () => {
    let res = await fetch("/dSavedData", {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include",
    });
    let userData = await res.json();

    // console.log(userData);
    // console.log(userData);

    let { username, useraddress, userphoneNumbe } = userData;

    dname.value = username;
    daddress.value = useraddress;
    dphone.value = userphoneNumbe;
};







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








btnSaveProfile.addEventListener('click', async (e) => {
    e.preventDefault();

    // console.log(dilivery_system.value);
    //dilivery avilable






    data = { ['username']: dname.value, ['useraddress']: daddress.value, ['userphoneNumbe']: dphone.value, };

    if (Object.keys(data).length == 0) {
        console.log("emptyData");
        makeToast("Make change something in following fields");
        return;
    }

    console.log("The data lastly:", data);

    let res = await fetch('/dsaveEditProfile', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    let data1 = await res.json();
    // console.log(data1);

    makeToast(data1.message);
});
