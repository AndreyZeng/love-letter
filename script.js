document.addEventListener('DOMContentLoaded', () => {
    // --- 元素获取 ---
    const parallaxBG = document.querySelector('.parallax-bg');
    const parallaxFG = document.querySelector('.parallax-fg');
    const cats = document.querySelectorAll('.cat');
    const tooltip = document.getElementById('cat-tooltip');
    const bgm = document.getElementById('bgm');
    const musicToggle = document.getElementById('music-toggle');
    const fadeInElements = document.querySelectorAll('.fade-in');

    // --- 视差滚动逻辑 ---
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // 移动背景和前景
        if (parallaxBG) {
            const bgSpeed = parallaxBG.dataset.speed;
            parallaxBG.style.transform = `translateY(${scrollY * bgSpeed}px)`;
        }
        if (parallaxFG) {
            const fgSpeed = parallaxFG.dataset.speed;
            parallaxFG.style.transform = `translateY(${scrollY * fgSpeed}px)`;
        }
        
        // 第一次滚动时播放音乐
        if (bgm.paused && bgm.currentTime === 0) {
            bgm.play().catch(()=>{});
            musicToggle.classList.add('playing');
        }
    });

    // --- Intersection Observer 逻辑 (元素进入视野时添加动画类) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1 // 元素进入10%时触发
    });
    fadeInElements.forEach(el => observer.observe(el));
    
    // --- 猫咪交互 ---
    cats.forEach(cat => {
        cat.addEventListener('click', (e) => {
            e.stopPropagation();
            const message = cat.dataset.message;
            const rect = cat.getBoundingClientRect();

            tooltip.textContent = message;
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            tooltip.classList.remove('hidden');

            setTimeout(() => tooltip.classList.add('hidden'), 3000);
        });
    });

    // --- 音乐控制 ---
    musicToggle.addEventListener('click', () => {
        if (bgm.paused) { bgm.play(); musicToggle.classList.add('playing'); } 
        else { bgm.pause(); musicToggle.classList.remove('playing'); }
    });

    // --- 生成落叶 ---
    const leavesContainer = document.querySelector('.leaves-container');
    if(leavesContainer) {
        for (let i = 0; i < 20; i++) {
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
