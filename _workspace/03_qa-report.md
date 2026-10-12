# QA Report

대상: Between (https://between.playgrounder.dev, PoC, `project-between-desc`)

## 검증 결과: PASS

### A. i18n 완전성
- [x] en 키 존재: `project-between-desc` (i18n.js 27행)
- [x] ko 키 존재: `project-between-desc` (i18n.js 53행)
- [x] 빈 값 없음
  - en: "Translated messenger that lets Korean and Japanese speakers chat in their own language"
  - ko: "말은 달라도 이야기는 이어지도록, 한국어·일본어 사용자를 잇는 번역 메신저"
- [x] 사이트 전체 `data-i18n` 키가 en/ko 모두에 존재 (누락 0), en/ko 키 집합 완전 일치
- [x] `node --check i18n.js` 통과

### B. JSON-LD 구조
- [x] 항목 추가 확인: itemListElement 15번째(마지막, Japan Master 다음)
- [x] 필수 필드 완비: @type, name, url, description, applicationCategory(CommunicationApplication), operatingSystem — 15개 항목 전체에 누락 없음
- [x] position 중복 없음: 기존 항목을 포함해 모든 항목이 `position` 필드를 쓰지 않으므로 중복 가능성 없음 (기존 패턴과 일치)
- [x] JSON 구문 정상: `JSON.parse` 성공, name 중복 없음
- 카드 수(15)와 JSON-LD 항목 수(15) 일치

### C. 접근성
- [x] aria-label="Between project"
- [x] `target="_blank"`와 `rel="noopener noreferrer"`가 함께 있음 (사이트 전체 18/18)
- [x] 카드 구조 준수: `<li><a class="project-card">` > `<h4 class="project-name">` + `<p class="project-description" data-i18n>`; PoC `projects-grid` 마지막 위치

### D. 3자 일관성
- [x] URL 일치: 카드 `https://between.playgrounder.dev/` / JSON-LD `https://between.playgrounder.dev` (끝 슬래시 차이는 기존 모든 항목과 같은 관례)
- [x] 이름 일치: "Between" (h4, aria-label, JSON-LD name)
- [x] 설명 일치: 카드 기본 텍스트 === i18n en === JSON-LD description (문자열 완전 일치)

### E. CLAUDE.md
- [x] PoC 카테고리 줄에 Between 추가
- [x] 서브 프로젝트 URL 목록 끝에 `https://between.playgrounder.dev` 추가

### 범위 확인
- `git diff` 결과 대상 3개 파일에서 Between 관련 변경만 확인됨 (index.html +20, i18n.js +2, CLAUDE.md +2/-1). 무관한 수정 없음.

## 발견된 문제
없음

## 수정 필요 사항
없음
