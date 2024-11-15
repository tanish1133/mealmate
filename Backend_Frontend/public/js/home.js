

console.log("This is home page and data1 for the contact");
let conatctForm = document.getElementById("conatctForm");
let inputes = document.querySelectorAll('#conatctForm input');
let messageForMail = document.querySelectorAll('#conatctForm textarea');
let toastMessage = document.getElementById('toastMessage');

console.log(toastMessage);

let makeContact = document.getElementById('makeContact');


let makeTost = (message) => {
    toastMessage.innerHTML = `<div class="alert alert-primary alert-dismissible fade show" role="alert">
    <strong>${message}</strong> 
    <button type="button" class="btn-close" data1-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

    setTimeout(() => {
        toastMessage.innerHTML = ``;
    }, 5000);

}
console.log(inputes);
console.log(messageForMail);
var data11 = {};
inputes.forEach((element) => {
    element.addEventListener('change', (ele) => {
        console.log(ele.target.name);
        data11 = { ...data11, [ele.target.name]: ele.target.value };

        if (Object.keys(data11).length > 4) {
            makeContact.removeAttribute('disabled');
        }
    });
});


// messageForMail.addEventListener('change', () => {
//     console.log("Making changes");
// })



// console.log(data1);

makeContact.addEventListener('click', async (e) => {
    try {
        e.preventDefault();
        let res = await fetch('/contactMail', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data11),
        });

        let outdata1 = await res.json();
        console.log(outdata1);
        if (outdata1) {
            makeTost(outdata1.message);
        }



    } catch (err) {
        console.log(err);
    }

})

