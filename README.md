# 🧠 시사 퀴즈왕 OX (Current Events Quiz App)

최신 시사 상식을 재미있고 직관적으로 맞히는 5문제 O/X 퀴즈 모바일 웹 애플리케이션입니다.

![시사 퀴즈왕 OX](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)

---

## 🌟 주요 기능

1. **5문 5답 시사 퀴즈 라운드**:
   - 경제, IT·과학, 국제·사회, 환경·기후 등 폭넓은 시사 카테고리
   - 문제 풀 때마다 20여 종의 엄선된 시사 상식 풀에서 5문제를 무작위 추출하여 매 라운드 새로운 퀴즈 제공

2. **즉각적인 반응형 피드백**:
   - 정답/오답 선택 시 사운드 효과음과 생생한 표정 이모지 애니메이션 표출
   - 각 문제마다 핵심 뉴스 배경 및 알기 쉬운 상식 해설 카드 제공

3. **시사왕 최종 결과 및 복습**:
   - 획득 점수에 따른 맞춤형 칭호 (만점 등극! 최고의 시사왕, 특급 시사왕, 스마트 시사왕 등)
   - 화려한 폭죽 파티클 축하 효과
   - 틀린 문제와 맞힌 문제를 한눈에 다시 볼 수 있는 '문제별 정답 및 해설 복습' 아코디언
   - 결과 공유하기(클립보드 복사) 및 '새로운 5문제 다시 풀기' 기능

4. **모바일 최적화 UI/UX**:
   - 상단 모바일 상태바(시간, 배터리, 와이파이)부터 하단 바까지 완벽한 모바일 앱 감성
   - 한 손으로 편하게 터치 가능한 대형 O / X 버튼과 긴 지문도 잘리지 않는 동적 텍스트 반응형 레이아웃

---

## 🚀 로컬 실행 방법

이 저장소를 본인 컴퓨터로 클론한 뒤 실행하는 방법입니다:

```bash
# 1. 저장소 클론
git clone https://github.com/SojeongShin/current-events-quiz-app.git

# 2. 프로젝트 폴더로 이동
cd current-events-quiz-app

# 3. 의존성 패키지 설치
npm install

# 4. 로컬 개발 서버 실행
npm run dev
```

터미널에 표시되는 로컬 주소(기본: `http://localhost:3000` 또는 `http://localhost:5173`)를 브라우저에서 열면 바로 게임을 플레이할 수 있습니다.

---

## 📁 프로젝트 구조

```
├── src/
│   ├── components/
│   │   ├── EmojiFeedback.tsx   # 정답/오답 피드백 및 상세 해설 카드
│   │   ├── ScoreKingView.tsx   # 시사왕 최종 결과, 폭죽, 복습 아코디언
│   │   └── ErrorBoundary.tsx   # 런타임 예외 복구 바운더리
│   ├── data/
│   │   └── quizData.ts         # 최신 경제/IT/국제/환경 시사 퀴즈 데이터셋
│   ├── utils/
│   │   └── sound.ts            # Web Audio API 기반 효과음 합성 엔진
│   ├── App.tsx                 # 메인 게임 상태 및 모바일 프레임 레이아웃
│   ├── index.css               # Tailwind CSS v4 및 키프레임 애니메이션
│   └── main.tsx                # 엔트리 포인트
├── index.html                  # 모바일 뷰포트 및 메타 태그
├── package.json
└── vite.config.ts
```

---

## 🛠 기술 스택

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Motion (motion/react)
- **Icons**: Lucide React
- **Audio**: Web Audio API (Zero external audio file dependencies)
- **Build Tool**: Vite
