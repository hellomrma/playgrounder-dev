# Implementation Report

## 수정 완료 항목
- [x] index.html - 프로젝트 카드 추가 (카테고리: PoC, 위치: PoC `projects-grid`의 마지막, My Perfect Vacation 카드 다음)
- [x] index.html - JSON-LD 항목 추가 (position: 없음 — 기존 항목들도 `position` 필드를 쓰지 않으므로 패턴 유지. itemListElement 15번째, Japan Master 다음)
- [x] i18n.js - en 번역 추가 (key: project-between-desc)
- [x] i18n.js - ko 번역 추가 (key: project-between-desc)
- [x] CLAUDE.md - PoC 카테고리 목록에 Between 추가, 서브 프로젝트 URL 목록 끝에 https://between.playgrounder.dev 추가

## 수정 내역 요약
- 카드: href `https://between.playgrounder.dev/`, aria-label "Between project", data-i18n `project-between-desc`
- JSON-LD: name Between, url `https://between.playgrounder.dev`, applicationCategory `CommunicationApplication`, operatingSystem Web Browser
- en: "Translated messenger that lets Korean and Japanese speakers chat in their own language"
- ko: "말은 달라도 이야기는 이어지도록, 한국어·일본어 사용자를 잇는 번역 메신저"
- 두 객체 모두 `project-japan-master-desc` 다음에 삽입
- 키 중복 없음

## 검증
- JSON-LD 블록 `JSON.parse` 성공 (itemListElement 15개)
- `node --check i18n.js` 통과
- `project-between-desc` 출현: index.html 1회, i18n.js 2회(en/ko)
- 인라인 스타일 / var 사용 없음
