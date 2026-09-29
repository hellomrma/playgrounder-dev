# QA Report

대상: Japan Master (https://japan-master.playgrounder.dev/)
검증 방법: index.html / i18n.js 직접 읽기 + git diff 확인 + Node 스크립트로 전체 카드(14개)·i18n·JSON-LD 자동 교차 비교

## 검증 결과: PASS

### A. i18n 완전성
- [x] en 키 존재: `project-japan-master-desc` (i18n.js en 객체)
- [x] ko 키 존재: `project-japan-master-desc` (i18n.js ko 객체)
- [x] 빈 값 없음 (en/ko 모두 채워짐, 01_content-plan.md 값과 일치)
- [x] 회귀: HTML의 모든 `data-i18n` 키가 en/ko 양쪽에 존재, en-only/ko-only 키 없음, 빈 값 없음, 중복 키 없음

### B. JSON-LD 구조
- [x] 항목 추가 확인: `itemListElement` 마지막(Game Calendar 다음)에 추가됨 (총 14개)
- [x] 필수 필드 완비: `@type`, `name`, `url`, `description`, `applicationCategory`(EducationalApplication), `operatingSystem` 모두 존재
- [x] position 중복 없음: 모든 항목이 `position`을 사용하지 않는 기존 패턴(CLAUDE.md 템플릿과 동일)을 따르므로 중복 불가능
- [x] JSON 구문 정상: `JSON.parse` 성공, 기존 13개 항목 모두 필수 필드 유지

### C. 접근성
- [x] aria-label: `aria-label="Japan Master project"` (전 카드 `{name} project` 규칙 일치)
- [x] rel="noopener noreferrer": `target="_blank"`와 함께 존재 (전 14개 카드 확인)
- [x] 카드 구조 준수: `<li><a class="project-card">` > `<h4 class="project-name">` + `<p class="project-description" data-i18n>` — Educational 카테고리(K History 다음)에 위치

### D. 3자 일관성
- [x] URL 일치: 카드 `https://japan-master.playgrounder.dev/` == JSON-LD `https://japan-master.playgrounder.dev` (후행 슬래시 차이는 기존 전 항목 공통 관례)
- [x] 이름 일치: `Japan Master` (h4 == JSON-LD name == aria-label 접두)
- [x] 설명 일치: HTML 기본 텍스트 == i18n en == JSON-LD description ("Learn Japanese in Korean, from kana to JLPT N1, plus culture, food, regions, and history.")
- [x] 회귀: 기존 13개 카드 모두 URL/이름/설명 3자 일치, JSON-LD만 있고 카드 없는 항목 없음

### 부가
- [x] CLAUDE.md: Educational 카테고리 목록과 서브 프로젝트 URL에 Japan Master 반영됨

## 발견된 문제
없음

## 수정 필요 사항
없음

## 참고 (선택 사항, 판정 영향 없음)
- 01_content-plan.md의 "부가 반영 제안"인 `<meta name="keywords">`에 `Japanese learning, JLPT`, `<meta name="topic">`에 `Japanese Learning` 추가는 반영되지 않았다 (02_implementation-report.md에 "변경 없음"으로 명시). 기존 meta keywords에 프로젝트별 주제어가 들어가 있으므로 일관성 차원에서 추가를 고려할 수 있다.
