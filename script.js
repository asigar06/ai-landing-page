/**
 * AI Automation Agency Website - Scroll-Triggered Animations
 * 
 * This script handles all scroll-triggered animations for the website.
 * It uses the Intersection Observer API for efficient performance and smooth animations.
 */

// ===== INTERSECTION OBSERVER SETUP =====

/**
 * Configuration for the Intersection Observer
 * - threshold: 0.1 means the animation triggers when 10% of the element is visible
 * - rootMargin: Adds a margin around the root's bounding box
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

/**
 * Callback function for the Intersection Observer
 * This function is called whenever an observed element enters or leaves the viewport
 */
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class when element enters viewport
            entry.target.classList.add('animate');
            
            // For list items, add staggered animation delay
            if (entry.target.classList.contains('problem-item') || 
                entry.target.classList.contains('solution-item')) {
                addStaggeredAnimation(entry.target);
            }
            
            // Stop observing this element once it's animated
            observer.unobserve(entry.target);
        }
    });
}

/**
 * Create the Intersection Observer instance
 */
const observer = new IntersectionObserver(handleIntersection, observerOptions);

// ===== ANIMATION FUNCTIONS =====

/**
 * Add staggered animation delays to list items
 * This creates a sequential appearance effect for problem/solution items
 */
function addStaggeredAnimation(element) {
    const parentList = element.parentElement;
    const items = Array.from(parentList.children);
    const index = items.indexOf(element);
    
    // Add delay based on item position (200ms per item)
    element.style.transitionDelay = `${index * 0.2}s`;
}

/**
 * Initialize hero section animation
 * The hero content animates immediately when the page loads
 */
function initHeroAnimation() {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        // Small delay to ensure smooth animation on page load
        setTimeout(() => {
            heroContent.classList.add('animate');
        }, 300);
    }
}

/**
 * Initialize service blocks animation
 * Service blocks have different animation directions based on their data-animation attribute
 */
function initServiceBlocksAnimation() {
    const serviceBlocks = document.querySelectorAll('.service-block');
    serviceBlocks.forEach((block, index) => {
        // Add delay based on block position for sequential animation
        block.style.transitionDelay = `${index * 0.2}s`;
        observer.observe(block);
    });
}

/**
 * Initialize problems and solutions list animations
 * Each list item animates individually with staggered timing
 */
function initListItemsAnimation() {
    const problemItems = document.querySelectorAll('.problem-item');
    const solutionItems = document.querySelectorAll('.solution-item');
    
    // Observe all problem items
    problemItems.forEach(item => {
        observer.observe(item);
    });
    
    // Observe all solution items
    solutionItems.forEach(item => {
        observer.observe(item);
    });
}

/**
 * Initialize general section animations
 * This handles mission content, contact content, and other general sections
 */
function initGeneralSectionAnimations() {
    const animatedElements = document.querySelectorAll(
        '.mission-content, .contact-content, .pulse-animation'
    );
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

/**
 * Add smooth scrolling behavior for anchor links
 * This enhances the user experience when clicking on navigation links
 */
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Add hover effects to interactive elements
 * This adds subtle micro-interactions to enhance user experience
 */
function initHoverEffects() {
    const serviceBlocks = document.querySelectorAll('.service-block');
    
    serviceBlocks.forEach(block => {
        block.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        });
        
        block.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
}

/**
 * Handle scroll-based background parallax effect (subtle)
 * This adds a subtle parallax effect to the hero section background
 */
function initParallaxEffect() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;
            
            heroSection.style.transform = `translateY(${parallax}px)`;
        });
    }
}

/**
 * Performance optimization: Throttle scroll events
 * This prevents excessive function calls during scroll events
 */
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== INITIALIZATION =====

/**
 * Initialize all animations and interactions when the DOM is fully loaded
 */
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all animation systems
    initHeroAnimation();
    initServiceBlocksAnimation();
    initListItemsAnimation();
    initGeneralSectionAnimations();
    initSmoothScrolling();
    initHoverEffects();
    
    // Add a subtle parallax effect (commented out for performance, uncomment if desired)
    // initParallaxEffect();
    
    console.log('AI Automation Agency website animations initialized successfully!');
});

/**
 * Handle window resize events
 * This ensures animations work correctly on different screen sizes
 */
window.addEventListener('resize', throttle(() => {
    // Recalculate any size-dependent animations if needed
    // Currently not needed, but placeholder for future enhancements
}, 250));

/**
 * Add loading state management
 * This ensures smooth transitions when the page is fully loaded
 */
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Remove any loading indicators if present
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
});

