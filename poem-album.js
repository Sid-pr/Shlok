document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const prevPoemBtn = document.getElementById('prev-poem');
    const nextPoemBtn = document.getElementById('next-poem');
    const mainPoemContainer = document.getElementById('main-poem-container');
    const pageTurnContainer = document.getElementById('page-turn-container');
    const currentPage = document.getElementById('current-page');
    const nextPage = document.getElementById('next-page');
    const poemContent = document.getElementById('poem-content');
    const poemPosition = document.querySelector('.poem-position');
    
    // Album/Collection Data
    const poemCollection = {
        currentIndex: 0,
        totalPoems: 9, // Total sargas/pages in the collection
        poems: [
            {
                title: "रश्मिरथी - सर्ग 1",
                content: document.getElementById('poem-content').innerHTML,
                position: "सर्ग 1/9"
            },
            {
                title: "रश्मिरथी - सर्ग 2",
                content: document.getElementById('poem-content-2') ? document.getElementById('poem-content-2').innerHTML : null,
                position: "सर्ग 2/9"
            }
            // Additional sargas would be added here or loaded dynamically from the server
        ]
    };
    
    // Initialize page turning effect
    function initPageTurning() {
        if (nextPoemBtn) {
            nextPoemBtn.addEventListener('click', function() {
                navigateToNextPoem();
            });
        }
        
        if (prevPoemBtn) {
            prevPoemBtn.addEventListener('click', function() {
                navigateToPrevPoem();
            });
        }
    }
    
    // Navigate to the next poem with page turning effect
    function navigateToNextPoem() {
        if (poemCollection.currentIndex >= poemCollection.totalPoems - 1) {
            return; // Already at the last poem
        }
        
        // Enable prev button if moving beyond the first poem
        if (poemCollection.currentIndex === 0) {
            prevPoemBtn.disabled = false;
        }
        
        // Disable next button if reaching the last poem
        if (poemCollection.currentIndex === poemCollection.totalPoems - 2) {
            nextPoemBtn.disabled = true;
        }
        
        // Increment the current index
        poemCollection.currentIndex++;
        
        // If we have the next poem content, show the page turning effect
        if (poemCollection.poems[poemCollection.currentIndex] && 
            poemCollection.poems[poemCollection.currentIndex].content) {
            
            // Show the page turn container and set up the pages
            pageTurnContainer.style.height = mainPoemContainer.offsetHeight + 'px';
            pageTurnContainer.classList.add('active');
            
            // Copy current poem to current-page
            currentPage.innerHTML = poemCollection.poems[poemCollection.currentIndex - 1].content;
            
            // Set next poem content
            nextPage.innerHTML = poemCollection.poems[poemCollection.currentIndex].content;
            
            // Trigger the page turn animation
            setTimeout(() => {
                currentPage.classList.add('turning');
                nextPage.classList.add('turning');
            }, 50);
            
            // After animation completes, update the main poem content
            setTimeout(() => {
                // Update the main poem content
                poemContent.innerHTML = poemCollection.poems[poemCollection.currentIndex].content;
                
                // Update position indicator
                if (poemPosition) {
                    poemPosition.textContent = poemCollection.poems[poemCollection.currentIndex].position;
                }
                
                // Reset the page turning container
                pageTurnContainer.classList.remove('active');
                currentPage.classList.remove('turning');
                nextPage.classList.remove('turning');
            }, 800); // This should match the transition duration
            
        } else {
            // Fallback if content is not available (would typically load from server)
            console.log("Loading next poem content...");
            // Here you would implement a loading state and fetch from server
            
            // For demonstration, just update the position indicator
            if (poemPosition) {
                poemPosition.textContent = `सर्ग ${poemCollection.currentIndex + 1}/${poemCollection.totalPoems}`;
            }
        }
    }
    
    // Navigate to the previous poem with page turning effect
    function navigateToPrevPoem() {
        if (poemCollection.currentIndex <= 0) {
            return; // Already at the first poem
        }
        
        // Enable next button if moving back from the last poem
        if (poemCollection.currentIndex === poemCollection.totalPoems - 1) {
            nextPoemBtn.disabled = false;
        }
        
        // Disable prev button if reaching the first poem
        if (poemCollection.currentIndex === 1) {
            prevPoemBtn.disabled = true;
        }
        
        // Decrement the current index
        poemCollection.currentIndex--;
        
        // If we have the previous poem content, show the page turning effect
        if (poemCollection.poems[poemCollection.currentIndex] && 
            poemCollection.poems[poemCollection.currentIndex].content) {
            
            // Show the page turn container and set up the pages
            pageTurnContainer.style.height = mainPoemContainer.offsetHeight + 'px';
            pageTurnContainer.classList.add('active');
            
            // Copy current poem to next-page (since we're going backwards)
            nextPage.innerHTML = poemCollection.poems[poemCollection.currentIndex + 1].content;
            
            // Set previous poem content to current-page
            currentPage.innerHTML = poemCollection.poems[poemCollection.currentIndex].content;
            
            // Set up initial state for backward turning
            currentPage.style.transform = 'rotateY(-180deg)';
            nextPage.style.opacity = '1';
            
            // Trigger the page turn animation (in reverse)
            setTimeout(() => {
                currentPage.style.transform = 'rotateY(0deg)';
                nextPage.style.opacity = '0';
            }, 50);
            
            // After animation completes, update the main poem content
            setTimeout(() => {
                // Update the main poem content
                poemContent.innerHTML = poemCollection.poems[poemCollection.currentIndex].content;
                
                // Update position indicator
                if (poemPosition) {
                    poemPosition.textContent = poemCollection.poems[poemCollection.currentIndex].position;
                }
                
                // Reset the page turning container
                pageTurnContainer.classList.remove('active');
                currentPage.style.transform = '';
                nextPage.style.opacity = '';
            }, 800); // This should match the transition duration
            
        } else {
            // Fallback if content is not available
            console.log("Loading previous poem content...");
            
            // For demonstration, just update the position indicator
            if (poemPosition) {
                poemPosition.textContent = `सर्ग ${poemCollection.currentIndex + 1}/${poemCollection.totalPoems}`;
            }
        }
    }
    
    // If we're on a poem collection page, initialize the page turning
    if (prevPoemBtn && nextPoemBtn && pageTurnContainer) {
        initPageTurning();
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Only proceed if we're on a poem collection page
        if (!prevPoemBtn || !nextPoemBtn) return;
        
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            // Next poem
            if (!nextPoemBtn.disabled) {
                navigateToNextPoem();
            }
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            // Previous poem
            if (!prevPoemBtn.disabled) {
                navigateToPrevPoem();
            }
        }
    });
}); 