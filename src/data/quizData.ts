export interface QuizQuestion {
  id: number;
  category: '경제' | 'IT·과학' | '국제·사회' | '환경·기후' | '사회·문화' | '문화·상식';
  question: string;
  answer: 'O' | 'X';
  explanation: string;
  sourceOrTip?: string;
}

export const QUIZ_DATABASE: QuizQuestion[] = [
  {
    id: 1,
    category: '경제',
    question: "'슈링크플레이션(Shrinkflation)'은 가격은 그대로 두고 제품의 용량이나 크기를 줄여 실질적으로 가격을 올리는 현상을 말한다.",
    answer: 'O',
    explanation: "정답은 O입니다! 슈링크플레이션은 줄어든다는 뜻의 'Shrink'와 'Inflation'의 합성어로, 가격 인상에 따른 저항을 피하기 위해 용량을 슬쩍 줄이는 방식입니다.",
    sourceOrTip: "소비자 물가 시사 용어"
  },
  {
    id: 2,
    category: 'IT·과학',
    question: "생성형 AI 모델에서 사실이 아닌 정보를 마치 사실인 것처럼 그럴듯하게 지어내는 현상을 '할루시네이션(환각)'이라고 부른다.",
    answer: 'O',
    explanation: "정답은 O입니다! LLM(거대언어모델)이 학습 데이터의 부족이나 통계적 확률 계산 과정에서 거짓된 정보를 그럴듯하게 생성하는 오류를 환각(Hallucination)이라 부릅니다.",
    sourceOrTip: "인공지능 핵심 상식"
  },
  {
    id: 3,
    category: '경제',
    question: "기준금리가 인하되면 일반적으로 시중 은행의 대출 금리는 상승한다.",
    answer: 'X',
    explanation: "정답은 X입니다! 중앙은행이 기준금리를 내리면 시중 자금 조달 비용이 낮아져 대출 금리와 예금 금리가 전반적으로 하락하게 됩니다.",
    sourceOrTip: "금융 기초 상식"
  },
  {
    id: 4,
    category: '환경·기후',
    question: "EU가 도입한 '탄소국경조정제도(CBAM)'는 탄소 배출량이 많은 수입품에 대해 일종의 탄소 관세를 부과하는 제도이다.",
    answer: 'O',
    explanation: "정답은 O입니다! 유럽연합(EU)은 역내 기업들의 탄소 감축 노력과 경쟁력을 보호하기 위해 탄소 배출 규제가 느슨한 국가에서 생산된 제품에 탄소 비용을 물리는 CBAM을 시행하고 있습니다.",
    sourceOrTip: "기후변화 및 국제무역"
  },
  {
    id: 5,
    category: '국제·사회',
    question: "유네스코(UNESCO) 본부는 미국 뉴욕에 위치해 있다.",
    answer: 'X',
    explanation: "정답은 X입니다! 유엔(UN) 본부는 미국 뉴욕에 있지만, 유엔교육과학문화기구인 유네스코(UNESCO) 본부는 프랑스 파리에 있습니다.",
    sourceOrTip: "국제기구 상식"
  },
  {
    id: 6,
    category: '경제',
    question: "'스태그플레이션(Stagflation)'은 경제가 활황(성장)세를 보이면서 물가도 동시에 급상승하는 현상을 뜻한다.",
    answer: 'X',
    explanation: "정답은 X입니다! 스태그플레이션은 경기 침체(Stagnation)와 물가 상승(Inflation)이 동시에 일어나는 최악의 경제 상황을 뜻합니다.",
    sourceOrTip: "거시경제 상식"
  },
  {
    id: 7,
    category: 'IT·과학',
    question: "양자컴퓨터의 기본 정보 처리 단위는 0과 1만을 나타내는 '비트(Bit)'이다.",
    answer: 'X',
    explanation: "정답은 X입니다! 기존 컴퓨터는 0 또는 1의 '비트(Bit)'를 쓰지만, 양자컴퓨터는 중첩과 얽힘 원리를 이용해 0과 1의 상태를 동시에 갖는 '큐비트(Qubit)'를 사용합니다.",
    sourceOrTip: "양자 정보 기술"
  },
  {
    id: 8,
    category: '환경·기후',
    question: "'RE100'은 기업이 사용하는 전력의 100%를 재생에너지(Renewable Energy)로 충당하겠다는 글로벌 자발적 캠페인이다.",
    answer: 'O',
    explanation: "정답은 O입니다! Renewable Electricity 100%의 줄임말로 풍력, 태양광 등 재생에너지만을 100% 사용해 제품을 생산하겠다는 친환경 이니셔티브입니다.",
    sourceOrTip: "ESG 경영 및 기후"
  },
  {
    id: 9,
    category: '사회·문화',
    question: "우리나라에서 주민등록상 만 18세 이상이면 국회의원 및 대통령 선거에서 투표권을 행사할 수 있다.",
    answer: 'O',
    explanation: "정답은 O입니다! 공직선거법 개정에 따라 현재 대한민국에서는 선거일 기준 만 18세 이상의 국민 누구나 대통령, 국회의원, 지방선거 투표권을 가집니다.",
    sourceOrTip: "대한민국 헌법과 선거"
  },
  {
    id: 10,
    category: '경제',
    question: "'어닝 쇼크(Earning Shock)'는 기업의 실적이 예상보다 훨씬 뛰어나 주가가 폭등하는 현상을 말한다.",
    answer: 'X',
    explanation: "정답은 X입니다! 시장 예상치를 훨씬 밑도는 부진한 실적 발표로 충격을 주는 것을 '어닝 쇼크'라 하고, 반대로 기대 이상으로 깜짝 실적을 낸 것은 '어닝 서프라이즈'라고 합니다.",
    sourceOrTip: "증권 및 주식 시장"
  },
  {
    id: 11,
    category: 'IT·과학',
    question: "'피싱(Phishing)'과 'SMS(문자메시지)'의 합성어로, 악성 링크가 포함된 문자메시지를 통해 개인정보를 탈취하는 금융사기 수법은 '스미싱(Smishing)'이다.",
    answer: 'O',
    explanation: "정답은 O입니다! 택배 조회나 모바일 청첩장 등을 사칭한 문자 속 URL을 누르게 해 악성코드를 심고 금융정보를 빼내는 기법입니다.",
    sourceOrTip: "사이버 보안 상식"
  },
  {
    id: 12,
    category: '국제·사회',
    question: "'브릭스(BRICS)'의 원래 창립 멤버는 브라질, 러시아, 인도, 중국, 남아프리카공화국 5개국이다.",
    answer: 'O',
    explanation: "정답은 O입니다! 브라질(Brazil), 러시아(Russia), 인도(India), 중국(China), 남아공(South Africa)의 영문 첫 글자를 딴 신흥 경제국 연합체입니다.",
    sourceOrTip: "국제 외교 및 경제"
  },
  {
    id: 13,
    category: '경제',
    question: "국내총생산(GDP) 산정에는 외국인이 대한민국 영토 내에서 생산한 부가가치도 포함된다.",
    answer: 'O',
    explanation: "정답은 O입니다! GDP(Gross Domestic Product)는 국적과 상관없이 한 나라의 '영토' 안에서 생산된 모든 재화와 서비스의 시장 가치를 합산합니다.",
    sourceOrTip: "기초 경제 지표"
  },
  {
    id: 14,
    category: '환경·기후',
    question: "'엘니뇨(El Niño)' 현상은 동태평양 적도 부근의 해수면 온도가 평년보다 비정상적으로 낮아지는 현상이다.",
    answer: 'X',
    explanation: "정답은 X입니다! 해수면 온도가 평년보다 '높아지는' 현상이 엘니뇨이며, 반대로 평년보다 '낮아지는' 차가운 현상은 '라니냐(La Niña)'라고 부릅니다.",
    sourceOrTip: "기상 및 기후 상식"
  },
  {
    id: 15,
    category: 'IT·과학',
    question: "우주 탐사에서 지구 중력을 벗어나 달이나 화성으로 가기 위해 우주선이 도달해야 하는 최소한의 속도를 '탈출 속도'라 부른다.",
    answer: 'O',
    explanation: "정답은 O입니다! 지구의 중력을 이겨내고 완전히 우주로 탈출하기 위한 제2우주속도(탈출 속도)는 초속 약 11.2km에 달합니다.",
    sourceOrTip: "우주 항공 상식"
  },
  {
    id: 16,
    category: '사회·문화',
    question: "노벨상 시상 부문에는 수학 분야의 '노벨 수학상'도 공식 제정되어 있다.",
    answer: 'X',
    explanation: "정답은 X입니다! 알프레드 노벨의 유언에 따라 제정된 노벨상에는 수학상이 없습니다. 수학계의 노벨상으로는 4년마다 수여되는 '필즈상(Fields Medal)'과 '아벨상'이 유명합니다.",
    sourceOrTip: "세계 문화 상식"
  },
  {
    id: 17,
    category: '경제',
    question: "'디폴트(Default)'는 국가나 기업이 빌린 빚에 대해 원금과 이자를 약속한 기한 내에 갚지 못하는 '채무불이행' 상태를 뜻한다.",
    answer: 'O',
    explanation: "정답은 O입니다! 디폴트는 채무자가 만기 채무 상환 의무를 다하지 못할 때 선언되며, 국가의 경우 모라토리엄(지불유예) 또는 디폴트에 처할 수 있습니다.",
    sourceOrTip: "금융 리스크 용어"
  },
  {
    id: 18,
    category: '사회·문화',
    question: "세계보건기구(WHO)에서 정한 감염병 최고 경고 등급은 '에피데믹(Epidemic)'이다.",
    answer: 'X',
    explanation: "정답은 X입니다! 국지적 유행은 에피데믹(Epidemic), 전 세계적으로 대유행하는 최고 경고 등급은 '팬데믹(Pandemic)'입니다.",
    sourceOrTip: "보건 의학 시사"
  },
  {
    id: 19,
    category: 'IT·과학',
    question: "스마트폰이나 태블릿 등에서 쓰이는 'OLED'는 백라이트(뒤쪽 조명)가 반드시 필요한 디스플레이 기술이다.",
    answer: 'X',
    explanation: "정답은 X입니다! LCD는 백라이트가 필수지만, OLED(유기발광다이오드)는 소자 하나하나가 스스로 빛을 내기 때문에 백라이트가 전혀 필요 없습니다.",
    sourceOrTip: "디스플레이 반도체 상식"
  },
  {
    id: 20,
    category: '국제·사회',
    question: "G7(주요 7개국 정상회의) 회원국에 대한민국은 정식 정규 회원국으로 포함되어 있다.",
    answer: 'X',
    explanation: "정답은 X입니다! G7 회원국은 미국, 영국, 프랑스, 독일, 일본, 이탈리아, 캐나다 7개국입니다. 한국은 초청국(게스트) 자격으로 자주 참석하지만 정식 회원국은 아닙니다.",
    sourceOrTip: "국제 다자외교 상식"
  },
  {
    id: 21,
    category: '경제',
    question: "'긱 워커(Gig Worker)'는 정규직 대신 단기 계약이나 필요에 따라 일감을 맡는 초단기 노동자를 일컫는다.",
    answer: 'O',
    explanation: "정답은 O입니다! 플랫폼 노동자나 프리랜서처럼 프로젝트나 일정 기간 단위로 일하는 독립 계약 노동자를 긱 워커라고 부릅니다.",
    sourceOrTip: "노동 및 경제 트렌드"
  },
  {
    id: 22,
    category: 'IT·과학',
    question: "우주 망원경 '제임스 웹(JWST)'은 가시광선보다 적외선 파장대를 주로 관측하도록 설계되었다.",
    answer: 'O',
    explanation: "정답은 O입니다! 허블 망원경이 주로 가시광선을 관측했다면, 제임스 웹은 우주 먼지를 뚫고 더 멀고 오래된 은하를 보기 위해 강력한 적외선 센서를 탑재했습니다.",
    sourceOrTip: "천문 우주 과학"
  },
  {
    id: 23,
    category: '환경·기후',
    question: "바다 표면에 떠다니는 거대한 플라스틱 쓰레기 지대를 '태평양 거대 쓰레기 지대(GPGP)'라고 부른다.",
    answer: 'O',
    explanation: "정답은 O입니다! Great Pacific Garbage Patch(GPGP)는 해류 순환으로 인해 태평양 중앙에 한반도의 수 배 면적으로 모여든 해양 플라스틱 밀집 지대입니다.",
    sourceOrTip: "해양 환경 생태"
  },
  {
    id: 24,
    category: '사회·문화',
    question: "'골든 타임(Golden Time)'은 응급 환자의 생명을 살리기 위해 치료가 반드시 이루어져야 하는 결정적인 시간을 뜻한다.",
    answer: 'O',
    explanation: "정답은 O입니다! 심정지 환자의 4분, 중증 외상 환자의 1시간처럼 초기 신속한 응급조치가 생사를 가르는 결정적 한계 시간을 말합니다.",
    sourceOrTip: "의료 보건 상식"
  },
  {
    id: 25,
    category: '국제·사회',
    question: "국제연합(UN)의 5대 상임이사국은 미국, 영국, 프랑스, 중국, 독일이다.",
    answer: 'X',
    explanation: "정답은 X입니다! UN 안전보장이사회 5대 상임이사국은 미국, 영국, 프랑스, 중국, 러시아 5개국이며, 독일은 상임이사국이 아닙니다.",
    sourceOrTip: "국제기구 외교"
  }
];

export function getRandomQuiz(count: number = 5, excludeIds: number[] = []): QuizQuestion[] {
  let pool = QUIZ_DATABASE.filter((q) => !excludeIds.includes(q.id));
  if (pool.length < count) {
    pool = [...QUIZ_DATABASE];
  }
  const array = [...pool];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.slice(0, count);
}
