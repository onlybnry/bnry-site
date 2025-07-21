let translations = {};

async function loadTranslations(lang) {
    const res = await fetch('translations.json');
    translations = await res.json();
    applyTranslations(lang);
}

function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('lang') || 'en';
    document.getElementById('languageSelector').value = lang;
    loadTranslations(lang);
});

document.getElementById('languageSelector').addEventListener('change', e => {
    const lang = e.target.value;
    localStorage.setItem('lang', lang);
    loadTranslations(lang);
});

