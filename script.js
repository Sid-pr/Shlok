// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const navItems = document.querySelectorAll('.nav-links a');
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (this.getAttribute('href') === '#') return;
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form Submission Handling
const publishForm = document.querySelector('.publish-form');
if (publishForm) {
    publishForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const title = document.getElementById('poem-title').value;
        const content = document.getElementById('poem-content').value;
        const tags = document.getElementById('poem-tags').value;
        
        if (!title || !content) {
            alert('कृपया कविता का शीर्षक और कविता दोनों भरें');
            return;
        }
        
        // This would typically send data to a backend
        alert('आपकी कविता सफलतापूर्वक जमा कर दी गई है और समीक्षा के अधीन है।');
        publishForm.reset();
    });
}

// Contact form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('आपका संदेश सफलतापूर्वक भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।');
        contactForm.reset();
    });
}

// Like functionality (simplified)
document.addEventListener('click', function(e) {
    // Update this to work with Font Awesome icons
    if (e.target.classList.contains('fa-heart') || e.target.parentElement.classList.contains('fa-heart')) {
        const heartIcon = e.target.classList.contains('fa-heart') ? e.target : e.target.querySelector('.fa-heart');
        const likeElement = heartIcon.closest('span');
        
        if (likeElement) {
            let likeText = likeElement.textContent.trim();
            let likeCount = parseInt(likeText);
            
            // Toggle heart color to indicate like status
            heartIcon.classList.toggle('liked');
            
            if (heartIcon.classList.contains('liked')) {
                heartIcon.style.color = '#FF9933';
                likeCount += 1;
            } else {
                heartIcon.style.color = '';
                likeCount -= 1;
            }
            
            likeElement.innerHTML = '';
            likeElement.appendChild(heartIcon);
            likeElement.append(` ${likeCount}`);
        }
    }
});

// Dynamic year in footer copyright
document.addEventListener('DOMContentLoaded', function() {
    const currentYear = new Date().getFullYear();
    const copyrightElement = document.querySelector('.footer-bottom p');
    if (copyrightElement) {
        copyrightElement.innerHTML = `&copy; ${currentYear} काव्य संगम - सभी अधिकार सुरक्षित`;
    }
    
    // Set position: relative to sections for decorative elements
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.position = 'relative';
    });
    
    // Add data-tooltip attributes to category tags
    const categoryTags = document.querySelectorAll('.category-tag');
    const tooltips = [
        'प्रेम कविताएँ',
        'प्रकृति की कविताएँ',
        'देशभक्ति की कविताएँ',
        'आध्यात्मिक कविताएँ',
        'जीवन की कविताएँ',
        'सामाजिक कविताएँ',
        'फिल्मी गाने व कविताएँ',
        'दोहे और छंद'
    ];
    
    categoryTags.forEach((tag, index) => {
        if (index < tooltips.length) {
            tag.setAttribute('data-tooltip', tooltips[index]);
        }
    });
});

// Adding active class to navigation based on scroll position
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === '#' + current) {
            link.classList.add('active');
        } else if (current === '' && href === '#') {
            link.classList.add('active');
        }
    });
});

// Search functionality (simplified)
const searchBtn = document.querySelector('.search-btn');
if (searchBtn) {
    searchBtn.addEventListener('click', function() {
        const searchQuery = document.querySelector('.discover-search input').value.trim();
        if (searchQuery) {
            alert(`आपने "${searchQuery}" के लिए खोज की है। यह फंक्शनैलिटी डेमो के लिए है।`);
        } else {
            alert('कृपया खोज के लिए कुछ लिखें');
        }
    });
} 