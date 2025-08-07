// 大师级互动脚本
document.addEventListener('DOMContentLoaded', () => {
  // -- 元素获取 --
  const curtain = document.getElementById('curtain');
  const startButton = document.getElementById('start-button');
  const storybook = document.getElementById('storybook');
  const bgm = document.getElementById('bgm');
  const musicToggle = document.getElementById('music-toggle');
  const fadeInElements = document.querySelectorAll('.fade-in');

  // -- 开幕 --
  startButton.addEventListener('click', () => {
    try{bgm.play();}catch(e){}
    setTimeout(()=>curtain.classList.add('hidden'), 1400);
    curtain.style.opacity = '0';
    storybook.classList.remove('hidden');
    document.body.style.overflow = 'auto';
    setTimeout(()=>storybook.classList.add('visible'),50);
    musicToggle.classList.remove('hidden');
    musicToggle.classList.add('playing');
  }, { once:true });

  // -- 渐显/滚动进入 --
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('is-visible');
    });
  },{ threshold: .36 });
  fadeInElements.forEach(el=>observer.observe(el));

  // -- 音乐控制 --
  musicToggle.addEventListener('click', ()=>{
    if(bgm.paused){ bgm.play(); musicToggle.classList.add('playing'); }
    else{ bgm.pause(); musicToggle.classList.remove('playing'); }
  });

  // ========== 浅3D动态背景 =
  // 背景 Canvas 层：多重Ken Burns+微光波动
  {
    const bgCanvas = document.getElementById('bg-canvas');
    const ctx = bgCanvas.getContext('2d');
    let bgImg = new window.Image();
    bgImg.src = "https://images.pexels.com/photos/236047/pexels-photo-236047.jpeg?auto=compress&q=80&w=1600"; // 优雅室内+光
    const drawBG = ()=>{
      let w = window.innerWidth, h = window.innerHeight;
      bgCanvas.width = w; bgCanvas.height = h;
      // 多层ken burns
      let t = Date.now()/23000;
      let scale = 1.08+0.03*Math.sin(t*2);
      let dx = (w-bgImg.width*scale)/2 + Math.sin(t/2)*16;
      let dy = (h-bgImg.height*scale)/3.5 + Math.cos(t/1.3)*10;
      ctx.globalAlpha = .97; ctx.clearRect(0,0,w,h);
      ctx.filter = "blur(0.9px) brightness(1.045)"; 
      if(bgImg.complete)
        ctx.drawImage(bgImg, dx, dy, bgImg.width*scale, bgImg.height*scale);
      ctx.filter = "blur(0px)";
      // 动态光斑
      for(let i=0;i<3;i++){
        ctx.save();
        ctx.globalAlpha = 0.08 + 0.07*Math.abs(Math.sin(t*(.88+i*.7)));
        ctx.translate(w/2, h/2);
        ctx.rotate( Math.sin(t+i*2)*0.04 );
        ctx.beginPath();
        ctx.arc(0,0, w*(.28+.13*i+Math.sin(t+i)*.02), 0,2*Math.PI);
        ctx.fillStyle = i%2?"#ffe7b9":"#fdd6c2";
        ctx.fill();
        ctx.restore();
      }
    };
    bgImg.onload = ()=>{ drawBG(); };
    setInterval(drawBG, 46);
    window.addEventListener('resize', drawBG);
  }
  // =========== 真实3D叶片效果 ===========
  {
    const leafShapes = [
      // 3种leaf SVG path
      'M10 10 Q 18 2, 28 12 Q38 25 25 35 Q12 48 8 30 Q4 18 10 10 Z',
      'M14 6 Q24 -2 32 10 Q40 20 25 29 Q10 36 9 19 Q8 9 14 6 Z',
      'M12 13 Q18 3 28 14 Q38 23 23 33 Q8 45 10 28 Q11 19 12 13 Z',
    ];
    const leafColors = [
      "#eac298","#e39651","#f5dc9b","#c2762f","#f7be7d","#bba88e","#eed7a5","#efa585"
    ];
    const leavesCan = document.getElementById('leaves-canvas');
    leavesCan.width = window.innerWidth;
    leavesCan.height = window.innerHeight;
    const ctx2 = leavesCan.getContext('2d');
    let winW = window.innerWidth, winH = window.innerHeight;
    let leaves = [];
    function resetLeaves(){
      winW = window.innerWidth; winH = window.innerHeight;
      leaves = [];
      for(let i=0;i<45;i++){
        const type = Math.floor(Math.random()*leafShapes.length);
        const size = 22+Math.random()*48;
        leaves.push({
          type, size, 
          x: Math.random()*winW,
          y: -Math.random()*winH,
          z: .85 + Math.random()*0.68,
          vy: 1.6+Math.random()*1.5,
          rot: Math.random()*Math.PI*2,
          rotSpeed: (Math.random()-.5)*.028,
          color: leafColors[Math.floor(Math.random()*leafColors.length)],
          alpha: .7+.25*Math.random(),
        });
      }
    }
    function drawLeaf(leaf,shape){
      ctx2.save();
      ctx2.globalAlpha = leaf.alpha * (leaf.z<1.1?.92:1);
      ctx2.translate(leaf.x, leaf.y);
      ctx2.scale(leaf.z, leaf.z* (1 + 0.2*Math.sin(Date.now()/210+leaf.x)));
      ctx2.rotate(leaf.rot);
      ctx2.shadowBlur = 10*leaf.z;
      ctx2.shadowColor = "#cf8f3baf";
      ctx2.beginPath();
      new Path2D(shape).path.forEach(seg=>ctx2.lineTo(seg[0],seg[1]));
      ctx2.fillStyle = leaf.color;
      ctx2.arc(0,leaf.size/2, leaf.size/4, 0,2*Math.PI); // 叶脉部高亮
      ctx2.fill();
      ctx2.restore();
    }
    function leafPathFromSVG(svgd){
      // 轻量SVG path to array
      let matches = svgd.match(/[MLQZ][^MLQZ]*/g)
      const arr = [];
      let pos = [0,0];
      for(const m of matches){
        let cmd=m[0], nums = m.slice(1).trim().split(/[\s,]+/).map(Number);
        if(cmd==='M') pos=[nums[0],nums[1]], arr.push([pos[0],pos[1]]);
        if(cmd==='Q') {/*略*/} /*省略细分，可画大致*/
        if(cmd==='L') arr.push([nums[0],nums[1]]);
        if(cmd==='Z') arr.push(arr[0]);
      }
      return {path: arr};
    }
    let parsedShapes = leafShapes.map(leafPathFromSVG);
    function animateLeaves(){
      ctx2.clearRect(0,0,winW,winH);
      leaves.forEach(leaf=>{
        leaf.y += leaf.vy * leaf.z;
        leaf.x += Math.sin(leaf.y/60+leaf.type)*.95;
        // 风吹横摆
        leaf.rot += leaf.rotSpeed;
        if(leaf.y>winH+55){
          leaf.y = -22; leaf.x = Math.random()*winW; leaf.z = .85 + Math.random()*0.68;
        }
        drawLeaf(leaf, parsedShapes[leaf.type]);
      });
      requestAnimationFrame(animateLeaves);
    }
    resetLeaves();
    animateLeaves();
    window.addEventListener('resize', ()=>{
      leavesCan.width = window.innerWidth; leavesCan.height = window.innerHeight; resetLeaves();
    });
  }

  // ========== 猫咪互动 =============
  // 【1】活猫互动——眼珠、头、耳朵追随
  {
    const guluSvG = document.getElementById('gulu-svg');
    const guluHeadGroup = guluSvG ? guluSvG.querySelector('.gulu-head-group') : null;
    const guluEyesL = guluSvG ? guluSvG.querySelector('.eye-g.l') : null;
    const guluEyesR = guluSvG ? guluSvG.querySelector('.eye-g.r') : null;
    const guluBallL = guluSvG ? guluSvG.querySelector('.eye-gball.l') : null;
    const guluBallR = guluSvG ? guluSvG.querySelector('.eye-gball.r') : null;
    const guluEarL = guluSvG ? guluSvG.querySelector('.ear-g.l') : null;
    const guluEarR = guluSvG ? guluSvG.querySelector('.ear-g.r') : null;
    let lastAngle = 0;
    if(guluHeadGroup && guluEyesL && guluEyesR){
      document.addEventListener('mousemove', evt => {
        const rect = guluSvG.getBoundingClientRect();
        const cx = rect.left+rect.width/2, cy = rect.top+rect.height/5;
        const dx = evt.clientX-cx, dy=evt.clientY-cy;
        let angle = Math.atan2(dy,dx);
        let deg = Math.max(-28, Math.min(28, angle*180/Math.PI));
        guluHeadGroup.setAttribute('transform',`rotate(${deg*0.55})`);
        // 眼珠移动范围限制（独立+非线性）
        const eyeballX = Math.max(-2,Math.min(2,dx/35));
        const eyeballY = Math.max(-2,Math.min(2,dy/39));
        guluBallL && guluBallL.setAttribute('cx',41+eyeballX);
        guluBallR && guluBallR.setAttribute('cx',61+eyeballX);
        guluBallL && guluBallL.setAttribute('cy',45+eyeballY);
        guluBallR && guluBallR.setAttribute('cy',45+eyeballY);
        // 耳朵轻微动
        guluEarL && guluEarL.setAttribute('transform',`rotate(${deg*0.2} 32 24)`);
        guluEarR && guluEarR.setAttribute('transform',`rotate(${deg*0.2} 68 24)`);
        lastAngle=deg;
      });
      setInterval(()=>{
        // 偶尔眨眼
        if(Math.random()<.04){
          guluEyesL.setAttribute('ry',2.5);
          guluEyesR.setAttribute('ry',2.5);
          setTimeout(()=>{
            guluEyesL.setAttribute('ry',7);
            guluEyesR.setAttribute('ry',7);
          },205+Math.random()*120);
        }
      }, 180);
    }
  }
  // 【2】咕噜猫爱心粒子特效
  {
    const guluCat = document.getElementById('gulu-cat');
    const loveCanvas = guluCat? guluCat.querySelector('.love-canvas'):null;
    if(guluCat && loveCanvas){
      loveCanvas.width = guluCat.offsetWidth; loveCanvas.height = guluCat.offsetHeight;
      function createHearts(x,y){
        const hearts = [];
        for(let i=0;i<16;i++)
          hearts.push({
            x,y,r:14+Math.random()*8,
            dX: (Math.random()-.5)*2.8,
            dY: -1.5-Math.random()*1.8,
            alpha:1, t:0,
            color:`hsl(${Math.floor(12+Math.random()*23)},89%,${72+Math.random()*20}%)`
          });
        return hearts;
      }
      let particles=[];
      function render(){
        if(!loveCanvas.width) return requestAnimationFrame(render);
        const ctx = loveCanvas.getContext('2d');
        ctx.clearRect(0,0,loveCanvas.width,loveCanvas.height);
        for(let i=particles.length-1;i>=0;--i){
          const p = particles[i];
          p.x += p.dX; p.y += p.dY;
          p.t+=1; p.alpha-=.016+Math.random()*0.011;
          drawHeart(ctx,p.x,p.y,p.r,p.color,p.alpha);
          if(p.alpha<=0.02) particles.splice(i,1);
        }
        requestAnimationFrame(render);
      }
      render();
      guluCat.addEventListener('click',e=>{
        const rect = loveCanvas.getBoundingClientRect();
        const x=e.clientX-rect.left, y=e.clientY-rect.top;
        particles.push(...createHearts(x,y));
        // 金色小水波
        setTimeout(() => {
          for(let i=0;i<4;i++)
            particles.push({
              x, y, r:30+Math.random()*14,
              dX:(Math.random()-.5)*1.3, dY:(Math.random()-.5)*1.3,
              color:'#ffd88a',
              alpha:0.25, t:0
            });
        }, 145);
      });
      function drawHeart(ctx,x,y,r,color,alpha){ // bezier heart
        ctx.save();
        ctx.globalAlpha=alpha;
        ctx.translate(x,y); ctx.scale(r/18,r/18);
        ctx.beginPath();
        ctx.moveTo(0,-3);
        ctx.bezierCurveTo(-7,-14, -25,5, 0,18);
        ctx.bezierCurveTo(25,5, 7,-14, 0,-3);
        ctx.closePath();
        ctx.fillStyle=color; ctx.shadowColor=color; ctx.shadowBlur=11;
        ctx.fill();
        ctx.restore();
      }
      window.addEventListener('resize',()=>{
        loveCanvas.width = guluCat.offsetWidth; loveCanvas.height = guluCat.offsetHeight;
      });
    }
  }
  // 【3】“撸猫”满足与呼噜粒子气泡
  {
    const cat1 = document.getElementById('cat1');
    const purrSound = document.getElementById('purr-sound');
    const purrBubbleLayer = cat1 ? cat1.querySelector('.purr-bubble') : null;
    if(cat1 && purrBubbleLayer){
      cat1.addEventListener('mouseenter',()=>{
        // 满足眯眼
        const svg = document.getElementById('cat1-svg');
        const eyeL = svg.querySelector('.eye.left'), eyeR = svg.querySelector('.eye.right'), smile = svg.querySelector('.smile');
        eyeL.setAttribute('ry',4); eyeR.setAttribute('ry',4);
        smile.setAttribute('d','M38,54 Q45,61,52,54');
        // 呼噜气泡
        for(let i=0;i<3;i++) showBubble(svg,34+Math.random()*34, 22+Math.random()*25);
        purrSound && purrSound.play();
        svg.style.animation = 'purr .5s ease-in-out infinite';
      });
      cat1.addEventListener('mouseleave',()=>{
        // 还原表情
        const svg = document.getElementById('cat1-svg');
        const eyeL = svg.querySelector('.eye.left'), eyeR = svg.querySelector('.eye.right'), smile = svg.querySelector('.smile');
        eyeL.setAttribute('ry',6); eyeR.setAttribute('ry',6);
        smile.setAttribute('d','M38,54 Q45,58,52,54');
        svg.style.animation = '';
      });
      function showBubble(svg,cx,cy){
        const group = svg.querySelector('.head-group');
        const bubble = document.createElementNS("http://www.w3.org/2000/svg","ellipse");
        bubble.setAttribute('class','purr-bubble');
        bubble.setAttribute('cx',cx); bubble.setAttribute('cy',cy);
        bubble.setAttribute('rx','3.3'); bubble.setAttribute('ry','2');
        bubble.setAttribute('fill','#fff9b5');
        group.appendChild(bubble);
        setTimeout(()=>bubble.remove(), 1200+Math.random()*600);
      }
    }
  }
});
