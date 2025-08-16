document.addEventListener("DOMContentLoaded", () => {
    const section = document.getElementById("masterclasses");
    const entries = section.querySelectorAll(".timeline-entry");
    
    const observer = new IntersectionObserver((entriesList, observer) => {
        entriesList.forEach(entry => {
            if (entry.isIntersecting) {
                const timelineItems = section.querySelectorAll(".timeline-entry");
                timelineItems.forEach((el, i) => {
                    setTimeout(() => {
                        el.classList.add("visible");
                    }, i * 600);
                });
                observer.unobserve(section);
            }
        });
    }, { threshold: 0.2 });
    observer.observe(section);
});