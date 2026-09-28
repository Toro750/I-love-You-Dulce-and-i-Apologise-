document.addEventListener('DOMContentLoaded', () => {

    /* ========================================================
       1. PROGRESSIVE ENHANCEMENT (SCROLL REVEAL)
       ======================================================== */
    // Only apply JS-hiding if JS is running, ensuring fallback visibility.
    const fadeElements = document.querySelectorAll('.fade-text');
    
    // Add hidden class initially
    fadeElements.forEach(el => {
        el.classList.add('js-hidden');
    });

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Staggered reveal based on index inside parent if desired, 
                // but simple reveal is cleaner for performance.
                entry.target.classList.remove('js-hidden');
                entry.target.classList.add('js-visible');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, revealOptions);

    fadeElements.forEach(el => {
        // Exclude final ending pauses from standard scroll reveal
        if (!el.classList.contains('ending-pause')) {
            revealObserver.observe(el);
        }
    });

    /* ========================================================
       2. SCENE 4: INTERACTIVE FLOWERS
       ======================================================== */
    const flowers = document.querySelectorAll('.flower-btn');
    flowers.forEach(flower => {
        const msg = flower.getAttribute('data-msg');
        const noteSpan = flower.querySelector('.flower-note');
        if (noteSpan) noteSpan.textContent = msg;

        flower.addEventListener('click', () => {
            // Close others (optional, but keeps UI clean)
            flowers.forEach(f => {
                if (f !== flower) f.classList.remove('open');
            });
            flower.classList.toggle('open');
        });
    });

    /* ========================================================
       3. SCENE 5: ROOM INTERACTIONS
       ======================================================== */
    const roomItems = document.querySelectorAll('.room-item');
    roomItems.forEach(item => {
        const msg = item.getAttribute('data-msg');
        const noteSpan = item.querySelector('.room-note');
        if (noteSpan) noteSpan.textContent = msg;

        item.addEventListener('click', () => {
            roomItems.forEach(i => {
                if (i !== item) i.classList.remove('active');
            });
            item.classList.toggle('active');
        });
    });

    /* ========================================================
       4. SCENE 11: FINAL LETTER ENVELOPE
       ======================================================== */
    const envelope = document.getElementById('final-envelope');
    const letterContent = document.getElementById('final-letter-text');
    const openBtn = document.getElementById('open-letter-btn');
    let letterOpened = false;

    function openLetter() {
        if (letterOpened) return;
        letterOpened = true;
        
        // Hide envelope & button
        if(envelope) envelope.style.display = 'none';
        if(openBtn) openBtn.style.display = 'none';
        
        // Show letter
        if(letterContent) letterContent.classList.add('show');
        
        // Trigger reveal for paragraphs inside the letter
        const letterParagraphs = letterContent.querySelectorAll('.fade-text:not(.ending-pause)');
        letterParagraphs.forEach((p, index) => {
            setTimeout(() => {
                p.classList.remove('js-hidden');
                p.classList.add('js-visible');
            }, index * 400); // 400ms stagger
        });

        // Trigger final ending sequence after letter finishes revealing
        const totalLetterTime = letterParagraphs.length * 400 + 1000;
        setTimeout(playFinalEnding, totalLetterTime);
    }

    if (envelope) envelope.addEventListener('click', openLetter);
    if (openBtn) openBtn.addEventListener('click', openLetter);


    /* ========================================================
       5. FINAL ENDING SEQUENCE
       ======================================================== */
    function playFinalEnding() {
        const endingPauses = document.querySelectorAll('.ending-pause');
        endingPauses.forEach((el, index) => {
            setTimeout(() => {
                el.classList.remove('js-hidden');
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 2000); // 2 second pause between final lines
        });
    }

    /* ========================================================
       6. AMBIENT PARTICLES (FIREFLIES)
       ======================================================== */
    const ambientContainer = document.getElementById('ambient-container');
    const particleCount = 15; // Kept low for performance

    if (ambientContainer) {
        for (let i = 0; i < particleCount; i++) {
            createFirefly(ambientContainer);
        }
    }

    function createFirefly(container) {
        const firefly = document.createElement('div');
        firefly.classList.add('ambient-particle', 'firefly');
        
        // Randomize initial position
        const startX = Math.random() * 100; // vw
        const startY = Math.random() * 100; // vh
        
        firefly.style.left = `${startX}vw`;
        firefly.style.top = `${startY}vh`;
        
        // Randomize animation delays so they don't move together
        const delay = Math.random() * 5;
        firefly.style.animationDelay = `${delay}s`;
        
        container.appendChild(firefly);
    }

});