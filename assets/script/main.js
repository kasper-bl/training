const triggers = document.querySelectorAll('.how-we-work__scroll p');
const slides = document.querySelectorAll('.how-we-work__slide');

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
