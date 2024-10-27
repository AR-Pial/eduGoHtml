const duration = 1100; // Duration in milliseconds for all counters to complete
const counters = document.querySelectorAll('.home-counter-card');

// Function to run the counter animation
const runCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    const counterElement = counter.querySelector('.counter'); // Target the specific counter paragraph
    const increment = target / (duration / 20); // Calculate increment so each ends in the same time
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counterElement.innerText = Math.floor(current);
            setTimeout(updateCounter, 20); // Update every 20ms for a smooth effect
        } else {
            counterElement.innerText = target; // Ensure the final value is exact
        }
    };

    updateCounter();
};

// Set up Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runCounter(entry.target); // Start the counter animation
            observer.unobserve(entry.target); // Stop observing after animation has started
        }
    });
}, { threshold: 0.5 }); // Adjust threshold as needed (0.5 means 50% of element should be visible)

// Attach observer to each counter element
counters.forEach(counter => {
    observer.observe(counter);
});
