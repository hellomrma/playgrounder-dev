---
name: site-audit
description: playgrounder.dev 전체 사이트를 감사하는 스킬. 사이트 점검, 품질 감사, 번역 누락 확인, 접근성 검토, SEO 검토, JSON-LD 검증, 이상한 부분 찾아줘, 리뷰해줘 등의 요청 시 이 스킬을 사용할 것.
---

# Site Audit

playgrounder.dev 전체 파일을 감사하여 품질 문제를 탐지한다.
qa-validator 에이전트를 사용하여 사이트 전체를 점검한다.

## 실행 방식

qa-validator 에이전트를 단독 실행한다 (add-project 파이프라인과 독립적).

```
Agent(
  subagent_type: "general-purpose",
  model: "opus",
  prompt: "
    agents/qa-validator.md의 역할에 따라 playgrounder.dev 전체 사이트를 감사하라.
    
    다음을 모두 점검하라:
    1. index.html의 모든 data-i18n 키가 i18n.js en/ko 양쪽에 존재하는지
    2. i18n.js의 en/ko 키가 완벽히 대칭인지 (한쪽에만 있는 키 탐지)
    3. 모든 프로젝트 카드에 aria-label, rel='noopener noreferrer'가 있는지
    4. JSON-LD의 모든 항목에 필수 필드가 있는지
    5. JSON-LD의 position 번호가 순차적이고 중복 없는지
    6. 카드 URL과 JSON-LD URL이 일치하는지 (3자 일관성)
    
    결과를 사용자에게 직접 보고하라. _workspace/에 저장하지 않아도 된다.
    발견된 문제는 파일명, 줄 번호, 수정 방법을 포함하여 보고하라.
    
    프로젝트 루트: D:/github/playgrounder-dev
  "
)
```

## 출력 형식

```
## Site Audit 결과

### 요약
- 검사한 프로젝트 수: N개
- 발견된 문제: N건
- 상태: 정상 / 주의 필요

### 문제 목록
1. [심각도: 높음/중간/낮음] {문제 설명}
   - 위치: {파일명}
   - 수정 방법: {구체적 방법}

### 권장 사항
[없으면 "사이트 상태가 양호합니다."]
```
