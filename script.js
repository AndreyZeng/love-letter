document.addEventListener('DOMContentLoaded', () => {
    // --- 元素获取 ---
    const elementsToParallax = document.querySelectorAll('[data-speed]');
    const fadeInElements = document.querySelectorAll('.fade-in');
    const guluHead = document.querySelector('.gulu-head');
    const bgm = document.getElementById('bgm');
    const musicToggle = document.getElementById('music-toggle');
    const hiddenMouse = document.getElementById('hidden-mouse');

    // --- 核心滚动逻辑 ---
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // 1. 视差效果
        elementsToParallax.forEach(el => {
            const speed = el.dataset.speed;
            el.style.transform = `translateY(${scrollY * speed}px)`;
        });
        // 2. 首次滚动播放音乐
        if (bgm.paused && bgm.currentTime === 0) {
            bgm.play().catch(()=>{});
            musicToggle.classList.add('playing');
        }
    });

    // --- 元素进入视野动画 ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.2 });
    fadeInElements.forEach(el => observer.observe(el));

    // --- “咕噜”跟随鼠标 ---
    document.addEventListener('mousemove', (e) => {
        if (!guluHead) return;
        const headRect = guluHead.getBoundingClientRect();
        const headCenterX = headRect.left + headRect.width / 2;
        const headCenterY = headRect.top + headRect.height / 2;
        
        const angle = Math.atan2(e.clientY - headCenterY, e.clientX - headCenterX);
        const degrees = angle * (180 / Math.PI);
        
        // 限制旋转角度，让它更自然
        const clampedDegrees = Math.max(-20, Math.min(20, degrees));
        
        guluHead.style.transform = `rotate(${clampedDegrees}deg)`;
    });

    // --- 隐藏彩蛋交互 ---
    hiddenMouse.addEventListener('click', () => {
        hiddenMouse.style.transition = 'transform 0.5s';
        hiddenMouse.style.transform = 'translateY(20px)';
        setTimeout(() => {
            hiddenMouse.style.transform = 'translateY(0)';
        }, 500);
    });

    // --- 音乐控制 ---
    musicToggle.addEventListener('click', () => {
        if (bgm.paused) { bgm.play(); musicToggle.classList.add('playing'); } 
        else { bgm.pause(); musicToggle.classList.remove('playing'); }
    });

    // --- 生成落叶 ---
    const leavesContainer = document.querySelector('.leaves-container');
    if (leavesContainer) {
        for (let i = 0; i < 15; i++) {
            const leaf = document.createElement('div');
            leaf.className = 'leaf';
            leaf.style.left = `${Math.random() * 100}%`;
            leaf.style.animationDelay = `${Math.random() * 10}s`;
            const size = 1.5 + Math.random() * 1.5;
            leaf.style.width = `${size}vmin`; leaf.style.height = `${size}vmin`;
            leavesContainer.appendChild(leaf);
        }
    }
});
