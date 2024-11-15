console.log("Showing the request from dinore");
let toastMessage = document.getElementById("message");
let populatingAread = document.getElementById('populatingAread');
let makeToast = (message) => {
    toastMessage.innerHTML += `<div class="alert alert-primary alert-dismissible fade show close1" role="alert">
    <strong>${message}</strong> 
    <button type="button" class="btn-close" data1-bs-dismiss="close1" aria-label="Close"></button>
</div>`;

    setTimeout(() => {
        toastMessage.innerHTML = ``;
    }, 6000);
};
let populatingList = async () => {
    let res = await fetch('/vGetDinorList', {
        method: 'GET'
    });
    let data = await res.json();
    console.log(data);
    if (data.user.length>0) {
        let { user } = data
        // console.log(data);
        user.forEach(element => {
            console.log(element);
            let { name, address, phoneNumber, email } = element;
            populatingAread.innerHTML += `<div class="friend-request">
            <img src="/img/blankPng.png" alt="Friend 1" class="img">
            <div class="friend-info">
                <h3>${name.toUpperCase()}</h3>
                <p>Address: ${address}</p>
                <p>Mobile: ${phoneNumber}</p>
                <p>Email: ${email}</p>
            </div>
        </div>`
        })
    } else {
        populatingAread.innerHTML += `<div class="friend-request">
            <img src="/img/blankPng.png" alt="Friend 1" class="img">
            <div class="friend-info">
                <h3>We haven't received any user requests yets</h3>
                
            </div>
        </div>`
    }

};

populatingList();