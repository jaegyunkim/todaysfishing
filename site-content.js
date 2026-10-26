/* 색상은 styles.css의 :root, 본문은 index.html에서 수정합니다.
 * 여기서는 대표 문구와 브리핑 이미지 정보를 한곳에서 관리합니다.
 * 외부 API, 위치정보, 분석 서비스 또는 데이터 저장을 사용하지 않습니다.
 */
window.SITE_CONTENT = {
  brand: '오늘의낚시',
  hero: {
    eyebrow: '공공데이터로 지키는 연안의 일상',
    titleLines: ['바다로 가는 설렘,', '안전하게 돌아올', '약속까지.'],
    description: '24시간 잠들지 않는 AI 연안 안전 에이전트.\n흩어진 해양·기상 데이터를 모아, 누구나 이해할 수 있는 안전한 행동으로 바꿉니다.',
    primaryLabel: '안전 에이전트 알아보기',
    secondaryLabel: '해양 브리핑 보기'
  },
  inquiry: {
    title: '우리 지역에 필요한 안전부터.',
    description: '협력 검토 시 아래 항목을 준비하면, 지역에 맞는 실증 방향을 구체화할 수 있습니다.'
  },
  briefings: [
    {
      image: '1.png',
      title: 'AI 출조 안전 판정',
      category: 'safety',
      date: ' ',
      description: '낚시지수·물때·기상특보를 모아, 출조 판정과 그 근거를 한 장으로.',
      alt: '동해 남부 갯바위 2026년 9월 14일 출조 안전 정보, 종합 32점 비추천인 과거 카드'
    },
    {
      image: '2.png',
      title: '바다낚시 기상 리포트',
      category: 'safety',
      date: ' ',
      description: '풍향·풍속·파고를 낚시 현장의 언어와 캐스팅 가이드로 풀어냅니다.',
      alt: '남애항 양양 2026년 9월 8일 09시 바다낚시 기상 리포트 과거 카드'
    },
    {
      image: '3.png',
      title: '바다낚시 지수 예측',
      category: 'forecast',
      date: ' ',
      description: '물때·파고·수온·유속과 대상어종 정보를 한눈에 비교합니다.',
      alt: '울릉도 갯바위 2026년 9월 11일 바다낚시 지수 보통인 과거 예측 카드'
    },
    {
      image: '4.png',
      title: '전국 해상 날씨 예보',
      category: 'forecast',
      date: ' ',
      description: '전국 해상 권역의 오전·오후 하늘상태와 파고를 지도 위에 담습니다.',
      alt: '2026년 9월 12일 전국 9개 해상 권역의 날씨와 파고 과거 예보 카드'
    },
    {
      image: '5.png',
      title: '해양관측소 실측 브리핑',
      category: 'observation',
      date: ' ',
      description: '수온·염분·유속·바람 등 제공되는 원시 관측값을 있는 그대로.',
      alt: '군산항 서해남부 2026년 9월 7일 06시 해양관측소 실측 과거 카드'
    },
    {
      image: '6.png',
      title: '실측·예측 조위 비교',
      category: 'observation',
      date: ' ',
      description: '시간대별 실측과 예측 조위를 나란히 비교해 물때를 이해합니다.',
      alt: '영광 2026년 9월 9일 시간대별 실측 조위와 예측 조위를 비교한 과거 카드'
    }
  ]
};
