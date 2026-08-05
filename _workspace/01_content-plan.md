# Content Plan

작성일: 2026-04-30
대상: playgrounder.dev 신규 프로젝트 2건 추가 (K History, DS Vault)

---

## 분석 요약 (기존 패턴)

### i18n 키 네이밍
- 형식: `project-{slug}-desc`
- 슬러그는 카드 표시명 기반 kebab-case (예: `tubeplayer`, `pangyo-pick`, `snap-rush`)
- 새 프로젝트도 동일 컨벤션 적용

### 영문 설명 톤
- 길이: 8~12 단어 (1줄)
- 구조: "{핵심 가치/대상} — {부가 정보}" 또는 짧은 명사구
- 예시 톤:
  - "Roulette-based lunch and dinner spot recommendations near Pangyo Techno Valley"
  - "Fast-paced reflex game — catch targets and compete on the leaderboard"
  - "YouTube playlist player with a clean, distraction-free interface"

### 한글 설명 톤
- 자연스러운 한국어 (직역 아님)
- 종결: 명사형 종결("~서비스", "~플레이어", "~로드맵") 또는 동명사("~확인하기", "~상호작용하기")
- 길이: 영문보다 짧거나 비슷한 수준

### applicationCategory 사용 분포
| 값 | 사용 예 |
|----|---------|
| EducationalApplication | C# Tutorials, FE Roadmaps |
| MultimediaApplication | 3D Models, IUI, Tube Player |
| UtilityApplication | K Holidays, Weekly AI Article, Now Weather, 판교Pick |
| GameApplication | Snap Rush |

→ 신규 프로젝트도 이 4종 내에서 선택 (새 값 도입 회피)

---

## 프로젝트 1: K History

### 기본 정보
- **name (카드 h4)**: `K History`
- **url**: `https://k-history.playgrounder.dev/`
- **slug**: `k-history`
- **i18n key**: `project-k-history-desc`
- **카테고리**: Educational
- **카드 삽입 위치**: `index.html` 의 `<div class="category-group" data-category="educational">` 내부 `<ul class="projects-grid">`. 기존 두 항목(C# Tutorials, FE Roadmaps) 다음, 즉 `</ul>` (line 231) 직전에 새로운 `<li>` 추가.

### 콘텐츠
- **영문 description (15단어)**:
  > Interactive 5,000-year journey through Korean history with timelines, era maps, and a people encyclopedia.
- **한글 description**:
  > 연대기 타임라인, 시대별 지도, 인물 백과로 떠나는 한국사 5000년 인터랙티브 여행

### JSON-LD 메타데이터
- **applicationCategory**: `EducationalApplication`
- **operatingSystem**: `Web Browser`
- **JSON-LD 삽입 위치**: `itemListElement` 배열에서 기존 EducationalApplication 그룹 부근. 권장 위치는 `FE Roadmaps` 항목(끝나는 라인 113) 다음, K Holidays 객체 시작(line 114) 직전 — 즉 같은 EducationalApplication끼리 인접.

```json
{
  "@type": "SoftwareApplication",
  "name": "K History",
  "url": "https://k-history.playgrounder.dev",
  "description": "Interactive 5,000-year journey through Korean history with timelines, era maps, and a people encyclopedia.",
  "applicationCategory": "EducationalApplication",
  "operatingSystem": "Web Browser"
}
```

### HTML 카드 스니펫 (참고용)

```html
<li>
    <a href="https://k-history.playgrounder.dev/"
       class="project-card"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="K History project">
        <h4 class="project-name">K History</h4>
        <p class="project-description" data-i18n="project-k-history-desc">
            Interactive 5,000-year journey through Korean history with timelines, era maps, and a people encyclopedia.
        </p>
    </a>
</li>
```

---

## 프로젝트 2: DS Vault

### 기본 정보
- **name (카드 h4)**: `DS Vault`
- **url**: `https://ds-vault.playgrounder.dev/`
- **slug**: `ds-vault`
- **i18n key**: `project-ds-vault-desc`
- **카테고리**: Information
- **카드 삽입 위치**: `index.html` 의 `<div class="category-group" data-category="information">` 내부 `<ul class="projects-grid">`. 기존 마지막 항목(판교Pick) 다음, 즉 `</ul>` (line 285) 직전에 새로운 `<li>` 추가.

### 콘텐츠
- **영문 description (16단어)**:
  > Ready-to-use design system reference with color tokens, typography, components, and three AI-friendly Markdown templates.
- **한글 description**:
  > 컬러 토큰·타이포·컴포넌트 패턴을 담은 3종 템플릿의 AI 친화적 디자인 시스템 레퍼런스

### JSON-LD 메타데이터
- **applicationCategory**: `ReferenceApplication` ⚠️ 신규 값 도입 가능성 검토 필요
- **operatingSystem**: `Web Browser`

⚠️ **카테고리 확인 필요 (applicationCategory)**: 기존 사이트는 Educational/Multimedia/Utility/Game 4종만 사용 중. DS Vault는 "참고/레퍼런스" 성격이라 schema.org 표준 값 `ReferenceApplication`이 가장 정확하나, 일관성을 위해 `UtilityApplication`로 통일하는 안도 유효함.
- **권장안 (1순위)**: `ReferenceApplication` — 의미적으로 가장 정확
- **대안 (2순위)**: `UtilityApplication` — 사이트 일관성 우선

→ code-implementer 단계에서 사용자 결정에 따라 둘 중 하나 선택. 본 문서는 **`ReferenceApplication` 기준**으로 작성한다.

- **JSON-LD 삽입 위치**: `itemListElement` 배열의 끝, 기존 `Tube Player` 객체(끝나는 line 161) 다음에 새 객체 추가. (또는 같은 Information 계열인 판교Pick 항목 뒤도 의미적으로 적합)

```json
{
  "@type": "SoftwareApplication",
  "name": "DS Vault",
  "url": "https://ds-vault.playgrounder.dev",
  "description": "Ready-to-use design system reference with color tokens, typography, components, and three AI-friendly Markdown templates.",
  "applicationCategory": "ReferenceApplication",
  "operatingSystem": "Web Browser"
}
```

### HTML 카드 스니펫 (참고용)

```html
<li>
    <a href="https://ds-vault.playgrounder.dev/"
       class="project-card"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="DS Vault project">
        <h4 class="project-name">DS Vault</h4>
        <p class="project-description" data-i18n="project-ds-vault-desc">
            Ready-to-use design system reference with color tokens, typography, components, and three AI-friendly Markdown templates.
        </p>
    </a>
</li>
```

---

## i18n.js 추가 항목 요약

### `en` 블록에 추가
```javascript
'project-k-history-desc': 'Interactive 5,000-year journey through Korean history with timelines, era maps, and a people encyclopedia.',
'project-ds-vault-desc': 'Ready-to-use design system reference with color tokens, typography, components, and three AI-friendly Markdown templates.',
```

### `ko` 블록에 추가
```javascript
'project-k-history-desc': '연대기 타임라인, 시대별 지도, 인물 백과로 떠나는 한국사 5000년 인터랙티브 여행',
'project-ds-vault-desc': '컬러 토큰·타이포·컴포넌트 패턴을 담은 3종 템플릿의 AI 친화적 디자인 시스템 레퍼런스',
```

### 키 위치 권장
- `en` 블록: 기존 `project-tubeplayer-desc` 다음 줄(line 22 직후)
- `ko` 블록: 기존 `project-tubeplayer-desc` 다음 줄(line 43 직후)

---

## 다음 단계 (code-implementer 인계 사항)

1. `index.html` line 231 직전에 K History 카드 `<li>` 삽입
2. `index.html` line 285 직전에 DS Vault 카드 `<li>` 삽입
3. `index.html` JSON-LD itemListElement에 두 객체 추가 (K History는 line 113 이후, DS Vault는 line 161 이후 권장)
4. `i18n.js` en/ko 양쪽에 두 키 추가
5. ⚠️ DS Vault의 `applicationCategory` 최종값을 사용자에게 재확인 (`ReferenceApplication` vs `UtilityApplication`)

## QA 체크포인트 (qa-validator 인계 사항)
- [ ] data-i18n 키 4개 (EN 2 + KO 2) 모두 추가되었는가?
- [ ] aria-label이 "K History project" / "DS Vault project" 형식인가?
- [ ] JSON-LD 두 객체 모두 `@type`, `name`, `url`, `description`, `applicationCategory`, `operatingSystem` 6개 필드 완비?
- [ ] 카드 표시명과 JSON-LD `name` 값이 일치하는가? (K History / DS Vault)
- [ ] URL의 trailing slash 일관성: 카드 href는 `/`로 끝나고, JSON-LD url은 `/` 없음 (기존 패턴 준수)
