const triggers = document.querySelectorAll('.how-we-work__scroll p');
const slides = document.querySelectorAll('.how-we-work__slide');
const images = document.querySelectorAll('.img_emoji img');

triggers.forEach(trigger => {
trigger.addEventListener('click', () => {
        const index = parseInt(trigger.dataset.slide);

        triggers.forEach(t => t.classList.remove('acting'));
        slides.forEach(s => s.classList.remove('acting'));

        if (slides[index]) {
            slides[index].classList.add('acting');
            trigger.classList.add('acting');
        }
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