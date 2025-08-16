const scrollDownMessage = document.querySelector("#scroll-down-message");

scrollDownMessage.onclick = () => {
    const aboutSection = document.querySelector("#about-innowave");
    aboutSection.scrollIntoView({
        behavior: "smooth"
    });
};

const navExpandButton = document.querySelector("#navExpandButton");
const navLinks = document.querySelector("#navLinks");

navExpandButton.onclick = () => {
    navLinks.classList.toggle("visible");
    navExpandButton.classList.toggle("clicked");
};

const logo = document.querySelector("#logo");
const navbar = document.querySelector("#navbar")
const logoSectionTexts = document.querySelector("#logo-section-texts");
const pastSpeakersCardsDiv = document.querySelector("#pastSpeakersCardsDiv");

const navbarHeight = navbar.getBoundingClientRect().height;
const logoWidthByHeight = 2224 / 279;
const navLinksWidth = 594.9666748046875;

const logoTargetWidth = 47 * logoWidthByHeight;
const logoTargetY = 8.25;

const logoSectionRefresh = () => {
    const scrollThreshold = window.innerHeight - navbarHeight;
    const progress = window.scrollY / scrollThreshold;

    const windowWidthHalf = window.innerWidth / 2;
    const logoOrigWidth = Math.min(960, window.innerWidth - 20);

    logo.style.setProperty("--XTranslation", `${(windowWidthHalf - 197.324996948) * (1 - progress)}px`);
    logo.style.setProperty("--scaling", 1 + ((logoOrigWidth / logoTargetWidth) - 1) * (1 - progress));
    navLinks.style.setProperty("--XTranslation", `${(0 - (windowWidthHalf - (navLinksWidth / 2))) * (1 - progress)}px`);
};

const logoSectionAnimation = new IntersectionObserver(entries => {
    const section = entries[0];
    if (!section.isIntersecting) {
        window.removeEventListener("resize", logoSectionRefresh);

        logo.classList.add("atopNavbar");
        navbar.classList.add("show");

        logo.style.setProperty("--XTranslation", "0px");
        logo.style.setProperty("--YTranslation", "0px");
        logo.style.setProperty("--scaling", 1);

        navLinks.style.setProperty("--XTranslation", "0px");
        return;
    }
    window.addEventListener("resize", logoSectionRefresh);

    logo.classList.remove("atopNavbar");
    navbar.classList.remove("show");
    if(section.intersectionRatio < 1) {
        logoSectionTexts.classList.add("hide");
        scrollDownMessage.classList.add("hide");
        document.getElementById("button_detail").classList.add("hide");
    } else {
        logoSectionTexts.classList.remove("hide");
        scrollDownMessage.classList.remove("hide");
        document.getElementById("button_detail").classList.remove("hide");
    }
    const windowWidthHalf = window.innerWidth / 2;
    const windowHeightHalf = window.innerHeight / 2;
    const logoOrigWidth = Math.min(960, window.innerWidth - 20);
    const logoOrigHeight = logoOrigWidth / logoWidthByHeight;

    logo.style.setProperty("--XTranslation", `${(windowWidthHalf - 197.324996948) * section.intersectionRatio}px`);
    logo.style.setProperty("--YTranslation", `${(windowHeightHalf + 36.7166748046875 - logoTargetY - 60.21666717529297) * section.intersectionRatio}px`);
    /*
    Half of logo's height when at its largest: 60.21666717529297
    Extra y for when the logo is scaled up: 36.7166748046875
    */
    logo.style.setProperty("--scaling", 1 + ((logoOrigWidth / logoTargetWidth) - 1) * section.intersectionRatio);

    navLinks.style.setProperty("--XTranslation", `${(0 - (windowWidthHalf - (navLinksWidth / 2))) * section.intersectionRatio}px`);
}, { threshold: Array.from({length: 101}, (_, i) => i / 100) });

logoSectionAnimation.observe(document.querySelector("#logo-section-animation-observe"));

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
cardsFadeIn.observe(document.querySelector("#sponsorCardsDiv"));

const prizeBarsRise = new IntersectionObserver(entries => {
    const prizeBarsSection = entries[0];
    if (!prizeBarsSection.isIntersecting) {
        return;
    }
    prizeBarsSection.target.classList.add("show");
    prizeBarsRise.unobserve(prizeBarsSection.target)
}, { threshold: 0.1 });

prizeBarsRise.observe(document.querySelector("#prize-trophies"));
