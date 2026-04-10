export function renderTopbar(title) {
    const topbar = document.querySelector('.topbar');
    if (!topbar) return;

    topbar.innerHTML = `
        <h2 class="m-0">${title}</h2>
        <div class="d-flex align-items-center gap-3">
            <div class="text-end">
                <p class="m-0" id="clockNow">00:00:00</p>
                <p class="m-0" id="dateNow">Đang cập nhật...</p>
            </div>
            <img class="avatar-circle" src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?auto=format&fit=crop&w=120&q=60" alt="Avatar" />
        </div>
    `;
}
