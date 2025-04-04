document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const readAloudBtn = document.getElementById('read-aloud-btn');
    const toggleMusicBtn = document.getElementById('toggle-music-btn');
    const downloadBtn = document.getElementById('download-btn');
    const shareBtn = document.getElementById('share-btn');
    const poemContent = document.getElementById('poem-content');
    const meditationSound = document.getElementById('meditation-sound');
    
    // Speech synthesis setup
    const synth = window.speechSynthesis;
    let utterance = null;
    let isSpeaking = false;
    let highlightedWords = [];
    let currentWordIndex = 0;
    let highlightInterval = null;
    
    // Read poem aloud functionality
    if (readAloudBtn) {
        readAloudBtn.addEventListener('click', function() {
            if (isSpeaking) {
                stopSpeaking();
            } else {
                startSpeaking();
            }
        });
    }
    
    // Toggle meditation music
    if (toggleMusicBtn) {
        toggleMusicBtn.addEventListener('click', function() {
            if (meditationSound.paused) {
                meditationSound.volume = 0.5; // Set volume to 50%
                meditationSound.play()
                    .then(() => {
                        toggleMusicBtn.classList.add('active');
                        toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i> संगीत बंद करें';
                    })
                    .catch((error) => {
                        console.error('Error playing audio:', error);
                        alert('संगीत चलाने में समस्या हुई। कृपया पुनः प्रयास करें।');
                    });
            } else {
                meditationSound.pause();
                toggleMusicBtn.classList.remove('active');
                toggleMusicBtn.innerHTML = '<i class="fas fa-music"></i> ध्यान संगीत';
            }
        });
    }
    
    // Download poem functionality
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            // Get poem title and author
            const poemTitle = document.querySelector('.poem-title').textContent;
            const poetName = document.querySelector('.author-name').textContent;
            // Get clean text
            const poemText = poemContent.innerText;
            
            // Create content for the text file
            const fileContent = `${poemTitle}\n${poetName}\n\n${poemText}\n\nकॉपीराइट © काव्य संगम - www.kavyasangam.com`;
            
            // Create a blob with the text
            const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
            
            // Create a temporary link to download the file
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${poemTitle.replace(/\s+/g, '_')}.txt`;
            
            // Append link to body, click it and remove it
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Release the blob URL
            setTimeout(() => {
                URL.revokeObjectURL(link.href);
            }, 100);
        });
    }
    
    // Share functionality
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: document.querySelector('.poem-title').textContent,
                    text: `${document.querySelector('.poem-title').textContent} - ${document.querySelector('.author-name').textContent}`,
                    url: window.location.href
                })
                .catch(error => {
                    console.error('Error sharing:', error);
                });
            } else {
                // Fallback for browsers that don't support Web Share API
                const dummyTextArea = document.createElement('textarea');
                dummyTextArea.value = window.location.href;
                document.body.appendChild(dummyTextArea);
                dummyTextArea.select();
                document.execCommand('copy');
                document.body.removeChild(dummyTextArea);
                
                alert('लिंक कॉपी किया गया है। आप इसे शेयर कर सकते हैं।');
            }
        });
    }
    
    // Function to start text-to-speech
    function startSpeaking() {
        if (!poemContent || synth.speaking) return;
        
        // Get clean text (without HTML tags)
        const poemText = poemContent.innerText;
        
        // Split text into words and save original HTML
        const originalHTML = poemContent.innerHTML;
        const words = poemText.split(/\s+/);
        highlightedWords = words;
        
        // Create utterance object
        utterance = new SpeechSynthesisUtterance(poemText);
        
        // Set Hindi voice if available
        let hindiVoice = null;
        const voices = synth.getVoices();
        
        for (let voice of voices) {
            if (voice.lang === 'hi-IN') {
                hindiVoice = voice;
                break;
            }
        }
        
        if (hindiVoice) {
            utterance.voice = hindiVoice;
        }
        
        utterance.lang = 'hi-IN';
        utterance.rate = 0.9; // Slightly slower rate for poetry
        utterance.pitch = 1;
        
        // Event handlers
        utterance.onstart = function() {
            isSpeaking = true;
            readAloudBtn.classList.add('active');
            readAloudBtn.innerHTML = '<i class="fas fa-pause"></i> पाठ रोकें';
            
            // Start word highlighting
            currentWordIndex = 0;
            startWordHighlighting(words);
        };
        
        utterance.onend = function() {
            stopSpeaking();
            // Restore original HTML
            poemContent.innerHTML = originalHTML;
        };
        
        utterance.onerror = function(event) {
            console.error('Speech synthesis error:', event);
            stopSpeaking();
            // Restore original HTML
            poemContent.innerHTML = originalHTML;
        };
        
        // Start speaking
        synth.speak(utterance);
    }
    
    // Function to stop text-to-speech
    function stopSpeaking() {
        if (synth.speaking) {
            synth.cancel();
        }
        
        if (highlightInterval) {
            clearInterval(highlightInterval);
            highlightInterval = null;
        }
        
        isSpeaking = false;
        readAloudBtn.classList.remove('active');
        readAloudBtn.innerHTML = '<i class="fas fa-volume-up"></i> कविता सुनें';
        
        // Remove any highlights
        const highlightedElements = document.querySelectorAll('.word-highlight');
        highlightedElements.forEach(el => {
            el.classList.remove('word-highlight');
        });
    }
    
    // Function to highlight words while speaking
    function startWordHighlighting(words) {
        // Create a new HTML with span elements for each word
        let newHTML = '';
        words.forEach((word, index) => {
            newHTML += `<span class="word" data-index="${index}">${word}</span> `;
        });
        poemContent.innerHTML = newHTML;
        
        // Estimate words per minute for Hindi poetry (slower than normal speech)
        const wordsPerMinute = 100;
        const msPerWord = 60000 / wordsPerMinute;
        
        // Highlight words at calculated interval
        highlightInterval = setInterval(() => {
            // Remove previous highlight
            const previousHighlight = document.querySelector('.word-highlight');
            if (previousHighlight) {
                previousHighlight.classList.remove('word-highlight');
            }
            
            // Add highlight to current word
            const currentWord = document.querySelector(`.word[data-index="${currentWordIndex}"]`);
            if (currentWord) {
                currentWord.classList.add('word-highlight');
                
                // Scroll to keep highlighted word in view if needed
                const rect = currentWord.getBoundingClientRect();
                const isInView = (
                    rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                );
                
                if (!isInView) {
                    currentWord.scrollIntoView({
                        behavior: 'smooth', 
                        block: 'center'
                    });
                }
            }
            
            // Move to next word
            currentWordIndex++;
            
            // If reached end, clear interval
            if (currentWordIndex >= words.length) {
                clearInterval(highlightInterval);
                highlightInterval = null;
            }
        }, msPerWord);
    }
    
    // Handle page visibility changes (pause speech when tab is hidden)
    document.addEventListener('visibilitychange', function() {
        if (document.hidden && isSpeaking) {
            synth.pause();
        } else if (!document.hidden && isSpeaking && synth.paused) {
            synth.resume();
        }
    });
    
    // Load voices when they are ready (for Chrome)
    if (synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = function() {
            // Voices are loaded and ready to use
        };
    }
    
    // Workaround for some mobile browsers: preload audio
    function preloadAudio() {
        meditationSound.load();
        
        // Enable audio on first user interaction (for iOS)
        document.addEventListener('touchstart', () => {
            meditationSound.play().then(() => {
                meditationSound.pause();
            }).catch(e => {
                // Ignore errors
            });
        }, { once: true });
    }
    
    preloadAudio();

    // Bhavarth toggle functionality
    const bhavarth = document.querySelector('.poem-bhavarth');
    
    if (bhavarth) {
        const bhavarthHeader = bhavarth.querySelector('.bhavarth-header');
        const bhavarthContent = bhavarth.querySelector('.bhavarth-content');
        const toggleBtn = bhavarth.querySelector('.toggle-bhavarth');
        
        // Initially show the bhavarth content
        bhavarthContent.classList.add('active');
        toggleBtn.classList.add('active');
        
        bhavarthHeader.addEventListener('click', function() {
            bhavarthContent.classList.toggle('active');
            toggleBtn.classList.toggle('active');
        });
    }
}); 