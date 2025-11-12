const dashboard = {
    points: 120,
    date: new Date(),
    stats: [
        { label: "Bài tập đã hoàn thành", value: 35, chip: "🗂️" },
        { label: "Ngày liên tiếp", value: 12, chip: "🔥" },
        { label: "Cảm xúc đã học", value: 8, chip: "😊" },
        { label: "Phần thưởng đã nhận", value: 15, chip: "🎁" },
    ],
    modules: [
        {
            icon: "😊",
            title: "Nhận diện Cảm xúc",
            subtitle: "12 bài tập · 15 phút",
            progress: 0.6,
            isNew: false,
        },
        {
            icon: "😲",
            title: "Biểu đạt Cảm xúc",
            subtitle: "8 bài tập · 10 phút",
            progress: 0.4,
            isNew: true,
        },
        {
            icon: "📘",
            title: "Truyện Cảm xúc",
            subtitle: "5 câu chuyện · 20 phút",
            progress: 0.75,
            isNew: false,
        },
        {
            icon: "🎮",
            title: "Trò chơi Tương tác",
            subtitle: "Mini game luyện giao tiếp",
            progress: 0.25,
            isNew: false,
        },
        {
            icon: "🎁",
            title: "Kho phần thưởng",
            subtitle: "Mở quà khi hoàn thành mục tiêu",
            progress: 0.9,
            isNew: false,
        },
        {
            icon: "📝",
            title: "Bài tập Hằng ngày",
            subtitle: "Kế hoạch theo ngày",
            progress: 0.33,
            isNew: false,
        },
    ],
};

// ====== TIỆN ÍCH ĐỊNH DẠNG ======
const fmtDate = (d) => {
    return new Intl.DateTimeFormat("vi-VN", {
        weekday: "short", day: "2-digit", month: "2-digit", year: "numeric",
    }).format(d);
};

// ====== RENDER ======
function renderTopbar(){
    document.getElementById("points").textContent = dashboard.points;
    document.getElementById("today").textContent = fmtDate(dashboard.date);
}

function renderStats(){
    const root = document.getElementById("stats");
    root.innerHTML = dashboard.stats.map(s => `
    <div class="stat">
      <div class="label">${s.label}</div>
      <div class="value">${s.value}<span class="chip">${s.chip}</span></div>
    </div>
  `).join("");
}

function renderModules(){
    const root = document.getElementById("modules");
    root.innerHTML = dashboard.modules.map(m => {
        const pct = Math.round(m.progress * 100);
        return `
      <article class="card">
        <div class="head">
          <div class="icon-xl">${m.icon}</div>
          <div class="title-row">
            <h3>${m.title}</h3>
          </div>
          ${m.isNew ? '<span class="badge-new">Mới</span>' : ''}
        </div>
        <div class="small">${m.subtitle}</div>
        <div class="progress" aria-label="Tiến độ ${pct}%">
          <div style="width:${pct}%"></div>
        </div>
        <div class="footer-row">
          <span>${pct}% hoàn thành</span>
          <button class="btn-start" aria-label="Bắt đầu ${m.title}">Bắt đầu</button>
        </div>
      </article>
    `;
    }).join("");

    // Gắn sự kiện demo cho nút "Bắt đầu"
    root.querySelectorAll('.btn-start').forEach((btn, i) => {
        btn.addEventListener('click', () => {
            alert(`Mở: ${dashboard.modules[i].title}`);
        });
    });
}

// ====== KHỞI TẠO ======
window.addEventListener('DOMContentLoaded', () => {
    renderTopbar();
    renderStats();
    renderModules();
});
