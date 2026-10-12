# Content Plan

## 프로젝트 기본 정보
- name: Between
- url: https://between.playgrounder.dev
- slug: between
- category: PoC (사용자 확정)

## 기존 패턴 분석 요약
- PoC 섹션 현재 순서: 3D Models -> My Perfect Vacation (추가 순서대로 나열됨)
- 새 카드 위치: PoC `<ul class="projects-grid">`의 마지막 (My Perfect Vacation 카드 다음)
- EN 설명: 대문자로 시작하는 명사구/동사구 1문장. 짧은 항목(PoC/Interactive)은 마침표 없음 (예: "Personalized trip planner for designing your perfect vacation")
- KO 설명: 명사형 종결, 마침표 없음 (예: "나만의 완벽한 휴가를 설계하는 맞춤형 여행 플래너")
- JSON-LD applicationCategory는 화면 카테고리명이 아니라 schema.org 값 사용 (PoC 항목: 3D Models=MultimediaApplication, My Perfect Vacation=UtilityApplication). "PoCApplication"은 존재하지 않는 값이므로 사용하지 않는다.

## i18n 콘텐츠
- key: project-between-desc
- en: "Translated messenger that lets Korean and Japanese speakers chat in their own language"
- ko: "말은 달라도 이야기는 이어지도록, 한국어·일본어 사용자를 잇는 번역 메신저"
- 참고: 태그라인 "말은 달라도, 이야기는 이어지도록."을 KO 설명 앞부분에 녹였다. 위치는 i18n.js의 en/ko 객체 각각 마지막 키(`project-japan-master-desc`) 다음.

## HTML 카드
```html
<li>
    <a href="https://between.playgrounder.dev/"
       class="project-card"
       target="_blank"
       rel="noopener noreferrer"
       aria-label="Between project">
        <h4 class="project-name">Between</h4>
        <p class="project-description" data-i18n="project-between-desc">
            Translated messenger that lets Korean and Japanese speakers chat in their own language
        </p>
    </a>
</li>
```

## aria-label
- value: "Between project"

## JSON-LD
- 위치: itemListElement 배열의 마지막 (Japan Master 다음)
- @type: SoftwareApplication
- name: Between
- url: https://between.playgrounder.dev
- description: Translated messenger that lets Korean and Japanese speakers chat in their own language
- applicationCategory: CommunicationApplication
  - 템플릿의 `[Category]Application` 규칙 대신 schema.org 표준 값 사용 (기존 PoC 항목도 Multimedia/Utility를 사용 중). 메신저 성격에 맞는 CommunicationApplication 선택.
- operatingSystem: Web Browser

```json
{
    "@type": "SoftwareApplication",
    "name": "Between",
    "url": "https://between.playgrounder.dev",
    "description": "Translated messenger that lets Korean and Japanese speakers chat in their own language",
    "applicationCategory": "CommunicationApplication",
    "operatingSystem": "Web Browser"
}
```

## CLAUDE.md 업데이트
- 1장 "프로젝트 카테고리"의 PoC 줄:
  - 변경 전: `- **PoC**: 3D Models, My Perfect Vacation`
  - 변경 후: `- **PoC**: 3D Models, My Perfect Vacation, Between`
- 1장 "서브 프로젝트 URL" 목록 마지막(`https://japan-master.playgrounder.dev` 다음)에 추가:
  - `- https://between.playgrounder.dev`

## 수정 대상 체크리스트
- [ ] index.html - PoC 섹션 마지막에 카드 추가
- [ ] index.html - JSON-LD itemListElement 마지막에 추가
- [ ] i18n.js - en `project-between-desc` 추가
- [ ] i18n.js - ko `project-between-desc` 추가
- [ ] CLAUDE.md - 카테고리 목록 및 서브 프로젝트 URL 추가
