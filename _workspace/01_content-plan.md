# Content Plan

## 프로젝트 기본 정보
- name: Japan Master
- url: https://japan-master.playgrounder.dev
- slug: japan-master
- category: Educational

### 이름 결정 근거
- 사이트 `<title>`/h1은 한국어 표기 "자팬 마스타"이며, 영문 표기는 "Japan Master" (서브도메인 `japan-master`와 일치).
- 카드 표시명은 서브도메인·기존 영문 카드명 관례(C# Tutorials, K History 등)에 맞춰 **Japan Master**로 한다.
- 참고: 판교Pick처럼 한국어 이름을 그대로 쓰는 선례도 있으므로, 사용자가 "자팬 마스타"를 원하면 name / aria-label / JSON-LD name 3곳만 교체하면 된다.

### 카테고리 결정 근거
- 사이트 조사 결과(WebFetch): 한국어 사용자를 위한 일본어·일본 문화 학습 플랫폼.
  - 히라가나/가타카나부터 JLPT N1까지 145개 언어 코스, 3,663개 단어(레벨별), 153개 상황별 표현
  - 문화 176편, 음식 52편, 지역 63편, 실용 가이드 95편, 역사(연표·시대·인물)
  - 모든 주제를 초급/중급/고급 3단계로 제공
- 핵심 목적이 "학습"이므로 **Educational**. 같은 계열의 K History(학습 + 백과형 콘텐츠)와 성격이 가장 가깝다.
- Information(정보 제공)도 일부 해당되나 JLPT 레벨별 커리큘럼 구조상 Educational이 명확하므로 확인 불필요로 판단.

## 카드 위치 (index.html)
- 섹션: `<div class="category-group" data-category="educational">` 내 `<ul class="projects-grid">`
- 순서: 기존 3개(C# Tutorials → FE Roadmaps → K History) 뒤, **4번째(마지막)** — K History `<li>` 바로 다음
- 카드 마크업:

```html
                    <li>
                        <a href="https://japan-master.playgrounder.dev/"
                           class="project-card"
                           target="_blank"
                           rel="noopener noreferrer"
                           aria-label="Japan Master project">
                            <h4 class="project-name">Japan Master</h4>
                            <p class="project-description" data-i18n="project-japan-master-desc">
                                Learn Japanese in Korean, from kana to JLPT N1, plus culture, food, regions, and history.
                            </p>
                        </a>
                    </li>
```

## i18n 콘텐츠
- key: project-japan-master-desc
- en: "Learn Japanese in Korean, from kana to JLPT N1, plus culture, food, regions, and history."
- ko: "히라가나부터 JLPT N1까지, 일본어와 함께 문화·음식·지역·역사를 한국어로 배우는 일본 학습 가이드"

### i18n 삽입 위치 (i18n.js)
- en 객체: `'project-game-calendar-desc'` 줄 바로 다음 (현재 25행 뒤)
- ko 객체: `'project-game-calendar-desc'` 줄 바로 다음 (현재 49행 뒤)
- 기존 키 추가 순서(추가 시점순)를 따라 마지막에 붙인다.

### 톤·길이 근거
- 기존 EN 설명: 5~17단어. 최근 항목(K History, DS Vault)은 구체적 기능 나열 + 마침표 스타일 → 이를 따라 마침표 포함.
- 기존 KO 설명: 명사형 종결("~여행", "~레퍼런스", "~플레이어"), 가운뎃점(·) 나열 사용 → 동일하게 적용.

## aria-label
- value: "Japan Master project"

## JSON-LD
- 위치: `mainEntity.itemListElement` 배열 **맨 끝**(Game Calendar 다음), 배열 인덱스상 **14번째 항목(position 14)**
  - 참고: 기존 항목들에는 `position` 속성이 없고 배열 순서(추가 순)만 쓰고 있으므로, 일관성을 위해 `position` 속성은 추가하지 않는다. Game Calendar 항목 `}` 뒤에 `,` 추가 필요.
- @type: SoftwareApplication
- name: Japan Master
- url: https://japan-master.playgrounder.dev
- description: Learn Japanese in Korean, from kana to JLPT N1, plus culture, food, regions, and history.
- applicationCategory: EducationalApplication
- operatingSystem: Web Browser

```json
          {
            "@type": "SoftwareApplication",
            "name": "Japan Master",
            "url": "https://japan-master.playgrounder.dev",
            "description": "Learn Japanese in Korean, from kana to JLPT N1, plus culture, food, regions, and history.",
            "applicationCategory": "EducationalApplication",
            "operatingSystem": "Web Browser"
          }
```

## 부가 반영 제안 (선택, code-implementer 판단)
- index.html `<meta name="keywords">`: 기존에 각 프로젝트 주제어가 들어가 있으므로 `Japanese learning, JLPT` 추가 권장 (`game release calendar,` 다음)
- index.html `<meta name="topic">`: `Japanese Learning` 추가 권장 (`Game Release Calendar` 다음)
- CLAUDE.md: "프로젝트 카테고리 > Educational"에 Japan Master 추가, "서브 프로젝트 URL"에 `https://japan-master.playgrounder.dev` 추가
