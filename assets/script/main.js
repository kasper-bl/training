const triggers = document.querySelectorAll('.how-we-work__scroll p');
const howWeWorkSlides = document.querySelectorAll('.how-we-work__slide');
const emojiImages = document.querySelectorAll('.img_emoji img');
const reviewsContainer = document.querySelector('.reviews__inner'); 
const reviewCards = document.querySelectorAll('.reviews__card');
const structureReviewsBtn = document.querySelector('.reviews__button');
const formInputs = document.querySelectorAll('input');
const feedbackImage = document.querySelector('#feedbacImg');
const languageRu = document.querySelector('.controls__languages--active');
const languageEn = document.querySelector('.languages__item');

const burger = document.querySelector('.burger-menu__icon');
const menu = document.querySelector('.burger-menu__menu');
const CloseMenu = document.querySelector('.burger-menu--close')

burger.addEventListener('click', () => {
  menu.classList.toggle('Open');
  document.body.classList.toggle('no-scroll');
});

CloseMenu.addEventListener('click', () => { 
    menu.classList.toggle('Open');
    document.body.classList.toggle('no-scroll');
})


languageRu.addEventListener('click', () => {
    languageEn.classList.remove('controls__languages--active');
    languageRu.classList.add('controls__languages--active');
});

languageEn.addEventListener('click', () => {
    languageRu.classList.remove('controls__languages--active');
    languageEn.classList.add('controls__languages--active');
});


triggers.forEach(trigger => {
trigger.addEventListener('click', () => {
        const index = parseInt(trigger.dataset.slide);

        triggers.forEach(t => t.classList.remove('active'));
        howWeWorkSlides.forEach(s => s.classList.remove('acting'));

        howWeWorkSlides[index].classList.add('acting');
        trigger.classList.add('active');
    });
});


emojiImages.forEach(img => {
    const origSrc = img.src;
    const gifSrc = origSrc
        .replace('/emoji/', '/gif/')
        .replace(/\.png$/, '-hover.gif');

    img.addEventListener('mouseover', () => {
        img.src = gifSrc;
    });

    img.addEventListener('mouseout', () => {
        img.src = origSrc;
    });
});


const cardsArray = [...reviewCards];
    
function currentPositions() {
    return cardsArray.map(card => { 
        const styleCSS = window.getComputedStyle(card);
        return {
            top: styleCSS.top, 
            left: styleCSS.left,
            right: styleCSS.right,
            bottom: styleCSS.bottom,
            zIndex: styleCSS.zIndex
        };
    });
}   

let positions = currentPositions();
    
reviewsContainer.addEventListener('click', (e) => { 
    if (!e.target.closest('.reviews__card')) return; 

    for (let i = 0; i < reviewCards.length; i++) { 
        const nextIndex = (i + 1) % 4; 
        reviewCards[i].style.top = positions[nextIndex].top;
        reviewCards[i].style.left = positions[nextIndex].left;
        reviewCards[i].style.right = positions[nextIndex].right;
        reviewCards[i].style.bottom = positions[nextIndex].bottom;
        reviewCards[i].style.zIndex = positions[nextIndex].zIndex;
    }
    positions = currentPositions();
});

structureReviewsBtn.addEventListener('click', () => { 
    reviewsContainer.classList.replace("reviews__inner", "structured");
    structureReviewsBtn.remove();
    const p = document.createElement('p');
    p.textContent = "Котики структурированы";
    p.classList.add('reviews_p')
    reviewsContainer.appendChild(p);

})


formInputs.forEach(input => { 
    input.addEventListener('mouseenter', function () {
        input.classList.add('hovering');
    });

    input.addEventListener('mouseleave', function() {
        input.classList.remove('hovering');
    });
})


const imageSources = [
    'assets/img/feedback-photo/feedback.png',
    'assets/img/feedback-photo/2variant.png',
    'assets/img/feedback-photo/3variant.png'

];

let imgIndex = 0;
function changeImage() {
    feedbackImage.src = imageSources[imgIndex]; 
    imgIndex = (imgIndex + 1) % 3; 
}

const intervalTimeInMs = 4000;

const intervalId = setInterval(changeImage, intervalTimeInMs);

