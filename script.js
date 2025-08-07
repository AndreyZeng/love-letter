document.addEventListener('DOMContentLoaded', () => {
    // --- 元素获取 ---
    const envelopeCurtain = document.getElementById('envelope-curtain');
    const dioramaContainer = document.querySelector('.diorama-container');
    const diorama = document.querySelector('.diorama-box');
    const cat1 = document.getElementById('cat1');
    const guluCat = document.getElementById('gulu-cat');
    const starrySky = document.getElementById('starry-sky');
    const foregroundLeaves = document.querySelector('.layer-foreground-leaves');
    const wishTextEl = document.getElementById('wish-text');
    const tooltip = document.getElementById('cat-tooltip');
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
        
        const fullWishText = "希望你健健康康，每天开开心心的，\n我会一直陪着你。";
        typeWriter(fullWishText, wishTextEl);
        
    }, { once: true });

    // --- 3D 交互 ---
    function initialize3D() { /* ... (3D交互代码, 保持不变) ... */ }
    function handleMove(x, y) { /* ... */ }
    function handleOrientation(e) { /* ... */ }

    // --- 猫咪交互 (核心修复) ---
    cat1.addEventListener('click', (e) => {
        e.stopPropagation();
        // 触发CSS动画
        cat1.classList.add('purring');
        setTimeout(() => cat1.classList.remove('purring'), 800);
        // 显示提示气泡
        showTooltip(cat1, "喵~");
    });
    
    guluCat.addEventListener('click', (e) => {
        e.stopPropagation();
        for (let i = 0; i < 20; i++) createClickHeart(e.clientX, e.clientY);
    });

    function showTooltip(target, message) {
        const rect = target.getBoundingClientRect();
        tooltip.textContent = message;
        tooltip.style.left = `${rect.left + rect.width / 2}px`;
        tooltip.style.top = `${rect.top}px`;
        tooltip.style.transform = 'translate(-50%, -120%)';
        tooltip.classList.remove('hidden');
        setTimeout(() => tooltip.classList.add('hidden'), 1500);
    }
    
    function createClickHeart(x, y) { /* ... (爱心粒子代码, 保持不变) ... */ }
    
    // --- 打字机效果 ---
    function typeWriter(text, element, i = 0) { /* ... */ }
    
    // --- 音乐控制 ---
    musicToggle.addEventListener('click', () => { /* ... */ });

    // --- 生成星星和落叶 ---
    for (let i = 0; i < 150; i++) { createStar(); }
    for (let i = 0; i < 20; i++) { createLeaf(foregroundLeaves); } // 在前景生成落叶
    
    // 把一些函数的具体实现补全
    function initialize3D() { document.addEventListener('mousemove', e => handleMove(e.clientX, e.clientY)); if (window.DeviceOrientationEvent) { if (typeof DeviceOrientationEvent.requestPermission === 'function') { DeviceOrientationEvent.requestPermission().then(state => { if (state === 'granted') window.addEventListener('deviceorientation', handleOrientation); }).catch(console.error); } else { window.addEventListener('deviceorientation', handleOrientation); } } }
    function handleMove(x, y) { const { clientWidth, clientHeight } = document.documentElement; const rotY = 15 * ((x - clientWidth / 2) / (clientWidth / 2)); const rotX = -15 * ((y - clientHeight / 2) / (clientHeight / 2)); diorama.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`; }
    function handleOrientation(e) { const rotY = e.gamma * 0.5; const rotX = (e.beta - 45) * 0.5; diorama.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`; }
    function createClickHeart(x, y) { const heartSVG = `<svg viewBox="0 0 24 24" style="width: 100%; height: 100%; fill: ${['#e58a70', '#e9a38f', '#f0c2b6'][Math.floor(Math.random() * 3)]};"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>`; const heart = document.createElement('div'); heart.innerHTML = heartSVG; heart.style.position = 'fixed'; heart.style.left = `${x}px`; heart.style.top = `${y}px`; const size = 10 + Math.random() * 20; heart.style.width = `${size}px`; heart.style.height = `${size}px`; heart.style.pointerEvents = 'none'; heart.style.opacity = 1; heart.style.transition = 'transform 1s ease-out, opacity 1s ease-out'; heart.style.transform = 'translate(-50%, -50%)'; document.body.appendChild(heart); setTimeout(() => { const destX = (Math.random() - 0.5) * 300; const destY = (Math.random() - 0.5) * 300 - 150; heart.style.transform = `translate(${destX}px, ${destY}px) rotate(${(Math.random() - 0.5) * 720}deg) scale(0)`; heart.style.opacity = '0'; }, 10); setTimeout(() => heart.remove(), 1010); }
    function typeWriter(text, element, i = 0) { if (!element) return; if (i < text.length) { element.innerHTML = text.substring(0, i + 1).replace(/\n/g, '<br>'); setTimeout(() => typeWriter(text, element, i + 1), 200); } else { element.parentElement.style.borderRight = 'none'; } }
    musicToggle.addEventListener('click', () => { if (bgm.paused) { bgm.play(); musicToggle.classList.add('playing'); } else { bgm.pause(); musicToggle.classList.remove('playing'); } });
    function createStar() { const star = document.createElement('div'); star.className = 'star'; const size = Math.random() * 2 + 1; star.style.width = `${size}px`; star.style.height = `${size}px`; star.style.left = `${Math.random() * 100}%`; star.style.top = `${Math.random() * 100}%`; star.style.animationDelay = `${Math.random() * 5}s`; star.style.animationDuration = `${2 + Math.random() * 3}s`; starrySky.appendChild(star); }
    function createLeaf(container) { const leaf = document.createElement('div'); leaf.className = 'leaf'; const size = 2 + Math.random() * 2; leaf.style.width = `${size}vmin`; leaf.style.height = `${size}vmin`; leaf.style.left = `${Math.random() * 100}%`; leaf.style.animationDuration = `${8 + Math.random() * 8}s`; leaf.style.animationDelay = `${Math.random() * 10}s`; leaf.style.opacity = `${0.3 + Math.random() * 0.4}`; container.appendChild(leaf); }
});
