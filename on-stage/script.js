const pastSpeakersCardsDiv2 = document.querySelector("#pastSpeakersCardsDiv2");
const cardsFadeIn2 = new IntersectionObserver(entries => {
    const cardsDiv = entries[0];
    if (!cardsDiv.isIntersecting) return;
    cardsDiv.target.querySelectorAll(".cardToFadeIn").forEach((card, i) => {
        setTimeout(() => {
            card.classList.remove("hidden");
        }, 200 * i);
    });
    
    cardsFadeIn2.unobserve(cardsDiv.target);
}, { threshold: 0.1 });

if (pastSpeakersCardsDiv2) {
    cardsFadeIn2.observe(pastSpeakersCardsDiv2);
}

const pastSpeakersCardsDiv = document.querySelector("#pastSpeakersCardsDiv");
const cardsFadeIn = new IntersectionObserver(entries => {
    const cardsDiv = entries[0];
    if (!cardsDiv.isIntersecting) {
        return;
    }
    cardsDiv.target.querySelectorAll(".cardToFadeIn").forEach((card, i) => {
        setTimeout(() => {
            card.classList.remove("hidden");
        }, 200 * i);
    });
    cardsFadeIn.unobserve(cardsDiv.target);
}, { threshold: 0.1 });

cardsFadeIn.observe(document.querySelector("#pastSpeakersCardsDiv"));

document.addEventListener("DOMContentLoaded", () => {
    const faders = document.querySelectorAll(".fade-in");
    
    const appearOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    }, appearOptions);
    
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

document.querySelectorAll('.shadow-lg').forEach(el => {
    el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.02)';
    });
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
    });
});

navExpandButton.onclick = () => {
    navLinks.classList.toggle("visible");
    navExpandButton.classList.toggle("clicked");
};

window.addEventListener("scroll", scrollAction);
window.addEventListener("resize", scrollAction);

scrollAction();