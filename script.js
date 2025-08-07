document.addEventListener('DOMContentLoaded', () => {
    // --- 元素获取 ---
    const envelopeCurtain = document.getElementById('envelope-curtain');
    const dioramaContainer = document.querySelector('.diorama-container');
    const diorama = document.querySelector('.diorama-box');
    const cat1 = document.getElementById('cat1');
    const guluCat = document.getElementById('gulu-cat');
    const starrySky = document.getElementById('starry-sky');
    const wishTextEl = document.getElementById('wish-text');
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
        }, 1000);

        setTimeout(() => envelopeCurtain.classList.add('hidden'), 2000);
        initialize3D();
        
        // 开启后，开始打印祝福语
        const fullWishText = "希望你健健康康，每天开开心心的，\n我会一直陪着你。";
        typeWriter(fullWishText, wishTextEl);
        
    }, { once: true });

    // --- 3D 交互 ---
    function initialize3D() { /* ... (3D交互代码, 保持不变) ... */ }
    function handleMove(x, y) { /* ... */ }
    function handleOrientation(e) { /* ... */ }

    // --- 猫咪交互 ---
    cat1.addEventListener('mouseenter', () => { // 悬停触发
        for (let i = 0; i < 3; i++) {
            createHoverHeart(cat1);
        }
    });
    guluCat.addEventListener('click', (e) => { // 点击触发
        e.stopPropagation();
        for (let i = 0; i < 20; i++) createClickHeart(e.clientX, e.clientY);
    });

    function createHoverHeart(target) { /* ... (悬停爱心代码) ... */ }
    function createClickHeart(x, y) { /* ... (点击爱心代码, 保持不变) ... */ }
    
    // --- 打字机效果 ---
    function typeWriter(text, element, i = 0) {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1).replace(/\n/g, '<br>');
            setTimeout(() => typeWriter(text, element, i + 1), 150); // 调整打字速度
        } else {
            element.style.borderRight = 'none'; // 移除光标
        }
    }
    
    // --- 音乐控制 ---
    musicToggle.addEventListener('click', () => { /* ... */ });

    // --- 生成星星 ---
    for (let i = 0; i < 100; i++) { /* ... */ }
    
    // 把一些函数的具体实现补全
    function initialize3D() {
        document.addEventListener('mousemove', e => handleMove(e.clientX, e.clientY));
        if (window.DeviceOrientationEvent) {
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission().then(state => { if (state === 'granted') window.addEventListener('deviceorientation', handleOrientation); }).catch(console.error);
            } else { window.addEventListener('deviceorientation', handleOrientation); }
        }
    }
    function handleMove(x, y) { const { clientWidth, clientHeight } = document.documentElement; const rotY = 15 * ((x - clientWidth / 2) / (clientWidth / 2)); const rotX = -15 * ((y - clientHeight / 2) / (clientHeight / 2)); diorama.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`; }
    function handleOrientation(e) { const rotY = e.gamma * 0.5; const rotX = (e.beta - 45) * 0.5; diorama.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`; }
    
    function createHoverHeart(target) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤';
        heart.style.position = 'absolute';
        heart.style.color = 'rgba(229, 138, 112, 0.7)';
        heart.style.fontSize = `${10 + Math.random() * 10}px`;
        heart.style.left = `${Math.random() * 80}%`;
        heart.style.top = `${Math.random() * 80}%`;
        heart.style.animation = `floatUp 2s ease-out forwards`;
        target.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    }
    
    function createClickHeart(x, y) {
        const heartSVG = `<svg viewBox="0 0 24 24" style="width: 100%; height: 100%; fill: ${['#e58a70', '#e9a38f', '#f0c2b6'][Math.floor(Math.random() * 3)]};"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>`;
        const heart = document.createElement('div');
        heart.innerHTML = heartSVG;
        heart.style.position = 'fixed'; heart.style.left = `${x}px`; heart.style.top = `${y}px`;
        const size = 10 + Math.random() * 20;
        heart.style.width = `${size}px`; heart.style.height = `${size}px`;
        heart.style
