# 체육관 물품 대여/반납 관리 앱

첨부된 화면 레퍼런스를 기준으로 구현한 모바일 우선 Next.js(App Router) 데모 앱입니다.
서버/API 없이 localStorage 기반 mock 데이터로 동작합니다.

## 기술 스택
- Next.js 16.2.2 (App Router)
- React 19.2.0 / React DOM 19.2.0
- TypeScript
- Tailwind CSS

## 로컬 실행 방법
1. Node 버전 맞추기
   ```bash
   nvm use
   ```
2. 의존성 설치
   ```bash
   npm install
   ```
3. 개발 서버 실행
   ```bash
   npm run dev
   ```
4. 브라우저 접속
   - `http://localhost:3000`

## Vercel 배포 방법
1. 이 저장소를 GitHub에 push
2. Vercel에서 **New Project**로 Import
3. Framework Preset은 Next.js 자동 감지 사용
4. Build command는 기본값(`next build`) 사용
5. Deploy

## 구현한 화면 목록
- `/` 홈
- `/borrow/select` 물품 선택
- `/borrow/quantity` 수량 조절
- `/borrow/borrower` 학년/반 선택 + 직접 입력 탭
- `/return` 반납
- `/admin/login` 관리자 인증
- `/admin` 관리자 모드
- `/admin/items` 물품 마스터 관리
- `/admin/history` 전체 대여 기록
- `/admin/settings` 관리자 비밀번호 변경

## 기본 seed 데이터
앱 첫 실행(localStorage 키: `gym-loan-app-v1`) 시 아래 물품이 자동 주입됩니다.
- 농구공: 총 15개
- 팀 조끼 (세트): 총 4개
- 축구공: 총 12개
- 배구공: 총 10개
- 뜀틀 세트: 총 2개
- 줄넘기: 총 30개

기본 관리자 비밀번호는 `0000`입니다.

## mock 처리한 부분
- 서버/API 없이 상태 전부를 localStorage에 저장
- 저장 상태
  1. `items` (물품 마스터)
  2. `activeLoans` (현재 대여 중)
  3. `history` (대여/반납 전체 기록)
  4. `adminPin` (관리자 비밀번호)
- 대여/반납 시각은 브라우저 로컬 시간 문자열 사용

## live reference와 다른 점
- 고유 이미지 자산 대신 이모지/중립 아이콘 사용
- 실제 서비스의 세부 애니메이션/픽셀 단위 타이포는 일부 단순화
- 관리자 설정(`/admin/settings`)은 레퍼런스 미확보 영역을 데모용으로 보완

## 아직 불확실한 부분
- 실제 서비스의 에러 처리/토스트 UX 상세
- 반납 완료 후 리다이렉트 정책
- 관리자 설정 실제 필드 구성
- 기록 화면의 필터/검색 기능 존재 여부
