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

      // 로고 업로드 로직 추가
      initLogoUpload();
    }
  } catch (e) {
    console.error('Topbar 로드 실패', e);
  }
}

function initLogoUpload() {
  const dropZone = document.getElementById('logoDropZone');
  const fileInput = document.getElementById('logoFileInput');
  const preview = document.getElementById('logoPreview');
  const removeBtn = document.getElementById('logoRemoveBtn');

  if (!dropZone || !fileInput || !preview || !removeBtn) return;

  // 클릭 시 파일 선택창 열기
  dropZone.onclick = (e) => {
    if (e.target === removeBtn) return;
    fileInput.click();
  };

  // 파일 선택 시 처리
  fileInput.onchange = (e) => {
    const file = e.target.files[0];
    handleLogoFile(file);
  };

  // 드래그 앤 드롭 이벤트
  dropZone.ondragover = (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
  };

  dropZone.ondragleave = () => {
    dropZone.classList.remove('dragover');
  };

  dropZone.ondrop = (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    handleLogoFile(file);
  };

  // 로고 삭제 버튼
  removeBtn.onclick = (e) => {
    e.stopPropagation();
    resetLogo();
  };
}

function handleLogoFile(file) {
  if (!file || !file.type.startsWith('image/')) {
    alert('이미지 파일만 업로드 가능합니다.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const preview = document.getElementById('logoPreview');
    preview.src = e.target.result;
    preview.classList.add('show');
  };
  reader.readAsDataURL(file);
}

function resetLogo() {
  const preview = document.getElementById('logoPreview');
  const fileInput = document.getElementById('logoFileInput');
  if (preview) {
    preview.src = '';
    preview.classList.remove('show');
  }
  if (fileInput) fileInput.value = '';
}

function openJobModal() {
  resetJobForm();
  document.getElementById('addJobModal').classList.add('show');
}

function resetJobForm() {
  const alwaysRecruitCheckbox = document.getElementById('alwaysRecruitCheckbox');
  const jobDeadlineInput = document.getElementById('jobDeadlineInput');
  const jobCompanyInput = document.getElementById('jobCompanyInput');
  const jobTitleInput = document.getElementById('jobTitleInput');
  const jobUrlInput = document.getElementById('jobUrlInput');
  const jobExperienceInput = document.getElementById('jobExperienceInput');
  const jobLocationInput = document.getElementById('jobLocationInput');
  const jobMemoInput = document.getElementById('jobMemoInput');
  const crawlUrlInput = document.querySelector('.crawl-bar input');

  if (alwaysRecruitCheckbox) alwaysRecruitCheckbox.checked = false;
  if (jobDeadlineInput) {
    jobDeadlineInput.disabled = false;
    jobDeadlineInput.style.opacity = '1';
    jobDeadlineInput.style.cursor = 'default';
    jobDeadlineInput.value = '';
  }
  if (jobCompanyInput) jobCompanyInput.value = '';
  if (jobTitleInput) jobTitleInput.value = '';
  if (jobUrlInput) jobUrlInput.value = '';
  if (jobExperienceInput) jobExperienceInput.value = '';
  if (jobLocationInput) jobLocationInput.value = '';
  if (jobMemoInput) jobMemoInput.value = '';
  if (crawlUrlInput) crawlUrlInput.value = '';

  // 로고 초기화
  resetLogo();
}
function closeJobModal(e) {
  if (!e || e.target.id === 'addJobModal') {
    document.getElementById('addJobModal').classList.remove('show');
  }
}
