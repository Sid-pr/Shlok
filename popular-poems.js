document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu functionality is handled by script.js
    
    // Filter by poet
    const poetSelect = document.getElementById('poet-select');
    if (poetSelect) {
        poetSelect.addEventListener('change', function() {
            const selectedPoet = this.value;
            const poetSections = document.querySelectorAll('.poet-section');
            
            if (selectedPoet === 'all') {
                // Show all poets
                poetSections.forEach(section => {
                    section.style.display = 'block';
                });
            } else {
                // Show only selected poet
                poetSections.forEach(section => {
                    const poetHeading = section.querySelector('.poet-heading').textContent.toLowerCase();
                    
                    if (selectedPoet === 'harivansh' && poetHeading.includes('बच्चन')) {
                        section.style.display = 'block';
                    } else if (selectedPoet === 'nirala' && poetHeading.includes('निराला')) {
                        section.style.display = 'block';
                    } else if (selectedPoet === 'mahadevi' && poetHeading.includes('महादेवी')) {
                        section.style.display = 'block';
                    } else if (selectedPoet === 'dinkar' && poetHeading.includes('दिनकर')) {
                        section.style.display = 'block';
                    } else if (selectedPoet === 'meera' && poetHeading.includes('मीरा')) {
                        section.style.display = 'block';
                    } else {
                        section.style.display = 'none';
                    }
                });
            }
        });
    }
    
    // Filter by category
    const filterTags = document.querySelectorAll('.filter-tag');
    if (filterTags.length > 0) {
        filterTags.forEach(tag => {
            tag.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all tags
                filterTags.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tag
                this.classList.add('active');
                
                const category = this.textContent.trim().toLowerCase();
                const poemCards = document.querySelectorAll('.poem-card');
                
                if (category === 'सभी') {
                    // Show all poems
                    poemCards.forEach(card => {
                        card.style.display = 'block';
                    });
                } else {
                    // Filter by category
                    // For demonstration purposes, we'll use a simple mapping
                    const categoryMapping = {
                        'प्रेम': ['मधुशाला', 'बसंत', 'नीर', 'पग घुंघरू'],
                        'देशभक्ति': ['मेरा भारत', 'रश्मिरथी'],
                        'अध्यात्म': ['पग घुंघरू', 'मधुशाला'],
                        'प्रकृति': ['बसंत', 'अरुण यह मधुमय देश'],
                        'क्रांति': ['हुंकार', 'जागो', 'तोड़ती पत्थर']
                    };
                    
                    // Get match keywords for selected category
                    const matchKeywords = categoryMapping[category] || [];
                    
                    poemCards.forEach(card => {
                        const title = card.querySelector('h3').textContent.toLowerCase();
                        const content = card.querySelector('.poem-preview').textContent.toLowerCase();
                        
                        // Check if any keyword matches title or content
                        const matches = matchKeywords.some(keyword => 
                            title.includes(keyword.toLowerCase()) || 
                            content.includes(keyword.toLowerCase())
                        );
                        
                        if (matches) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
                
                // Check if any poet section is empty after filtering
                const poetSections = document.querySelectorAll('.poet-section');
                poetSections.forEach(section => {
                    const visibleCards = section.querySelectorAll('.poem-card[style="display: block"]');
                    if (visibleCards.length === 0) {
                        section.style.display = 'none';
                    } else {
                        section.style.display = 'block';
                    }
                });
            });
        });
    }
    
    // Pagination
    const pageNumbers = document.querySelectorAll('.page-number');
    const prevBtn = document.querySelector('.page-btn:first-child');
    const nextBtn = document.querySelector('.page-btn:last-child');
    
    if (pageNumbers.length > 0) {
        pageNumbers.forEach(number => {
            number.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Remove active class from all page numbers
                pageNumbers.forEach(num => num.classList.remove('active'));
                // Add active class to clicked page number
                this.classList.add('active');
                
                // Enable/disable prev/next buttons based on current page
                if (this.textContent.trim() === '1') {
                    prevBtn.classList.add('disabled');
                } else {
                    prevBtn.classList.remove('disabled');
                }
                
                if (this.textContent.trim() === '8') {
                    nextBtn.classList.add('disabled');
                } else {
                    nextBtn.classList.remove('disabled');
                }
                
                // Scroll to top of the page
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                
                // For this demo, we won't implement actual pagination content loading
                // In a real implementation, you would load the appropriate content for the selected page
                alert(`पृष्ठ ${this.textContent.trim()} पर जाएँ - यह डेमो के लिए है। वास्तविक वेबसाइट पर, यहां नई कविताएँ लोड होंगी।`);
            });
        });
        
        // Next button functionality
        if (nextBtn) {
            nextBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (this.classList.contains('disabled')) return;
                
                const activePage = document.querySelector('.page-number.active');
                const nextPage = activePage.nextElementSibling;
                
                if (nextPage && nextPage.classList.contains('page-number')) {
                    activePage.classList.remove('active');
                    nextPage.classList.add('active');
                    
                    if (nextPage.textContent.trim() === '8') {
                        this.classList.add('disabled');
                    }
                    
                    prevBtn.classList.remove('disabled');
                    
                    // Scroll to top of the page
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    
                    // For demo purposes
                    alert(`पृष्ठ ${nextPage.textContent.trim()} पर जाएँ - यह डेमो के लिए है।`);
                }
            });
        }
        
        // Previous button functionality
        if (prevBtn) {
            prevBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                if (this.classList.contains('disabled')) return;
                
                const activePage = document.querySelector('.page-number.active');
                const prevPage = activePage.previousElementSibling;
                
                if (prevPage && prevPage.classList.contains('page-number')) {
                    activePage.classList.remove('active');
                    prevPage.classList.add('active');
                    
                    if (prevPage.textContent.trim() === '1') {
                        this.classList.add('disabled');
                    }
                    
                    nextBtn.classList.remove('disabled');
                    
                    // Scroll to top of the page
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    
                    // For demo purposes
                    alert(`पृष्ठ ${prevPage.textContent.trim()} पर जाएँ - यह डेमो के लिए है।`);
                }
            });
        }
    }
}); 