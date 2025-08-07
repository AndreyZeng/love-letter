document.addEventListener('DOMContentLoaded', () => {
    // --- 元素获取 ---
    const diorama = document.querySelector('.diorama-box');
    const guluCat = document.getElementById('gulu-cat');
    const letterLayer = document.querySelector('.layer-letter');
    const initialPrompt = document.querySelector('.prompt-initial');
    const leavesContainer = document.querySelector('.layer-leaves');
    const bgm = document.getElementById('bgm');
    const musicToggle = document.getElementById('music-toggle');
    
    let isInitialized = false;

    // --- 3D 交互逻辑 ---
    function handleMove(x, y) {
        if (!isInitialized) return;
        const { clientWidth, clientHeight } = document.documentElement;
        const rotY = 15 * ((x - clientWidth / 2) / (clientWidth / 2));
        const rotX = -15 * ((y - clientHeight / 2) / (clientHeight / 2));
        diorama.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }

    // --- 初始点击事件 ---
    function initialize() {
        if (isInitialized) return;
        isInitialized = true;
        
        initialPrompt.style.display = 'none';
        diorama.style.transition = 'transform 0.1s ease-out';
        diorama.classList.add('initialized'); // 激活流光边框
        
        document.addEventListener('mousemove', e => handleMove(e.clientX, e.clientY));
        
        if (window.DeviceOrientationEvent) {
            // 请求陀螺仪权限 (兼容iOS 13+)
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                DeviceOrientationEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        window.addEventListener('deviceorientation', handleOrientation);
                    }
                }).catch(console.error);
            } else {
                window.addEventListener('deviceorientation', handleOrientation);
            }
        }
        
        bgm.play().catch(() => {});
        musicToggle.classList.add('visible', 'playing');
    }

    function handleOrientation(e) {
        const rotY = e.gamma * 0.5; // Left-to-right tilt
        const rotX = (e.beta - 45) * 0.5; // Front-to-back tilt
        diorama.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    }
    
    document.body.addEventListener('click', initialize, { once: true });

    // --- 咕噜点击事件 ---
    guluCat.addEventListener('click', (e) => {
        if (!isInitialized) return;
        e.stopPropagation();
        letterLayer.classList.toggle('visible');
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
