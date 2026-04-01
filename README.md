# davidtest-benchmark

모바일 우선 체육 물품 대여/반납 관리 데모 앱입니다. 
Next.js + TypeScript + Tailwind CSS 기반으로, 스크린샷 기준 UI 구조와 사용자 흐름을 로컬 mock 상태로 구현했습니다.

## 로컬 실행 방법
1. 의존성 설치
   ```bash
   npm install
   ```
2. 개발 서버 실행
   ```bash
   npm run dev
   ```
3. 브라우저 접속
   - `http://localhost:3000`

## 배포 방법 (Vercel)
1. 저장소를 GitHub에 push
2. Vercel에서 New Project로 저장소 Import
3. Framework preset: **Next.js** (자동 감지)
4. Build command / Output directory 기본값 사용
5. Deploy

## 구현한 화면 목록
1. 메인 홈 화면 (`/`)
2. 대여하기 - 물품 선택 (`/rent/step-1`)
3. 대여하기 - 수량 조절 (`/rent/step-2`)
4. 대여하기 - 학년/반 선택 (`/rent/borrower`, 탭 1)
5. 대여하기 - 직접 입력 (`/rent/borrower`, 탭 2)
6. 반납하기 (`/return`)
7. 관리자 인증 (`/admin/login`)
8. 관리자 모드 (`/admin`)
9. 물품 마스터 관리 (`/admin/items`)
10. 전체 대여 기록 (`/admin/history`)

추가 화면:
- 관리자 설정 (`/admin/settings`) — reference-audit에 "미확보"로 분류된 영역을 데모용으로 보완 구현

## 기능 구현 범위
- 물품 다중 선택
- 물품별 수량 조절(수량 선택 비활성 품목은 1개 고정)
- 대여자 입력 2모드(학년/반, 직접 입력)
- 대여 요약 표시
- 반납 대상 다중 선택 및 반납 처리
- 관리자 비밀번호 인증(데모)
- 물품 추가/삭제/총 보유 수량 관리
- 대여/반납 기록 조회


## 기본 seed 데이터
앱 첫 실행 시(클라이언트 상태 초기화 시) 아래 물품이 기본 데이터로 자동 로드됩니다.
- 농구공: 총 15개
- 팀 조끼 (세트): 총 4개
- 축구공: 총 12개
- 배구공: 총 10개
- 뜀틀 세트: 총 2개
- 줄넘기: 총 30개

## reference와 다른 점
- 고유 아이콘 자산은 저작권 이슈를 피하기 위해 **중립 이모지/아이콘**으로 대체함.
- 정확한 타이포그래피/픽셀 값은 알 수 없어, 모바일 위계가 유사하도록 재구성함.
- 반납 완료 후 이동은 데모상 `/admin/history`로 이동하도록 구성함(실서비스 동작 불명확).
- 대여/반납 시각은 서버 시간이 아닌 로컬 데모 문자열(`데모 시각`)을 사용함.

## mock 처리한 부분
- 서버/API 없이 React Context 상태(`lib/app-state.tsx`)로 전체 데이터 관리
- 초기 물품/기록 데이터는 `lib/mock-data.ts` 시드 사용
- 관리자 비밀번호 기본값 `0000`은 데모 전용 로컬 상태

## 아직 불확실한 부분
- 실제 서비스 라우팅 경로/정보구조
- 인증 실패/네트워크 오류 UX 상세
- 반납 완료 후 정확한 화면 전환 규칙
- 전체 기록의 정렬/필터/검색 규칙

## 참고 문서
- 1단계 계획: `PLAN.md`
- 화면 감사 문서: `docs/reference-audit.md`
- 구현 차이 메모: `docs/implementation-notes.md`
