const duration = 1100; 
const counters = document.querySelectorAll('.home-counter-card');

// Function to run the counter animation
const runCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const counterElement = counter.querySelector('.counter'); 
    const increment = target / (duration / 20); 
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counterElement.innerText = Math.floor(current);
            setTimeout(updateCounter, 20); 
        } else {
            counterElement.innerText = target; 
        }
    };

    updateCounter();
};

// Set up Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runCounter(entry.target); 
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

// Attach observer to each counter element
counters.forEach(counter => {
    observer.observe(counter);
});
