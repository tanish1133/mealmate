const feedback = document.querySelector('.feedback__slider');
const feedback_offset = 300;

let feedbackPopulationDiv = document.getElementById('feedbackPopulationDiv');
let feedbackMessage = document.getElementById('feedbackMessage');

var makeToast = (message) => {
    console.log("making chages");
    feedbackMessage.innerHTML += `<div class="alert alert-primary alert-dismissible fade show" role="alert">
    <strong>Holy user!</strong> ${message}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>`
}

let populatingTheFeedback = async () => {
    let res = await fetch('/vFeedbackList', {
        method: 'GET'
    });

    let data = await res.json();
    if (res.status == 400) {
        return makeToast(data.message);
    }
    console.log(data.user);
    let feedbackList = data.user;

    feedbackList.forEach(element => {
        let { name, feedback } = element;
        feedbackPopulationDiv.innerHTML += `<div class="feedback__item swiper-slide">
        <img src="/img/blankPng.png" alt="Photo" class="feedback__image">
        <h5 class="feedback__name">${name}</h5>
        <p class="feedback__text">${feedback}</p>
    </div>`
    });


};

populatingTheFeedback();

setTimeout(() => {
    function feedbackUpdateHeight(height) {
        // if (!height) return false;
        feedback.style.height = `${height + feedback_offset}px`;
    }

    if (feedback) {
        feedbackUpdateHeight(feedback.querySelector('.feedback__item').offsetHeight);

        const feedback_slider = new Swiper(feedback, {
            direction: 'vertical',
            slidesPerView: 'auto',
            autoHeight: true,
            centeredSlides: true,
            spaceBetween: 30,
            grabCursor: true,
            loop: true,
            mousewheel: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        feedback_slider.on('slideChange', () => {
            setTimeout(() => {
                feedbackUpdateHeight(feedback_slider.slides[feedback_slider.activeIndex].offsetHeight);
            }, 300);
        });
    }
}, 0)


