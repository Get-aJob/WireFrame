async function loadTopbar(config) {
  try {
    const response = await fetch('../components/common/Topbar.html');
    const html = await response.text();
    const root = document.getElementById('topbar-root');

    if (root) {
      root.innerHTML = html;

      if (config.title) document.getElementById('topbar-title').textContent = config.title;
      if (config.badge) {
        const b = document.getElementById('topbar-badge');
        b.textContent = config.badge;
        b.style.display = 'inline-block';
      }

      if (config.showSearch) document.getElementById('topbar-search').style.display = 'flex';

      if (config.showAddButton) {
        const actions = document.getElementById('topbar-actions');
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.innerHTML = '＋ 공고 등록';
        btn.onclick = () => openJobModal();
        actions.appendChild(btn);
      }

      // 상시 모집 체크박스 로직
      const alwaysRecruitCheckbox = document.getElementById(
        'alwaysRecruitCheckbox',
      );
      const jobDeadlineInput = document.getElementById('jobDeadlineInput');
      if (alwaysRecruitCheckbox && jobDeadlineInput) {
        alwaysRecruitCheckbox.onchange = function () {
          if (this.checked) {
            jobDeadlineInput.disabled = true;
            jobDeadlineInput.style.opacity = '0.5';
            jobDeadlineInput.style.cursor = 'not-allowed';
            jobDeadlineInput.value = '';
          } else {
            jobDeadlineInput.disabled = false;
            jobDeadlineInput.style.opacity = '1';
            jobDeadlineInput.style.cursor = 'default';
          }
        };
      }
    }
  } catch (e) {
    console.error('Topbar 로드 실패', e);
  }
}

function openJobModal() {
  // 필드 초기화
  const alwaysRecruitCheckbox = document.getElementById(
    'alwaysRecruitCheckbox',
  );
  const jobDeadlineInput = document.getElementById('jobDeadlineInput');
  if (alwaysRecruitCheckbox) alwaysRecruitCheckbox.checked = false;
  if (jobDeadlineInput) {
    jobDeadlineInput.disabled = false;
    jobDeadlineInput.style.opacity = '1';
    jobDeadlineInput.style.cursor = 'default';
    jobDeadlineInput.value = '';
  }
  document.getElementById('addJobModal').classList.add('show');
}
function closeJobModal(e) {
  if (!e || e.target.id === 'addJobModal') {
    document.getElementById('addJobModal').classList.remove('show');
  }
}
