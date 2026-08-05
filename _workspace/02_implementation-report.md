# Implementation Report

작성일: 2026-04-30
대상: K History, DS Vault 두 프로젝트 추가
상태: 완료

---

## 수정 완료 항목

- [x] `index.html` — K History 카드 추가 (Educational 카테고리, FE Roadmaps `</li>` 다음)
- [x] `index.html` — DS Vault 카드 추가 (Information 카테고리, 판교Pick `</li>` 다음)
- [x] `index.html` — JSON-LD 항목 2건 추가 (`itemListElement` 끝, Tube Player 다음)
- [x] `i18n.js` — `en` 객체에 `project-k-history-desc`, `project-ds-vault-desc` 추가
- [x] `i18n.js` — `ko` 객체에 `project-k-history-desc`, `project-ds-vault-desc` 추가

---

## 파일별 변경 사항 요약

### `D:/github/playgrounder-dev/index.html`

**변경 1 — Educational 카테고리 카드 추가** (FE Roadmaps `</li>` 직후)
- 추가된 `<li>` 블록: K History 프로젝트 카드
  - `href="https://k-history.playgrounder.dev/"`
  - `aria-label="K History project"`
  - `<h4 class="project-name">K History</h4>`
  - `data-i18n="project-k-history-desc"`
- 들여쓰기: 4스페이스, 기존 카드와 동일한 구조

**변경 2 — Information 카테고리 카드 추가** (판교Pick `</li>` 직후)
- 추가된 `<li>` 블록: DS Vault 프로젝트 카드
  - `href="https://ds-vault.playgrounder.dev/"`
  - `aria-label="DS Vault project"`
  - `<h4 class="project-name">DS Vault</h4>`
  - `data-i18n="project-ds-vault-desc"`
- 들여쓰기: 4스페이스, 기존 카드와 동일한 구조

**변경 3 — JSON-LD `itemListElement` 배열 확장** (Tube Player 객체 다음)
- 추가된 객체 1: K History
  - `applicationCategory`: `EducationalApplication`
  - `url`: `https://k-history.playgrounder.dev` (trailing slash 없음, 기존 패턴 준수)
- 추가된 객체 2: DS Vault
  - `applicationCategory`: `UtilityApplication` (사용자 결정에 따른 확정값, 사이트 일관성 우선; K Holidays 등과 동일 패턴)
  - `url`: `https://ds-vault.playgrounder.dev` (trailing slash 없음)
- 두 객체 모두 6개 필드 완비: `@type`, `name`, `url`, `description`, `applicationCategory`, `operatingSystem`

### `D:/github/playgrounder-dev/i18n.js`

**변경 1 — `en` 블록 추가** (`project-tubeplayer-desc` 다음, `copyright` 위)
```javascript
'project-k-history-desc': 'Interactive 5,000-year journey through Korean history with timelines, era maps, and a people encyclopedia.',
'project-ds-vault-desc': 'Ready-to-use design system reference with color tokens, typography, components, and three AI-friendly Markdown templates.',
```

**변경 2 — `ko` 블록 추가** (`project-tubeplayer-desc` 다음, `copyright` 위)
```javascript
'project-k-history-desc': '연대기 타임라인, 시대별 지도, 인물 백과로 떠나는 한국사 5000년 인터랙티브 여행',
'project-ds-vault-desc': '컬러 토큰·타이포·컴포넌트 패턴을 담은 3종 템플릿의 AI 친화적 디자인 시스템 레퍼런스',
```

---

## 의사결정 기록

| 항목 | 결정 | 근거 |
|------|------|------|
| DS Vault `applicationCategory` | `UtilityApplication` | 사용자 확정 — 사이트 일관성 우선. K Holidays/판교Pick 등 정보성 도구 카테고리와 동일 패턴 적용. content-plan에서 `ReferenceApplication` 권장안이 있었으나 신규 카테고리 도입 회피. |
| K History 카드 위치 | Educational ul 끝 (FE Roadmaps 다음) | content-plan 권장 위치, 카테고리 일관성 |
| DS Vault 카드 위치 | Information ul 끝 (판교Pick 다음) | content-plan 권장 위치 |
| JSON-LD 두 항목 위치 | `itemListElement` 배열 끝 (Tube Player 다음) | 사용자 지시 — 시간순/추가순으로 통일 |

---

## 검증 결과 (자동)

- `index.html`: K History/DS Vault 카드 + URL + i18n 키 모두 존재 — PASS
- `i18n.js`: `project-k-history-desc` 2회 출현 (en + ko) — PASS
- `i18n.js`: `project-ds-vault-desc` 2회 출현 (en + ko) — PASS

---

## 발견한 이슈

없음.

content-plan에서 제기된 ⚠️ 이슈(DS Vault `applicationCategory` 미확정)는 사용자 확정으로 해소(`UtilityApplication` 채택).

---

## qa-validator 인계 사항

다음 항목을 교차 검증해주세요:
- [ ] `data-i18n` 키 4건 모두 i18n.js의 `en`/`ko`에 존재 (key-value 일치)
- [ ] `aria-label` 형식: `"K History project"`, `"DS Vault project"` — content-plan 패턴 준수 확인
- [ ] JSON-LD 두 객체 6개 필드 완비
- [ ] 카드 표시명 ↔ JSON-LD `name` 일치 (K History / DS Vault)
- [ ] URL trailing slash 일관성:
  - 카드 href: `https://k-history.playgrounder.dev/`, `https://ds-vault.playgrounder.dev/` (`/` 끝)
  - JSON-LD url: `https://k-history.playgrounder.dev`, `https://ds-vault.playgrounder.dev` (`/` 없음)
- [ ] 한글 번역 자연스러움 (직역 회피)
- [ ] 들여쓰기 (4스페이스) 및 기존 코드 스타일 일관성
