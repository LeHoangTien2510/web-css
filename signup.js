// Toggle chế độ ít kích thích
const ls = document.getElementById('ls1');
ls.addEventListener('change', ()=>{
    document.body.classList.toggle('low-stimulus', ls.checked);
    applyLowStimulus();
});

// Gentle validation messages
const form = document.getElementById('signupForm');
const err = document.getElementById('error');
form.addEventListener('submit', (e)=>{
    err.style.display='none'; err.textContent='';
    const pw = form.password.value.trim();
    if(pw.length < 6){
        e.preventDefault();
        err.textContent = 'Hãy dùng mật khẩu từ 6 ký tự trở lên. Bạn làm tốt lắm—chỉ cần thêm một chút nữa thôi!';
        err.style.display = 'block'; return;
    }
    if(!form.accept.checked){
        e.preventDefault();
        err.textContent = 'Vui lòng đồng ý điều khoản để tiếp tục.';
        err.style.display='block'; return;
    }
    e.preventDefault();
    alert('Đăng ký (mẫu). Kết nối API backend để lưu tài khoản.');
    window.location.href = 'home.html';
});

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