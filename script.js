document.addEventListener('DOMContentLoaded', () => {
    // Create SVG icons for decorative elements
    createSVGIcons();
    
    // Initialize smooth scroll for navigation links
    initSmoothScroll();
    
    // Add hover event listeners to pause/resume gallery animation
    const scrollWrapper = document.querySelector('.scroll-wrapper');
    if (scrollWrapper) {
        // Add hover event listeners to pause/resume animation
        scrollWrapper.addEventListener('mouseenter', () => {
            scrollWrapper.style.animationPlayState = 'paused';
        });
        
        scrollWrapper.addEventListener('mouseleave', () => {
            scrollWrapper.style.animationPlayState = 'running';
        });
        
        // Add click event to view larger images
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                if (img) {
                    openLightbox(img.src, img.alt);
                }
            });
        });
    }

    // Create and handle lightbox for gallery images
    function openLightbox(imageSrc, imageAlt) {
        let lightbox = document.querySelector('.lightbox');
        
        if (!lightbox) {
            lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const closeBtn = document.createElement('button');
            closeBtn.className = 'lightbox-close';
            closeBtn.innerHTML = '&times;';
            closeBtn.addEventListener('click', () => {
                lightbox.classList.remove('active');
                setTimeout(() => {
                    document.body.removeChild(lightbox);
                }, 300);
            });
            
            const lightboxContent = document.createElement('div');
            lightboxContent.className = 'lightbox-content';
            
            lightbox.appendChild(closeBtn);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Close lightbox when clicking outside the image
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.classList.remove('active');
                    setTimeout(() => {
                        document.body.removeChild(lightbox);
                    }, 300);
                }
            });
        }
        
        const lightboxContent = lightbox.querySelector('.lightbox-content');
        lightboxContent.innerHTML = `<img src="${imageSrc}" alt="${imageAlt}">`;
        
        // Trigger reflow before adding active class for animation
        void lightbox.offsetWidth;
        
        lightbox.classList.add('active');
    }

    // Create SVG icons for decorative elements
    function createSVGIcons() {
        // Create floral top decoration
        const floralTop = `
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50C120 40 150 60 140 90C130 120 100 130 80 120C60 110 80 60 100 50Z" fill="#f26d64"/>
            <path d="M110 40C130 50 150 30 140 10C130 -10 100 -5 90 10C80 25 90 30 110 40Z" fill="#f26d64" opacity="0.8"/>
            <path d="M90 70C70 50 120 10 140 30C160 50 140 90 120 100C100 110 110 90 90 70Z" fill="#f26d64" opacity="0.6"/>
        </svg>`;

        // Create floral bottom decoration
        const floralBottom = `
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 90C40 110 10 110 0 90C-10 70 10 50 30 50C50 50 60 70 50 90Z" fill="#698B22" opacity="0.7"/>
            <path d="M30 100C10 110 0 90 10 70C20 50 40 50 50 70C60 90 50 90 30 100Z" fill="#698B22" opacity="0.7"/>
            <path d="M70 80C50 70 60 40 80 40C100 40 110 60 100 80C90 100 90 90 70 80Z" fill="#698B22" opacity="0.7"/>
        </svg>`;

        // Create flower accent
        const flower = `
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="15" fill="#d6a02d"/>
            <circle cx="40" cy="40" r="8" fill="#698B22"/>
            <path d="M40 15C45 25 35 25 40 35" stroke="#d6a02d" stroke-width="10" stroke-linecap="round"/>
            <path d="M40 45C45 55 35 55 40 65" stroke="#d6a02d" stroke-width="10" stroke-linecap="round"/>
            <path d="M45 40C55 45 55 35 65 40" stroke="#d6a02d" stroke-width="10" stroke-linecap="round"/>
            <path d="M15 40C25 45 25 35 35 40" stroke="#d6a02d" stroke-width="10" stroke-linecap="round"/>
        </svg>`;

        // Replace the image elements with SVG content
        replaceSvgImages('floral-top', floralTop);
        replaceSvgImages('floral-bottom', floralBottom);
        replaceSvgImages('flower-accent', flower);
    }

    // Helper function to replace images with SVG content
    function replaceSvgImages(className, svgContent) {
        const elements = document.getElementsByClassName(className);
        if (elements.length > 0) {
            for (let i = 0; i < elements.length; i++) {
                const element = elements[i];
                if (element.tagName === 'IMG') {
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = svgContent.trim();
                    const svg = tempDiv.firstChild;
                    svg.classList.add(className);
                    element.parentNode.replaceChild(svg, element);
                }
            }
        }
    }

    // Initialize smooth scroll for navigation and footer links
    function initSmoothScroll() {
        // Get all navigation links and footer links
        const allLinks = document.querySelectorAll('.nav-link, .footer-link');
        
        allLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                
                if (targetId && targetId !== '#') {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        // Add animation class for smooth appear effect
                        targetElement.classList.add('scroll-target');
                        
                        // Scroll to the target element with smooth behavior
                        window.scrollTo({
                            top: targetElement.offsetTop,
                            behavior: 'smooth'
                        });
                        
                        // Remove the animation class after animation completes
                        setTimeout(() => {
                            targetElement.classList.remove('scroll-target');
                        }, 1000);
                    }
                }
            });
        });
    }
}); 