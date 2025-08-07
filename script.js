document.addEventListener('DOMContentLoaded', () => {
    // --- 元素获取 ---
    const curtain = document.getElementById('curtain');
    const startButton = document.getElementById('start-button');
    const dioramaContainer = document.querySelector('.diorama-container');
    const diorama = document.querySelector('.diorama-box');
    const cat1 = document.getElementById('cat1');
    const guluCat = document.getElementById('gulu-cat');
    const starrySky = document.getElementById('starry-sky');
    const leavesContainer = document.querySelector('.layer-leaves');
    const wishTextEl = document.getElementById('wish-text');
    const bgm = document.getElementById('bgm');
    const musicToggle = document.getElementById('music-toggle');
    
    // --- 开幕逻辑 ---
    startButton.addEventListener('click', () => {
        curtain.style.opacity = '0';
        bgm.play().catch(() => {});
        musicToggle.classList.add('visible', 'playing');
        
        setTimeout(() => {
            curtain.classList.add('hidden');
            dioramaContainer.classList.remove('hidden');
            setTimeout(() => dioramaContainer.classList.add('visible'), 50);
        }, 1500);

        initialize3D();
        createLeaves(25);
        
        const fullWishText = "希望你健健康康，每天开开心心的，\n我会一直陪着你。";
        typeWriter(fullWishText, wishTextEl, 0);
        
    }, { once: true });

    // --- 3D 交互 ---
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

    // --- 核心修改：分离两只猫的点击事件 ---

    // 左猫(cat1)：显示对话框 + 触发爱心
    cat1.addEventListener('click', (event) => {
        event.stopPropagation();
        showCatDialogue('主人，我也想你了~'); // 调用新函数显示对话
        createClickHeart(event.clientX, event.clientY); // 同时触发爱心
    });

    // 右猫(guluCat)：仅触发爱心
    guluCat.addEventListener('click', (event) => {
        event.stopPropagation();
        createClickHeart(event.clientX, event.clientY);
    });

    // --- 新增：显示猫咪对话框的函数 ---
    function showCatDialogue(text) {
        // 先移除可能已存在的对话框，防止重复
        const existingDialogue = cat1.querySelector('.cat-dialogue');
        if (existingDialogue) {
            existingDialogue.remove();
        }

        const dialogue = document.createElement('div');
        dialogue.className = 'cat-dialogue';
        dialogue.textContent = text;
        
        cat1.appendChild(dialogue); // 将对话框添加到猫咪的HTML元素中

        // 动画时长为3秒，结束后自动移除对话框
        setTimeout(() => {
            dialogue.remove();
        }, 3000);
    }

    // --- 爱心粒子效果 ---
    function createClickHeart(x, y) {
        const heartColors = ['#f2a699', '#e89f71', '#d4ac6e'];
        const randomColor = heartColors[Math.floor(Math.random() * heartColors.length)];
        const heartSVG = `<svg viewBox="0 0 24 24" style="width: 100%; height: 100%; fill: ${randomColor};"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>`;
        
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
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
                const destX = (Math.random() - 0.5) * 300; 
                const destY = (Math.random() - 0.5) * 300 - 150; 
                heart.style.transform = `translate(${destX}px, ${destY}px) rotate(${(Math.random() - 0.5) * 720}deg) scale(0)`; 
                heart.style.opacity = '0'; 
            }, 10);
            setTimeout(() => heart.remove(), 1010);
        }
    }
    
    // --- 打字机效果 ---
    function typeWriter(text, element, i = 0) {
        if (!element) return;
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1).replace(/\n/g, '<br>');
            setTimeout(() => typeWriter(text, element, i + 1), 200);
        } else {
            element.style.borderRight = 'none';
        }
    }
    
    // --- 音乐控制 ---
    musicToggle.addEventListener('click', () => { 
        if (bgm.paused) { 
            bgm.play(); 
            musicToggle.classList.add('playing'); 
        } else { 
            bgm.pause(); 
            musicToggle.classList.remove('playing'); 
        } 
    });

    // --- 生成星星 ---
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`; star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`; star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${2 + Math.random() * 3}s`;
        starrySky.appendChild(star);
    }

    // --- 生成落叶 ---
    function createLeaves(count) {
        if (!leavesContainer) return;
        for (let i = 0; i < count; i++) {
            const leaf = document.createElement('div');
            const style = Math.ceil(Math.random() * 3);
            const duration = Math.random() * 8 + 10;
            const delay = Math.random() * 15;
            const sway = Math.random() * 2 - 1;

            leaf.className = `leaf style${style}`;
            leaf.style.left = `${Math.random() * 100}%`;
            leaf.style.animationDuration = `${duration}s`;
            leaf.style.animationDelay = `${delay}s`;
            leaf.style.setProperty('--sway', sway);
            
            leavesContainer.appendChild(leaf);
        }
    }
});
