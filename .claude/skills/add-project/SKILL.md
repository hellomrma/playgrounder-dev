---
name: add-project
description: playgrounder.dev에 새 프로젝트를 추가하는 오케스트레이터 스킬. 새 프로젝트 추가, 포트폴리오에 프로젝트 등록, 사이트에 서비스 추가, 프로젝트 카드 생성, 다시 추가, 재실행, 수정 보완 등의 요청 시 반드시 이 스킬을 사용할 것. content-planner → code-implementer → qa-validator 파이프라인으로 index.html, i18n.js, JSON-LD를 동시에 수정한다.
---

# Add Project — 오케스트레이터

playgrounder.dev에 새 프로젝트를 추가하는 전체 워크플로우를 조율한다.
3개의 에이전트가 파이프라인으로 협업하여 index.html, i18n.js, JSON-LD를 빠짐없이 수정한다.

## Phase 0: 컨텍스트 확인

시작 전 `_workspace/` 디렉토리 존재 여부를 확인한다:

- `_workspace/` **없음** → **초기 실행**: 전체 파이프라인 실행
- `_workspace/` **있음** + 사용자가 재수정 요청 → **후속 실행**: 해당 에이전트만 재호출
  - "설명 다시 써줘" → content-planner만 재실행 후 implementer, qa 순차 재실행
  - "QA만 다시 해줘" → qa-validator만 재실행
- `_workspace/` **있음** + 완전히 새 프로젝트 → 기존 `_workspace/`를 `_workspace_prev/`로 이동 후 초기 실행

## Phase 1: 입력 수집

사용자로부터 다음 정보를 수집한다:
- **프로젝트 이름** (필수)
- **프로젝트 URL** (필수)
- **프로젝트 설명** (선택)
- **카테고리** (선택: Educational / Information / PoC / Interactive)

URL이 없으면 작업을 시작하지 말고 URL을 먼저 요청한다.

## Phase 2: content-planner 실행

```
Agent(
  subagent_type: "general-purpose",
  model: "opus",
  prompt: "
    agents/content-planner.md의 역할에 따라 다음 프로젝트의 콘텐츠를 기획하라.
    
    프로젝트 정보:
    - 이름: {name}
    - URL: {url}
    - 설명: {description}
    - 카테고리: {category}
    
    현재 프로젝트의 index.html, i18n.js를 읽어 기존 패턴을 분석하고,
    _workspace/01_content-plan.md를 생성하라.
    
    프로젝트 루트: D:/github/playgrounder-dev
  "
)
```

content-planner 완료 후 `_workspace/01_content-plan.md` 존재를 확인한다.

## Phase 3: code-implementer 실행

```
Agent(
  subagent_type: "general-purpose",
  model: "opus",
  prompt: "
    agents/code-implementer.md의 역할에 따라 파일을 수정하라.
    
    _workspace/01_content-plan.md를 읽고,
    index.html (프로젝트 카드 + JSON-LD) 및 i18n.js (en + ko)를 수정하라.
    수정 완료 후 _workspace/02_implementation-report.md를 생성하라.
    
    프로젝트 루트: D:/github/playgrounder-dev
  "
)
```

## Phase 4: qa-validator 실행

```
Agent(
  subagent_type: "general-purpose",
  model: "opus",
  prompt: "
    agents/qa-validator.md의 역할에 따라 수정된 파일을 검증하라.
    
    index.html과 i18n.js를 직접 읽어 다음을 교차 검증하라:
    - i18n 키 완전성 (en + ko 모두)
    - JSON-LD 구조 및 구문
    - 접근성 속성 (aria-label, rel)
    - 카드-번역-JSON-LD 3자 일관성
    
    _workspace/03_qa-report.md를 생성하라.
    
    프로젝트 루트: D:/github/playgrounder-dev
  "
)
```

## Phase 5: 결과 보고

`_workspace/03_qa-report.md`를 읽어 결과를 사용자에게 보고한다.

**PASS 시:**
```
✅ 프로젝트 추가 완료: {name}

수정된 파일:
- index.html — 프로젝트 카드 추가 ({category} 섹션)
- index.html — JSON-LD 항목 추가
- i18n.js — en/ko 번역 추가

로컬 확인: python -m http.server 8000
```

**FAIL 시:**
- QA 리포트의 문제점을 사용자에게 보여준다
- code-implementer에게 재수정 요청 (1회)
- 재수정 후 qa-validator 재실행

## 에러 핸들링

| 상황 | 처리 |
|------|------|
| content-planner 산출물 없음 | Phase 2 재실행 1회, 재실패 시 사용자에게 보고 |
| 카테고리 섹션 없음 | 사용자에게 카테고리 확인 요청 |
| JSON 구문 오류 | code-implementer에게 JSON만 재수정 요청 |
| i18n 키 중복 | 사용자에게 확인 후 덮어쓸지 결정 |

## 테스트 시나리오

### 정상 흐름
1. "Tube Player 프로젝트를 추가해줘. URL은 https://tubeplayer.playgrounder.dev, 카테고리는 Interactive"
2. content-planner → 01_content-plan.md 생성
3. code-implementer → index.html, i18n.js 수정, 02_implementation-report.md 생성
4. qa-validator → PASS, 03_qa-report.md 생성
5. "✅ 프로젝트 추가 완료" 보고

### 에러 흐름
1. URL 없이 "새 프로젝트 추가해줘" → URL 요청
2. 카테고리 불명확 → 후보 2개 제시 후 확인
3. QA FAIL → 문제 항목 보고 및 자동 재수정
