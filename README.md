# playgrounder.dev

> Turn Ideas into Web Services

다양한 아이디어를 실험하고 웹 서비스로 만들어보는 개인 포트폴리오 랜딩 페이지입니다.

- **사이트**: https://playgrounder.dev
- **작성자**: [hellomrma](https://github.com/hellomrma) (Gwang Seub Ma)

---

## 기능

| 기능 | 설명 |
|------|------|
| **다국어** | 영어/한국어 전환, 선택 언어 localStorage 저장 |
| **배경 애니메이션** | Canvas 기반 파티클·연결선 애니메이션 |
| **SEO** | JSON-LD 구조화 데이터, Open Graph, Twitter Card, GEO(Generative Engine Optimization) |
| **접근성** | 시맨틱 HTML, `aria-label`, 스킵 링크, 키보드 네비게이션 지원 |

---

## Playground 아이템

| 카테고리 | 프로젝트 | URL |
|----------|----------|-----|
| Educational | C# Tutorials | https://csharp-tutorials.playgrounder.dev |
| Educational | FE Roadmaps | https://fe-roadmaps.playgrounder.dev |
| Information | K Holidays | https://k-holidays.playgrounder.dev |
| PoC | 3D Models | https://3d-models.playgrounder.dev |
| Interactive | IUI Put Your Hands Up | https://iui-putyourhandsup.playgrounder.dev |

---

## 기술 스택

- **HTML / CSS / JavaScript** (빌드 도구 없음, 정적 사이트)
- **Canvas API** (배경 파티클 애니메이션)

---

## 프로젝트 구조

```
├── index.html    # 메인 HTML, SEO 메타, JSON-LD
├── style.css     # 스타일시트
├── script.js     # Canvas 파티클 애니메이션
├── i18n.js       # 다국어(영/한) 번역 및 전환
├── README.md
└── favicon.*     # 파비콘
```

---

## 로컬 실행

```bash
# Python
python -m http.server 8000

# 또는 Node.js (npx serve)
npx serve
```

이후 브라우저에서 `http://localhost:8000` 접속.

---

## 라이선스

© 2025 hellomrma. All rights reserved.
