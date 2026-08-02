// ==========================================================================
// 오늘의낚시 — 공통 인터랙션
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 모바일 내비게이션 토글 ---------- */
  const burger = document.querySelector('.nav-burger');
  const links = document.querySelector('.nav-links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      burger.classList.remove('open');
      links.classList.remove('open');
    }));
  }

  /* ---------- 스크롤 리빌 ---------- */
  const reveals = document.querySelectorAll('.reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if ('IntersectionObserver' in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ---------- 판정 게이지 (시그니처 위젯) ---------- */
  const gauge = document.querySelector('[data-gauge]');
  if (gauge) {
    const arc = gauge.querySelector('.gauge-arc-fg');
    const scoreEl = gauge.querySelector('.gauge-score b');
    const badgeEl = gauge.querySelector('.gauge-badge');
    const pointEl = gauge.querySelector('.gauge-point b');
    const metaEls = gauge.querySelectorAll('.gauge-meta b');

    // 실제 서비스 판정 예시 3건 순환
    const cases = [
      { point: '감천항 · 연안 캐스팅', score: 82, verdict: '추천', color: '#0A6E7D',
        meta: ['0.0 m', '17.7℃', '보통'] },
      { point: '진도 · 하조도 감성돔', score: 78, verdict: '조건부 추천', color: '#F08A00',
        meta: ['0.2 m', '중조기', '높음'] },
      { point: '남애항 · 갯바위 감성돔', score: 65, verdict: '주의', color: '#FF6A55',
        meta: ['1.5 m', '중조기', '보통'] },
    ];
    const ARC_LEN = 251.2; // 반원 둘레 근사치 (r=80, π*80*... 아래 SVG와 일치)
    let i = 0;

    function paint(idx, animate = true) {
      const c = cases[idx];
      pointEl.textContent = c.point;
      badgeEl.textContent = c.verdict;
      badgeEl.style.background = c.color + '22';
      badgeEl.style.color = c.color;
      badgeEl.style.border = '1px solid ' + c.color + '55';
      metaEls[0].textContent = c.meta[0];
      metaEls[1].textContent = c.meta[1];
      metaEls[2].textContent = c.meta[2];

      const offset = ARC_LEN - (ARC_LEN * c.score) / 100;
      if (arc) {
        arc.style.stroke = c.color;
        arc.style.transition = animate ? 'stroke-dashoffset 1.1s cubic-bezier(.22,.68,.19,1), stroke 0.6s' : 'none';
        arc.style.strokeDashoffset = offset;
      }

      if (animate && !reduceMotion) {
        const dur = 900, start = performance.now();
        const from = parseInt(scoreEl.textContent || '0', 10);
        function tick(now) {
          const p = Math.min(1, (now - start) / dur);
          const eased = 1 - Math.pow(1 - p, 3);
          scoreEl.textContent = Math.round(from + (c.score - from) * eased);
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      } else {
        scoreEl.textContent = c.score;
      }
    }

    paint(0, false);
    if (!reduceMotion) {
      setInterval(() => {
        i = (i + 1) % cases.length;
        paint(i, true);
      }, 4200);
    }
  }

  /* ---------- 라이트박스 (서비스 화면 갤러리) ---------- */
  const lightbox = document.querySelector('.lightbox');
  if (lightbox) {
    const lbImg = lightbox.querySelector('img');
    document.querySelectorAll('[data-lightbox]').forEach(card => {
      card.addEventListener('click', () => {
        lbImg.src = card.getAttribute('data-lightbox');
        lbImg.alt = card.getAttribute('data-alt') || '';
        lightbox.classList.add('open');
      });
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
        lightbox.classList.remove('open');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') lightbox.classList.remove('open');
    });
  }

  /* ---------- 내비게이션 배경 스크롤 반응 ---------- */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.boxShadow = window.scrollY > 8 ? '0 8px 24px rgba(0,0,0,0.18)' : 'none';
    });
  }
});
