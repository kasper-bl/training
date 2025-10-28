const triggers = document.querySelectorAll('.how-we-work__scroll p');
const slides = document.querySelectorAll('.how-we-work__slide');
const images = document.querySelectorAll('.img_emoji img');
const reviewsContainer = document.querySelector('.reviews__inner'); 
const cards = document.querySelectorAll('.reviews__card');
const reviewsBtn = document.querySelector('.reviews__button');
const input = document.querySelectorAll('input');
const img = document.querySelector('#feedbacImg');

triggers.forEach(trigger => {
trigger.addEventListener('click', () => {
        const index = parseInt(trigger.dataset.slide);

        triggers.forEach(t => t.classList.remove('active'));
        slides.forEach(s => s.classList.remove('acting'));

        slides[index].classList.add('acting');
        trigger.classList.add('active');
    });
});


images.forEach(img => {
    const origSrc = img.src;
    const hoverGif = origSrc
        .replace('/png/emoji/', '/gif/')
        .replace(/\.png$/, '-hover.gif');

    img.addEventListener('mouseover', () => {
        img.src = hoverGif;
    });

    img.addEventListener('mouseout', () => {
        img.src = origSrc;
    });
});


const cardsArray = [...cards];
    
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

    for (let i = 0; i < cards.length; i++) { 
        const nextIndex = (i + 1) % 4; 
        cards[i].style.top = positions[nextIndex].top;
        cards[i].style.left = positions[nextIndex].left;
        cards[i].style.right = positions[nextIndex].right;
        cards[i].style.bottom = positions[nextIndex].bottom;
        cards[i].style.zIndex = positions[nextIndex].zIndex;
    }
    positions = currentPositions();
});

reviewsBtn.addEventListener('click', () => { 
    reviewsContainer.classList.replace("reviews__inner", "structured");
    reviewsBtn.remove();
    const p = document.createElement('p');
    p.textContent = "Котики структурированы";
    p.classList.add('reviews_p')
    reviewsContainer.appendChild(p);

})


input.forEach(input => { 
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
    img.src = imageSources[imgIndex]; 
    imgIndex = (imgIndex + 1) % 3; 
}

const intervalTimeInMs = 4000;

const intervalId = setInterval(changeImage, intervalTimeInMs);