document.addEventListener('DOMContentLoaded', () => {
    // --- 元素获取 ---
    const curtain = document.getElementById('curtain');
    const startButton = document.getElementById('start-button');
    const diorama = document.getElementById('diorama-container');
    const bgm = document.getElementById('bgm');
    const musicToggle = document.getElementById('music-toggle');
    const starrySky = document.getElementById('starry-sky');

    // --- 开幕逻辑 (极简化) ---
    startButton.addEventListener('click', () => {
        // 1. 播放音乐
        bgm.play().catch(e => console.error("音乐播放失败:", e));
        musicToggle.classList.add('playing');
        
        // 2. 隐藏幕布
        curtain.style.opacity = '0';
        setTimeout(() => curtain.classList.add('hidden'), 1500);

        // 3. 显示主场景
        diorama.classList.remove('hidden');
        setTimeout(() => diorama.classList.add('visible'), 100);

        // 4. 显示音乐开关
        musicToggle.classList.remove('hidden');
        setTimeout(() => musicToggle.classList.add('visible'), 500);

    }, { once: true });
    
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
    if (starrySky) {
        for (let i = 0; i < 150; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 5}s`;
            star.style.animationDuration = `${2 + Math.random() * 3}s`;
            starrySky.appendChild(star);
        }
    }
});
