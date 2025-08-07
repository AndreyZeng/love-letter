document.addEventListener('DOMContentLoaded', () => {
    // --- 元素获取 ---
    const curtain = document.getElementById('curtain');
    const startButton = document.getElementById('start-button');
    const storybook = document.getElementById('storybook');
    const bgm = document.getElementById('bgm');
    const musicToggle = document.getElementById('music-toggle');
    const guluCat = document.getElementById('gulu-cat');
    const guluHead = guluCat ? guluCat.querySelector('.gulu-head') : null;
    const fadeInElements = document.querySelectorAll('.fade-in');

    // --- 开幕逻辑 ---
    startButton.addEventListener('click', () => {
        bgm.play().catch(e => console.error("Autoplay failed:", e));
        musicToggle.classList.add('playing');
        curtain.style.opacity = '0';
        setTimeout(() => curtain.classList.add('hidden'), 1500);
        storybook.classList.remove('hidden');
        document.body.style.overflow = 'auto';
        setTimeout(() => storybook.classList.add('visible'), 100);
        musicToggle.classList.remove('hidden');
    }, { once: true });

    // --- Intersection Observer 逻辑 ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.4 });
    fadeInElements.forEach(el => observer.observe(el));

    // --- “咕噜”跟随鼠标 ---
    if (guluHead) {
        document.addEventListener('mousemove', (e) => {
            const headRect = guluHead.getBoundingClientRect();
            const headCenterX = headRect.left + headRect.width / 2;
            const headCenterY = headRect.top + headRect.height / 2;
            const angle = Math.atan2(e.clientY - headCenterY, e.clientX - headCenterX);
            const degrees = angle * (180 / Math.PI);
            const clampedDegrees = Math.max(-25, Math.min(25, degrees));
            guluHead.style.transform = `rotate(${clampedDegrees}deg)`;
        });
    }

    // --- 咕噜点击爱心特效 ---
    if (guluCat) {
        guluCat.addEventListener('click', (e) => {
            for (let i = 0; i < 15; i++) {
                createHeart(e.clientX, e.clientY);
            }
        });
    }

    function createHeart(x, y) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        document.body.appendChild(heart);
        
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        
        const destinationX = (Math.random() - 0.5) * 300;
        const destinationY = (Math.random() - 0.5) * 300;
        const rotation = Math.random() * 520;
        const duration = 1 + Math.random();

        heart.style.animation = `love ${duration}s ease-out forwards`;
        heart.style.transform = `translate(-50%, -50%)`;
        
        setTimeout(() => {
             heart.style.transform = `translate(${destinationX}px, ${destinationY - 150}px) rotate(${rotation}deg)`;
        }, 10);

        setTimeout(() => {
            heart.remove();
        }, duration * 1000);
    }
    
    // --- 音乐控制 ---
    musicToggle.addEventListener('click', () => {
        if (bgm.paused) { bgm.play(); musicToggle.classList.add('playing'); } 
        else { bgm.pause(); musicToggle.classList.remove('playing'); }
    });

    // --- 生成落叶 ---
    const leavesContainer = document.querySelector('.leaves-container');
    if (leavesContainer) {
        for (let i = 0; i < 25; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            leaf.style.left = `${Math.random() * 100}%`;
            leaf.style.animationDelay = `${Math.random() * 10}s`;
            leaf.style.animationDuration = `${5 + Math.random() * 8}s`;
            const size = 2 + Math.random() * 2;
            leaf.style.width = `${size}vmin`; leaf.style.height = `${size}vmin`;
            leaf.style.filter = `blur(${Math.random() * 2}px)`;
            leavesContainer.appendChild(leaf);
        }
    }
});
