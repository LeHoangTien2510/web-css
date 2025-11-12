// Toggle chế độ ít kích thích
const ls = document.getElementById('ls3');
ls.addEventListener('change', ()=>{
    document.body.classList.toggle('low-stimulus', ls.checked);
    applyLowStimulus();
});

// Xử lý camera input và AI demo
const input = document.getElementById('cameraInput');
const btn = document.getElementById('analyzeBtn');
const out = document.getElementById('aiResult');

input.addEventListener('change', ()=>{
    btn.disabled = !input.files.length;
    out.textContent = input.files.length ? 'Đã chọn ảnh. Nhấn "Đánh giá bằng AI (mẫu)".' : '';
});

btn.addEventListener('click', async ()=>{
    out.textContent = 'Đang phân tích ảnh (mẫu)...';
    await new Promise(r => setTimeout(r, 900));
    const mock = ['Vui', 'Buồn', 'Lo lắng', 'Bình tĩnh', 'Ngạc nhiên'];
    const guess = mock[Math.floor(Math.random()*mock.length)];
    out.innerHTML = 'Gợi ý của AI (mẫu): <strong>' + guess + '</strong>. Bạn có thể xác nhận cảm xúc thật của bé.';
});

async function analyzeImage(file){
    // const form = new FormData();
    // form.append('image', file);
    // const res = await fetch('YOUR_AI_ENDPOINT', { method: 'POST', body: form });
    // return await res.json();
}

// Khởi tạo tuyết rơi nhẹ
const rootSnow = document.getElementById('snow');
const prefersReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initSnow(){
    if(!rootSnow) return;
    const count = prefersReduce ? 12 : 24;
    // Dọn cũ (nếu reload)
    rootSnow.innerHTML = '';
    for(let i=0;i<count;i++){
        const f = document.createElement('i');
        f.className = 'snowflake';
        const startLeft = Math.random()*100;             // %
        const drift = (Math.random()*40 - 20) + 'vw';    // trôi ngang
        const delay = (Math.random()*8).toFixed(2)+'s';
        const dur = (10 + Math.random()*8).toFixed(2)+'s';
        const size = (Math.random()*10 + 20);            // Tăng size: 20-60px để to và rõ nét hơn

        f.style.left = startLeft + 'vw';
        f.style.setProperty('--x', drift);
        f.style.setProperty('--delay', delay);
        f.style.setProperty('--dur', dur);
        f.style.width = size + 'px';
        f.style.height = size + 'px';
        f.style.opacity = (0.8 + Math.random()*0.2).toFixed(2);  // Tăng opacity min lên 0.8 để rõ nét hơn

        rootSnow.appendChild(f);
    }
}

function applyLowStimulus(){
    if(!rootSnow) return;
    if(document.body.classList.contains('low-stimulus')){
        rootSnow.setAttribute('hidden','');
    } else {
        rootSnow.removeAttribute('hidden');
    }
}

initSnow();
applyLowStimulus();