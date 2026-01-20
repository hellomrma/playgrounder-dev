# CLAUDE.md

이 파일은 Claude Code가 프로젝트를 이해하고 일관된 방식으로 작업하기 위한 가이드입니다.

---

## 1. 프로젝트 기본 컨텍스트

### 개요
**playgrounder.dev**는 다양한 웹 서비스 프로젝트들을 소개하는 개인 포트폴리오 랜딩 페이지입니다.

### 기본 정보
- **사이트 URL**: https://playgrounder.dev
- **작성자**: hellomrma (Gwang Seub Ma)
- **기술 스택**: 순수 HTML/CSS/JavaScript (빌드 도구 없음)
- **타입**: 정적 웹사이트

### 주요 기능
| 기능 | 파일 | 설명 |
|------|------|------|
| 다국어 지원 | `i18n.js` | 영어/한국어 전환, localStorage 저장 |
| 배경 애니메이션 | `script.js` | Canvas 파티클 시스템 |
| SEO | `index.html` | JSON-LD 구조화 데이터, 메타 태그 |

### 프로젝트 카테고리
- **Educational**: C# Tutorials, FE Roadmaps
- **Information**: K Holidays
- **PoC**: 3D Models
- **Interactive**: IUI Put Your Hands Up

### 서브 프로젝트 URL
- https://csharp-tutorials.playgrounder.dev
- https://fe-roadmaps.playgrounder.dev
- https://k-holidays.playgrounder.dev
- https://3d-models.playgrounder.dev
- https://iui-putyourhandsup.playgrounder.dev

---

## 2. 개발 철학 / 작업 원칙

### 핵심 원칙
1. **단순함 유지**: 빌드 도구 없이 순수 HTML/CSS/JS만 사용
2. **성능 우선**: 최소한의 리소스로 빠른 로딩
3. **접근성 준수**: 모든 사용자가 이용 가능하도록 설계
4. **SEO 최적화**: 검색 엔진과 AI 엔진 모두 고려

### 작업 시 고려사항
- 새 기능 추가 시 기존 패턴을 따를 것
- 불필요한 라이브러리/프레임워크 도입 금지
- 변경 사항은 반드시 다국어(영어/한국어) 모두 반영

---

## 3. 코드 스타일 & 컨벤션

### HTML
- 시맨틱 태그 사용 (`<main>`, `<section>`, `<nav>`, `<footer>`)
- 접근성 속성 필수 (`aria-label`, `role`)
- `data-i18n` 속성으로 번역 대상 지정

### CSS
- 색상값은 hex 코드 사용 (`#ffffff`, `#1a1a1a`)
- 미디어 쿼리 브레이크포인트: `768px`
- 클래스 네이밍: kebab-case (`project-card`, `category-title`)
- 트랜지션: `0.2s` 기본값

### JavaScript
- IIFE 패턴으로 전역 오염 방지
- 상수는 UPPER_SNAKE_CASE
- 함수/변수는 camelCase
- 주석은 JSDoc 스타일

### 들여쓰기
- HTML/CSS/JS 모두 4스페이스

---

## 4. 폴더 구조 가이드

```
/
├── index.html      # 메인 HTML (SEO 메타, JSON-LD 포함)
├── style.css       # 전체 스타일시트
├── script.js       # Canvas 파티클 애니메이션
├── i18n.js         # 다국어 번역 시스템
├── README.md       # 프로젝트 설명
├── CLAUDE.md       # Claude Code 가이드 (현재 파일)
└── favicon.*       # 파비콘 파일들
```

### 파일별 책임
| 파일 | 책임 |
|------|------|
| `index.html` | 구조, SEO, 콘텐츠 |
| `style.css` | 모든 스타일링 |
| `script.js` | 배경 애니메이션만 담당 |
| `i18n.js` | 번역 데이터 및 언어 전환 로직 |

---

## 5. 금지 사항 (Do Not List)

### 절대 하지 말 것
- ❌ npm, webpack, vite 등 빌드 도구 도입
- ❌ React, Vue 등 프레임워크 사용
- ❌ 외부 CDN 라이브러리 추가
- ❌ 인라인 스타일 사용
- ❌ `!important` 남용
- ❌ `var` 키워드 사용 (let, const만 사용)
- ❌ 영어만 추가하고 한국어 번역 누락
- ❌ JSON-LD 구조화 데이터 업데이트 누락

### 피해야 할 것
- ⚠️ 과도한 애니메이션 추가
- ⚠️ body에 `overflow: hidden` 사용 (스크롤 막힘)
- ⚠️ 하드코딩된 텍스트 (i18n 사용할 것)

---

## 6. Claude의 역할과 응답 방식 정의

### 역할
- 이 프로젝트의 코드 스타일과 패턴을 이해하고 일관성 있게 작업
- 새 프로젝트/기능 추가 시 기존 구조 준수
- 다국어, SEO, 접근성을 항상 고려

### 응답 방식
1. **코드 수정 시**: 관련된 모든 파일 함께 수정
   - 예: 새 프로젝트 추가 → `index.html` + `i18n.js` + (필요시 `CLAUDE.md`)
2. **질문에 답변 시**: 간결하게, 코드 예시 포함
3. **문제 발견 시**: 즉시 알리고 해결책 제안

### 작업 체크리스트 (새 프로젝트 추가 시)
```
□ index.html - 카테고리 섹션에 프로젝트 카드 추가
□ index.html - JSON-LD itemListElement에 추가
□ i18n.js - 영어 번역 추가
□ i18n.js - 한국어 번역 추가
□ CLAUDE.md - 서브 프로젝트 URL 추가 (필요시)
```

---

## 7. 리뷰 / 운영 기준

### 코드 품질 기준
- [ ] 모든 텍스트가 i18n 처리되어 있는가?
- [ ] 접근성 속성이 포함되어 있는가?
- [ ] 반응형 디자인이 적용되어 있는가?
- [ ] 기존 코드 스타일과 일관성이 있는가?

### 배포 전 확인사항
- [ ] 영어/한국어 전환 시 모든 텍스트 정상 표시
- [ ] 모바일(768px 이하)에서 레이아웃 정상
- [ ] 스크롤 정상 동작
- [ ] Canvas 애니메이션 성능 이상 없음

### 테스트 방법
```bash
# 로컬 서버 실행
python -m http.server 8000
# 또는
npx serve
```

---

## 8. 프로젝트 공통 패턴 및 관례

### 다국어 처리 패턴
```html
<!-- HTML에서 -->
<p data-i18n="key-name">Default English Text</p>
```
```javascript
// i18n.js에서
const translations = {
    en: { 'key-name': 'English Text' },
    ko: { 'key-name': '한국어 텍스트' }
};
```

### 프로젝트 카드 패턴
```html
<li>
    <a href="https://[project].playgrounder.dev/"
       class="project-card"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="[Project Name] project">
        <h4 class="project-name">[Project Name]</h4>
        <p class="project-description" data-i18n="project-[key]-desc">
            [Description in English]
        </p>
    </a>
</li>
```

### JSON-LD 프로젝트 패턴
```json
{
    "@type": "SoftwareApplication",
    "name": "[Project Name]",
    "url": "https://[project].playgrounder.dev",
    "description": "[Description]",
    "applicationCategory": "[Category]Application",
    "operatingSystem": "Web Browser"
}
```

### 카테고리 추가 패턴
```html
<div class="category-group">
    <h3 class="category-title" data-i18n="category-[name]">[Category Name]</h3>
    <ul class="projects-grid">
        <!-- 프로젝트 카드들 -->
    </ul>
</div>
```

### 색상 팔레트
| 용도 | 색상 |
|------|------|
| 배경 (body) | `#000000` |
| 컨테이너 배경 | `#1a1a1a` |
| 카드 배경 | `#0a0a0a` |
| 테두리 | `#333333` |
| 호버 테두리 | `#555555` |
| 텍스트 (기본) | `#ffffff` |
| 텍스트 (보조) | `#cccccc` |
| 텍스트 (약한) | `#bbbbbb` |
