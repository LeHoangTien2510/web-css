// Toggle chế độ ít kích thích
const ls = document.getElementById('ls4');
ls.addEventListener('change', ()=>{
    document.body.classList.toggle('low-stimulus', ls.checked);
    applyLowStimulus();
});

// Cấu hình đáp án đúng
const CORRECT = 'happy';

const options = document.querySelectorAll('.option');
const feedback = document.getElementById('feedback');
let selected = null;

function selectOption(btn) {
    options.forEach(o => o.classList.remove('selected', 'color-purple', 'color-blue', 'color-red', 'color-amber'));
    btn.classList.add('selected', `color-${btn.dataset.color}`);
    selected = btn.dataset.id;

    const isCorrect = selected === CORRECT;
    feedback.className = 'feedback ' + (isCorrect ? 'feedback-correct' : 'feedback-incorrect');
    feedback.textContent = isCorrect
        ? `Đúng rồi! ✨ Là "${btn.querySelector('.label').textContent}".`
        : `Hãy thử lại! 💪 Đáp án đúng là "Vui".`;
}

options.forEach(btn => {
    btn.addEventListener('click', () => selectOption(btn));
    // Keyboard accessibility
    btn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectOption(btn); }
    });
});

document.getElementById('newImage').addEventListener('click', () => {
    options.forEach(o => o.classList.remove('selected', 'color-purple', 'color-blue', 'color-red', 'color-amber'));
    selected = null;
    feedback.className = 'feedback feedback-neutral';
    feedback.textContent = 'Chọn 1 đáp án để kiểm tra.';
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