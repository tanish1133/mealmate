console.log("You have to know what somthing which is other dont't know");
let changedPassword = document.getElementById('changedPassword');
let changedConfirmPassword = document.getElementById('changedConfirmPassword');
let changePasswordForm = document.getElementById('changePasswordForm');
let message = document.getElementById("message");
let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let input3 = document.getElementById("input3");
let input4 = document.getElementById("input4");
//To get the current href for the to get the id from the href and to make post request to the backend 
let href = window.location.href;
//after slice getting ID
let token = href.slice(href.indexOf("=") + 1);
console.log(changedPassword);
changePasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Password:" + changedPassword.value);
    if (changedPassword.value == changedConfirmPassword.value) {
        // we will make post request to the new end for the forgot password which is changed
        let url = '/passChanged'
        let data = {
            token: token,
            password: changedPassword.value,
        };
        let reqBody = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };
        let response = await fetch(url, reqBody);
        let resdata = await response.json();
        if (resdata.Success == true) {
            message.innerHTML = `<div class="alert alert-primary alert-dismissible fade show" role="alert">
        <strong>Holy enjoyer!</strong> ${resdata.Message}
        <a class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </a>
    </div>`
            input1.style.display = "none";
            input2.style.display = "none";
            input3.style.display = "none";
            input4.style.display = "block";

        } else {
            //checking that the the token expried or not if the token is false then user regenrate the link for forgot password
            if (resdata.token == false) {
                message.innerHTML = `<div class="alert alert-danger  alert-dismissible fade show" role="alert">
            <strong>Holy enjoyer!</strong> ${resdata.Message}
            <a class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </a>
        </div>`
                input1.style.display = "none";
                input2.style.display = "none";
                input3.style.display = "none";
                input4.style.display = "block";

            }
            message.innerHTML = `<div class="alert alert-danger  alert-dismissible fade show" role="alert">
            <strong>Holy enjoyer!</strong> ${resdata.Message}
            <a class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </a>
        </div>`
        }


    } else {
        message.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Holy enjoyer!</strong> Please re-enter password correctly and confirm !
        <a class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </a>
    </div>`
    }

    setTimeout(() => {
        message.innerHTML = ``;
    }, 10000);

    changePasswordForm.reset();
});
setTimeout(() => {
    message.innerHTML = ``;
}, 10000);
