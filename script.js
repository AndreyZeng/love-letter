document.addEventListener('DOMContentLoaded', () => {
    // --- 元素获取 ---
    const curtain = document.getElementById('curtain');
    const startButton = document.getElementById('start-button');
    const dioramaContainer = document.querySelector('.diorama-container');
    const diorama = document.querySelector('.diorama-box');
    const letterLayer = document.querySelector('.layer-letter');
    const leavesContainer = document.querySelector('.layer-leaves');
    const bgm = document.getElementById('bgm');
    const musicToggle = document.getElementById('music-toggle');
    
    // --- 开幕逻辑 ---
    startButton.addEventListener('click', () => {
        // 1. 播放音乐
        bgm.play().catch(() => {});
        musicToggle.classList.add('visible', 'playing');
        
        // 2. 隐藏幕布，显示景箱
        curtain.style.opacity = '0';
        setTimeout(() => curtain.classList.add('hidden'), 1500);
        dioramaContainer.classList.remove('hidden');
        setTimeout(() => dioramaContainer.classList.add('visible'), 100);

        // 3. 开启3D交互
        initialize3D();

        // 4. 自动展示信件
        setTimeout(() => {
            letterLayer.classList.add('focused'); // 先聚焦
            setTimeout(() => {
                letterLayer.classList.remove('focused');
                letterLayer.classList.add('visible'); // 再回到半透明状态
            }, 4000); // 聚焦4秒
        }, 1500); // 等待景箱出现

    }, { once: true });

    // --- 3D 交互初始化 ---
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

    // --- 3D 交互处理 ---
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

    // --- 信件点击交互 ---
    letterLayer.addEventListener('click', () => {
        letterLayer.classList.toggle('focused');
        if(!letterLayer.classList.contains('focused')) {
            letterLayer.classList.add('visible');
        }
    });

    // --- 音乐控制 ---
    musicToggle.addEventListener('click', () => {
        if (bgm.paused) { bgm.play(); musicToggle.classList.add('playing'); } 
        else { bgm.pause(); musicToggle.classList.remove('playing'); }
    });

    // --- 生成落叶 ---
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
