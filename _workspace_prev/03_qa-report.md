# QA Report

작성일: 2026-04-30
검증자: qa-validator
대상: K History, DS Vault 두 프로젝트 추가
참조: `01_content-plan.md`, `02_implementation-report.md`

---

## 검증 결과: **PASS**

전체 5개 범주 17개 체크 항목 모두 통과. 회귀 없음.

---

## 1. i18n 키 완전성

| # | 항목 | 결과 | 위치 / 비고 |
|---|------|------|-------------|
| 1.1 | `project-k-history-desc` (en) 존재 | PASS | `i18n.js:23` |
| 1.2 | `project-k-history-desc` (ko) 존재 | PASS | `i18n.js:46` |
| 1.3 | `project-ds-vault-desc` (en) 존재 | PASS | `i18n.js:24` |
| 1.4 | `project-ds-vault-desc` (ko) 존재 | PASS | `i18n.js:47` |
| 1.5 | 영문 번역 비어있지 않음 / 자연스러움 | PASS | 두 항목 모두 16단어 이내, 기존 톤(8~16단어 명사구)과 일치 |
| 1.6 | 한글 번역 비어있지 않음 / 자연스러움 | PASS | 직역 아닌 명사형 종결, 한국어 어순. 가운뎃점(·) 사용도 기존 `project-pangyo-pick-desc` 톤과 부합 |

**소견**: 영문/한글 모두 마침표 유무가 기존 항목들과 다소 차이가 있으나(영문은 `.` 종결로 현 항목들 중 유일), 가독성/의미 손상은 없어 PASS. 향후 사이트 톤 통일 시 검토 권고 사항으로만 기록.

---

## 2. JSON-LD 구조

| # | 항목 | 결과 | 위치 / 비고 |
|---|------|------|-------------|
| 2.1 | JSON 구문 유효성 (`JSON.parse` 통과) | PASS | Node.js로 파싱 검증 완료. 중괄호·콤마·따옴표 정상 |
| 2.2 | K History 항목 추가 (`itemListElement[10]`) | PASS | `index.html:162-169` |
| 2.3 | DS Vault 항목 추가 (`itemListElement[11]`) | PASS | `index.html:170-177` |
| 2.4 | 두 항목 모두 `@type: SoftwareApplication` | PASS | 라인 163, 171 |
| 2.5 | 6개 필수 필드 (@type, name, url, description, applicationCategory, operatingSystem) | PASS | 양쪽 객체 모두 6개 필드 완비 |
| 2.6 | K History `applicationCategory: EducationalApplication` | PASS | `index.html:167` |
| 2.7 | DS Vault `applicationCategory: UtilityApplication` | PASS | `index.html:175` (요청 명세 부합. content-plan 1순위 권장안 `ReferenceApplication`이 아닌 사용자 확정값 `UtilityApplication` 채택 — implementation-report에 의사결정 기록 있음) |
| 2.8 | `position` 필드 중복 없음 | PASS | 기존 코드는 `position` 키를 사용하지 않고 배열 인덱스로 순서 표현 — 충돌 가능성 자체가 없음 |
| 2.9 | 총 항목 수 12개 (기존 10 + 신규 2) | PASS | `itemListElement.length === 12` 확인 |

---

## 3. 접근성 / 카드 구조

| # | 항목 | 결과 | 위치 / 비고 |
|---|------|------|-------------|
| 3.1 | K History 카드 `aria-label="K History project"` | PASS | `index.html:252` |
| 3.2 | DS Vault 카드 `aria-label="DS Vault project"` | PASS | `index.html:318` |
| 3.3 | `target="_blank"` + `rel="noopener noreferrer"` 페어 | PASS | K History `index.html:250-251`, DS Vault `index.html:316-317` |
| 3.4 | `data-i18n` 속성과 i18n.js 키 일치 | PASS | `project-k-history-desc`, `project-ds-vault-desc` 양쪽 일치 |
| 3.5 | `<h4 class="project-name">` 구조 | PASS | `index.html:253`, `index.html:319` |
| 3.6 | HTML 들여쓰기 4스페이스 일관성 | PASS | 기존 카드 들여쓰기 패턴(`<li>` 20sp / `<a>` 24sp / `<h4>` 28sp / `<p>` 28sp / 본문 32sp)과 동일 |

---

## 4. 3자 일관성 (카드 ↔ 번역 ↔ JSON-LD)

### K History
| 차원 | 카드 (HTML) | i18n.js | JSON-LD | 결과 |
|------|-------------|---------|---------|------|
| 표시명 | `K History` (`index.html:253`) | — | `K History` (`index.html:164`) | PASS |
| URL | `https://k-history.playgrounder.dev/` (`index.html:248`) | — | `https://k-history.playgrounder.dev` (`index.html:165`) | PASS (trailing slash 차이는 기존 모든 프로젝트와 동일한 의도된 패턴) |
| i18n 키 | `project-k-history-desc` (`index.html:254`) | `project-k-history-desc` (en `i18n.js:23`, ko `i18n.js:46`) | — | PASS |
| 영문 description | "Interactive 5,000-year journey through Korean history with timelines, era maps, and a people encyclopedia." (`index.html:255`) | 동일 (`i18n.js:23`) | 동일 (`index.html:166`) | PASS (3자 모두 동일 문자열) |
| 카테고리 | Educational `<div>` 내부 (`index.html:248-258`) | — | `EducationalApplication` (`index.html:167`) | PASS |

### DS Vault
| 차원 | 카드 (HTML) | i18n.js | JSON-LD | 결과 |
|------|-------------|---------|---------|------|
| 표시명 | `DS Vault` (`index.html:319`) | — | `DS Vault` (`index.html:172`) | PASS |
| URL | `https://ds-vault.playgrounder.dev/` (`index.html:314`) | — | `https://ds-vault.playgrounder.dev` (`index.html:173`) | PASS (trailing slash 차이는 기존 패턴) |
| i18n 키 | `project-ds-vault-desc` (`index.html:320`) | `project-ds-vault-desc` (en `i18n.js:24`, ko `i18n.js:47`) | — | PASS |
| 영문 description | "Ready-to-use design system reference with color tokens, typography, components, and three AI-friendly Markdown templates." (`index.html:321`) | 동일 (`i18n.js:24`) | 동일 (`index.html:174`) | PASS |
| 카테고리 | Information `<div>` 내부 (`index.html:314-323`) | — | `UtilityApplication` (`index.html:175`) | PASS (Information 카테고리 카드들이 모두 `UtilityApplication`을 사용하는 기존 패턴과 일치: K Holidays/Weekly AI Article/Now Weather/판교Pick) |

---

## 5. 회귀 검증 (기존 자산 보존)

| # | 항목 | 결과 | 비고 |
|---|------|------|------|
| 5.1 | JSON-LD 기존 10개 프로젝트 보존 | PASS | C# Tutorials, 3D Models, IUI Put Your Hands Up, FE Roadmaps, K Holidays, Weekly AI Article, Now Weather, 판교Pick, Snap Rush, Tube Player 모두 존재. 필드값 변경 없음 |
| 5.2 | 카테고리 섹션 구조 무결성 | PASS | Educational(3) / Information(5) / PoC(1) / Interactive(3) — 4개 그룹 구조 보존, 신규 카드 삽입에 따른 `<ul>`/`<div>` 깨짐 없음 |
| 5.3 | i18n.js 기존 키 보존 | PASS | 11개 기존 `project-*-desc` 키 모두 en/ko 양쪽에 존재. `copyright` 등 비프로젝트 키도 보존 |
| 5.4 | i18n.js 닫는 `}` / 콤마 정상 | PASS | `en` 객체 끝(`i18n.js:25` `copyright`)과 `ko` 객체 끝(`i18n.js:48` `copyright`)에 콤마 누락 없음, 마지막 키에 trailing comma 없음 — 기존 스타일 유지 |
| 5.5 | HTML 외부 구조(header/footer/JSON-LD `about` 블록) 보존 | PASS | 401줄, 마지막 줄 `</html>` 정상 |

---

## 발견된 문제

없음.

---

## 수정 필요 사항

없음.

---

## 참고: 향후 권고 (블로킹 아님)

1. **영문 description 마침표 일관성**: 신규 두 항목은 영문 마침표(`.`)로 끝나지만, 기존 10개는 모두 마침표 없음. 사이트 전체 톤 통일 차원에서 다음 사이트 감사(`/site-audit`) 시 정렬 검토.
2. **DS Vault `applicationCategory` 결정 추적**: `ReferenceApplication`(스키마 정확성) 대신 `UtilityApplication`(사이트 일관성)이 사용자 확정으로 채택되었다는 의사결정 기록은 `02_implementation-report.md` 의사결정 표에 보존되어 있음 — 향후 변경 검토 시 참조 가능.

---

## 최종 판정

**전체 PASS** — code-implementer가 산출한 변경은 i18n 완전성, JSON-LD 구조, 접근성, 3자 일관성, 회귀 보존 모든 기준을 충족합니다. 배포 가능 상태.
