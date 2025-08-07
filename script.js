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

    function createHeart(x, y) { /* ... (粒子特效代码, 保持不变) ... */ }
    
    function createConstellation(x, y) {
        const line = document.createElement('div');
        line.style.position = 'fixed';
        line.style.left = `${x}px`;
        line.style.top = `${y}px`;
        line.style.width = '100px';
        line.style.height = '1px';
        line.style.background = 'rgba(255,255,255,0.5)';
        line.style.transformOrigin = '0 0';
        line.style.transform = `rotate(${Math.random() * 360}deg)`;
        line.style.transition = 'all 1.5s';
        document.body.appendChild(line);
        setTimeout(() => { line.style.opacity = '0'; line.style.transform += ' scale(2)'; }, 100);
        setTimeout(() => line.remove(), 1600);
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
