// Internationalization (i18n) for playgrounder.dev

const translations = {
    en: {
        'about': 'About',
        'tagline': 'Turn Ideas into Web Services',
        'description': 'A project where I experiment with various ideas and turn them into web services.<br>I explore new technologies and create creative solutions.',
        'projects-title': 'Playground items',
        'project-csharp-desc': 'Interactive C# programming tutorials and examples',
        'project-3d-desc': 'Explore and interact with 3D models in the browser',
        'project-iui-desc': 'Interactive UI experiment with hand gesture recognition',
        'project-fe-desc': 'Frontend development learning paths and roadmaps',
        'copyright': '© 2025 hellomrma. All rights reserved.'
    },
    ko: {
        'about': '소개',
        'tagline': '아이디어를 웹 서비스로',
        'description': '다양한 아이디어를 실험하고 웹 서비스로 만들어보는 프로젝트입니다.<br>새로운 기술을 탐구하고 창의적인 솔루션을 만들어갑니다.',
        'projects-title': '플레이그라운드 아이템',
        'project-csharp-desc': '인터랙티브한 C# 프로그래밍 튜토리얼과 예제',
        'project-3d-desc': '브라우저에서 3D 모델을 탐색하고 상호작용하기',
        'project-iui-desc': '손 제스처 인식을 활용한 인터랙티브 UI 실험',
        'project-fe-desc': '프론트엔드 개발 학습 경로와 로드맵',
        'copyright': '© 2025 hellomrma. All rights reserved.'
    }
};

let currentLang = localStorage.getItem('lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            element.innerHTML = translations[lang][key];
        }
    });
    
    // Update language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = lang === 'en' ? 'KO' : 'EN';
        langToggle.setAttribute('aria-label', lang === 'en' ? 'Switch to Korean' : 'Switch to English');
    }
}

function toggleLanguage() {
    const newLang = currentLang === 'en' ? 'ko' : 'en';
    setLanguage(newLang);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    setLanguage(currentLang);
    
    // Add event listener to language toggle button
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.addEventListener('click', toggleLanguage);
    }
});

