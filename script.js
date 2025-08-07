document.addEventListener('DOMContentLoaded', () => {
    // --- 元素获取 ---
    const curtain = document.getElementById('curtain');
    const startButton = document.getElementById('start-button');
    const storybook = document.getElementById('storybook');
    const bgm = document.getElementById('bgm');
    const musicToggle = document.getElementById('music-toggle');

    // --- 开幕逻辑 ---
    startButton.addEventListener('click', () => {
        // 1. 播放音乐
        bgm.play().catch(e => console.error("Autoplay failed:", e));
        musicToggle.classList.add('playing');

        // 2. 隐藏幕布
        curtain.style.opacity = '0';
        setTimeout(() => curtain.classList.add('hidden'), 1500);

        // 3. 显示故事书
        storybook.classList.remove('hidden');
        document.body.style.overflow = 'auto'; // 恢复页面滚动
        setTimeout(() => storybook.classList.add('visible'), 100);

        // 4. 显示音乐开关
        musicToggle.classList.remove('hidden');
    }, { once: true });

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
