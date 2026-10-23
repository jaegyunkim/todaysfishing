'use strict';

const content = window.SITE_CONTENT;
function bindText(selector, text) {
  document.querySelectorAll(selector).forEach((node) => { node.textContent = text; });
}
if (content) {
  bindText('[data-brand]', content.brand);
  bindText('[data-hero-eyebrow]', content.hero.eyebrow);
  bindText('[data-hero-description]', content.hero.description);
  bindText('[data-primary-label]', content.hero.primaryLabel);
  bindText('[data-secondary-label]', content.hero.secondaryLabel);
  bindText('[data-inquiry-title]', content.inquiry.title);
  bindText('[data-inquiry-description]', content.inquiry.description);
  const title = document.querySelector('[data-hero-title]');
  title.replaceChildren();
  content.hero.titleLines.forEach((line, index) => {
    const node = document.createElement(index === content.hero.titleLines.length - 1 ? 'span' : 'span');
    node.textContent = line;
    if (index === content.hero.titleLines.length - 1) node.className = 'title-accent';
    else node.className = 'title-line';
    title.append(node);
  });
}

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '메뉴 열기');
  navigation.classList.remove('is-open');
}
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  navigation.classList.toggle('is-open', isOpen);
});
navigation.querySelectorAll('a, button').forEach((node) => node.addEventListener('click', closeMenu));
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeMenu();
});
window.matchMedia('(min-width: 901px)').addEventListener('change', closeMenu);

// 모든 단계는 설명을 위한 고정 예시이며 규칙 기반의 실제 안전판정이 아닙니다.
const riskExamples = {
  safe: { label: '안전', summary: '안전 단계에서도 현장 확인은 필수입니다.', wave: '예시: 안정', wind: '예시: 약함', access: '별도 확인', action: '구명조끼 착용 · 현장 공지와 기상정보 확인' },
  caution: { label: '주의', summary: '현장 상태를 확인한 뒤 활동하세요.', wave: '변동 가능', wind: '현장 확인', access: '별도 확인', action: '구명조끼 착용 · 물때와 귀가 시간 확인' },
  alert: { label: '경계', summary: '기상 악화 가능성에 대비하는 단계입니다.', wave: '예시: 높음', wind: '예시: 강함', access: '제한 확인', action: '활동 계획 재검토 · 안전한 대피 경로 확인' },
  danger: { label: '위험', summary: '활동을 중단하고 안전한 곳으로 이동하세요.', wave: '예시: 높음', wind: '예시: 강함', access: '예시: 통제', action: '통제구역 진입 금지 · 관계기관 공지 우선' }
};
document.querySelectorAll('[data-risk]').forEach((button) => {
  button.addEventListener('click', () => {
    const key = button.dataset.risk;
    const example = riskExamples[key];
    document.querySelector('[data-risk-display]').dataset.level = key;
    bindText('#risk-level', example.label);
    bindText('#risk-summary', example.summary);
    bindText('#condition-wave', example.wave);
    bindText('#condition-wind', example.wind);
    bindText('#condition-access', example.access);
    bindText('#risk-action-text', example.action);
    document.querySelectorAll('[data-risk]').forEach((node) => node.setAttribute('aria-pressed', String(node === button)));
  });
});

const tabs = [...document.querySelectorAll('[role="tab"]')];
function activateTab(tab) {
  tabs.forEach((node) => {
    const selected = node === tab;
    node.setAttribute('aria-selected', String(selected));
    node.tabIndex = selected ? 0 : -1;
    document.getElementById(node.getAttribute('aria-controls')).hidden = !selected;
  });
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateTab(tab));
  tab.addEventListener('keydown', (event) => {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault();
    activateTab(tabs[next]);
    tabs[next].focus();
  });
});

const gallery = document.getElementById('briefing-grid');
const categoryNames = { safety: '출조·안전', forecast: '지수·예보', observation: '실측·관측' };
function renderBriefings(filter = 'all') {
  gallery.replaceChildren();
  (content?.briefings || []).filter((item) => filter === 'all' || item.category === filter).forEach((item) => {
    const article = document.createElement('article');
    article.className = 'briefing-card';
    const button = document.createElement('button');
    button.className = 'briefing-image';
    button.type = 'button';
    button.setAttribute('aria-label', `${item.title} 이미지 확대`);
    const image = document.createElement('img');
    image.src = item.image;
    image.alt = item.alt;
    image.loading = 'lazy';
    const expand = document.createElement('span');
    expand.className = 'expand-label';
    expand.textContent = '크게 보기 ↗';
    button.append(image, expand);
    button.addEventListener('click', () => {
      const expanded = document.getElementById('expanded-image');
      expanded.src = item.image;
      expanded.alt = item.alt;
      bindText('#image-dialog-title', item.title);
      bindText('#image-caption', `${item.date} · 현재 안전판정에 사용하지 마세요.`);
      document.getElementById('image-dialog').showModal();
    });
    const copy = document.createElement('div');
    copy.className = 'briefing-copy';
    const tag = document.createElement('span');
    tag.className = 'briefing-tag';
    tag.textContent = categoryNames[item.category] || item.category;
    const title = document.createElement('h4');
    title.textContent = item.title;
    const description = document.createElement('p');
    description.textContent = item.description;
    const date = document.createElement('small');
    date.textContent = item.date;
    copy.append(tag, title, description, date);
    article.append(button, copy);
    gallery.append(article);
  });
}
renderBriefings();
document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach((node) => node.setAttribute('aria-pressed', String(node === button)));
    renderBriefings(button.dataset.filter);
  });
});

document.querySelectorAll('[data-inquiry]').forEach((button) => button.addEventListener('click', () => document.getElementById('inquiry-dialog').showModal()));
document.querySelectorAll('[data-sources]').forEach((button) => button.addEventListener('click', () => document.getElementById('sources-dialog').showModal()));
document.querySelectorAll('[data-close-dialog]').forEach((button) => button.addEventListener('click', () => button.closest('dialog').close()));
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
});
