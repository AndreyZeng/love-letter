document.addEventListener('DOMContentLoaded', () => {
    // --- 元素获取 ---
    const curtain = document.getElementById('curtain');
    const startButton = document.getElementById('start-button');
    const storybook = document.getElementById('storybook');
    const bgm = document.getElementById('bgm');
    const musicToggle = document.getElementById('music-toggle');
    const guluCat = document.getElementById('gulu-cat');
    const guluHead = guluCat ? guluCat.querySelector('.gulu-head') : null;
    const starrySky = document.getElementById('starry-sky');
    const interactionScene = document.getElementById('main-interaction-scene');
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
            const degrees = angle * (180 / Math.PI) + 90; // +90 to correct orientation
            const clampedDegrees = Math.max(-45, Math.min(45, degrees));
            guluHead.style.transform = `rotate(${clampedDegrees}deg)`;
        });
    }

    // --- 点击星空/咕噜 ---
    interactionScene.addEventListener('click', (e) => {
        if (guluCat && guluCat.contains(e.target)) { // 点击咕噜
            for (let i = 0; i < 20; i++) createHeart(e.clientX, e.clientY);
        } else { // 点击天空
            createConstellation(e.clientX, e.clientY);
        }
    });

    function createHeart(x, y) {
        const heart = document.createElement('div');
        const heartSVG = `<svg viewBox="0 0 24 24" style="width: 100%; height: 100%; fill: ${['#e58a70', '#e9a38f', '#f0c2b6'][Math.floor(Math.random() * 3)]};"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>`;
        heart.innerHTML = heartSVG;
        heart.style.position = 'fixed';
        heart.style.left = `${x}px`;
        heart.style.top = `${y}px`;
        const size = 10 + Math.random() * 20;
        heart.style.width = `${size}px`;
        heart.style.height = `${size}px`;
        heart.style.pointerEvents = 'none';
        heart.style.opacity = 1;
        heart.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
        heart.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(heart);

        setTimeout(() => {
            const destinationX = (Math.random() - 0.5) * 300;
            const destinationY = (Math.random() - 0.5) * 300 - 150;
            const rotation = (Math.random() - 0.5) * 720;
            heart.style.transform = `translate(${destinationX}px, ${destinationY}px) rotate(${rotation}deg) scale(0)`;
            heart.style.opacity = '0';
        }, 10);

        setTimeout(() => heart.remove(), 1010);
    }
    
    function createConstellation(x, y) {
        // (省略，以保持核心代码简洁)
    }
    
    // --- 音乐控制 ---
    musicToggle.addEventListener('click', () => {
        if (bgm.paused) { bgm.play(); musicToggle.classList.add('playing'); } 
        else { bgm.pause(); musicToggle.classList.remove('playing'); }
    });

    // --- 生成星星 ---
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`; star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`; star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        starrySky.appendChild(star);
    }
});
