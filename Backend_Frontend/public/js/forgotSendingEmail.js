console.log("Kaam 25");
//getin the form and making the post request  as post request to the forgot end with url which is url parameter as funtion

let sendRequest = document.getElementById('register-form');
let email = document.getElementById('emailadd');
let message = document.getElementById('getMess');


sendRequest.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (email.value != "") {
        let url = `/sendFrogotPass`;
        let data = {
            email: email.value,
        }

        let reqBody = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify(data),

        }


        let response = await fetch(url, reqBody);
        let resData = await response.json();
        console.log(resData);
        if (resData.Success == true) {
            message.innerHTML = `<div class="alert alert-warning alert-dismissible" role="alert">

            <strong>Hola User!</strong> ${resData.Message}
            
        </div>
        `;
        } else {
            message.innerHTML = `<div class="alert alert-info alert-dismissible" role="alert">
            <strong>Hola User!</strong> ${resData.Message}
        </div>
        `;
        };

        setTimeout(() => {
            message.innerHTML = "";
        }, 10000);

    }


});

