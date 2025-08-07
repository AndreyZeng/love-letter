document.addEventListener('DOMContentLoaded', () => {
    // --- 元素获取 ---
    const envelopeCurtain = document.getElementById('envelope-curtain');
    const dioramaContainer = document.querySelector('.diorama-container');
    const diorama = document.querySelector('.diorama-box');
    const cat1 = document.getElementById('cat1');
    const guluCat = document.getElementById('gulu-cat');
    const tooltip = document.getElementById('cat-tooltip');
    const leavesContainer = document.querySelector('.layer-leaves');
    const bgm = document.getElementById('bgm');
    const musicToggle = document.getElementById('music-toggle');
    
    // --- 开幕逻辑 ---
    envelopeCurtain.addEventListener('click', () => {
        envelopeCurtain.classList.add('opened');
        bgm.play().catch(() => {});
        musicToggle.classList.add('visible', 'playing');
        
        setTimeout(() => {
            envelopeCurtain.style.opacity = '0';
            dioramaContainer.classList.remove('hidden');
            setTimeout(() => dioramaContainer.classList.add('visible'), 50);
        }, 1000); // 等待信封打开动画

        setTimeout(() => envelopeCurtain.classList.add('hidden'), 2000);
        initialize3D();
    }, { once: true });

    // --- 3D 交互初始化 ---
    function initialize3D() { /* ... (3D交互代码, 保持不变) ... */ }
    function handleMove(x, y) { /* ... */ }
    function handleOrientation(e) { /* ... */ }

    // --- 猫咪交互 ---
    cat1.addEventListener('click', (e) => {
        e.stopPropagation();
        showTooltip(cat1, "喵~");
    });
    guluCat.addEventListener('click', (e) => {
        e.stopPropagation();
        for (let i = 0; i < 20; i++) createHeart(e.clientX, e.clientY);
    });

    function showTooltip(target, message) { /* ... (提示框代码, 保持不变) ... */ }
    function createHeart(x, y) { /* ... (爱心粒子代码, 保持不变) ... */ }

    // --- 音乐控制 ---
    musicToggle.addEventListener('click', () => {
        if (bgm.paused) { bgm.play(); musicToggle.classList.add('playing'); } 
        else { bgm.pause(); musicToggle.classList.remove('playing'); }
    });

    // --- 生成落叶 ---
    for (let i = 0; i < 20; i++) { /* ... (落叶代码, 保持不变) ... */ }

    // 把一些函数的具体实现补全
    function initialize3D() {
        document.addEventListener('mousemove', e => handleMove(e.clientX, e.clientY));
        if (window.DeviceOrientationEvent) {
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission()
                .then(state => { if (state === 'granted') window.addEventListener('deviceorientation', handleOrientation); })
                .catch(console.error);
            } else {
                window.addEventListener('deviceorientation', handleOrientation);
            }
        }
    }
    function handleMove(x, y) {
        const { clientWidth, clientHeight } = document.documentElement;
        const rotY = 15 * ((x - clientWidth / 2) / (clientWidth / 2));
        const rotX = -15 * ((y - clientHeight / 2) / (clientHeight / 2));
        diorama.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }
    function handleOrientation(e) {
        const rotY = e.gamma * 0.5;
        const rotX = (e.beta - 45) * 0.5;
        diorama.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }
    function showTooltip(target, message) {
        const rect = target.getBoundingClientRect();
        tooltip.textContent = message;
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top - 10}px`;
        tooltip.style.transform = 'translate(-50%, -100%)';
        tooltip.classList.remove('hidden');
        setTimeout(() => tooltip.classList.add('hidden'), 2000);
    }
    function createHeart(x, y) {
        const heartSVG = `<svg viewBox="0 0 24 24" style="width: 100%; height: 100%; fill: ${['#e58a70', '#e9a38f', '#f0c2b6'][Math.floor(Math.random() * 3)]};"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>`;
        const heart = document.createElement('div');
        heart.innerHTML = heartSVG;
        heart.style.position = 'fixed'; heart.style.left = `${x}px`; heart.style.top = `${y}px`;
        const size = 10 + Math.random() * 20;
        heart.style.width = `${size}px`; heart.style.height = `${size}px`;
        heart.style.pointerEvents = 'none'; heart.style.opacity = 1;
        heart.style.transition = 'transform 1s ease-out, opacity 1s ease-out';
        heart.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(heart);
        setTimeout(() => {
            const destX = (Math.random() - 0.5) * 300;
            const destY = (Math.random() - 0.5) * 300 - 150;
            heart.style.transform = `translate(${destX}px, ${destY}px) rotate(${(Math.random() - 0.5) * 720}deg) scale(0)`;
            heart.style.opacity = '0';
        }, 10);
        setTimeout(() => heart.remove(), 1010);
    }
    for (let i = 0; i < 20; i++) {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        leaf.style.left = `${Math.random() * 100}%`;
        leaf.style.top = `${Math.random() * 100}%`;
        const duration = 5 + Math.random() * 5;
        leaf.style.animationDuration = `${duration}s`;
        leaf.style.animationDelay = `${Math.random() * duration}s`;
        leavesContainer.appendChild(leaf);
    }
});
