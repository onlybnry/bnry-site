
document.addEventListener("DOMContentLoaded", function () {
  const defaultLang = "en";
  const supportedLangs = ["en", "ru", "es", "de", "fr", "zh", "hi", "ja", "pt", "tr"];
  let currentLang = defaultLang;

  // Попытка взять язык из localStorage или из браузера
  const savedLang = localStorage.getItem("lang");
  const browserLang = navigator.language.slice(0, 2).toLowerCase();
  if (savedLang && supportedLangs.includes(savedLang)) {
    currentLang = savedLang;
  } else if (supportedLangs.includes(browserLang)) {
    currentLang = browserLang;
  }

  // Подгрузка переводов и обновление DOM
  fetch("translations.json")
    .then((res) => res.json())
    .then((translations) => {
      document.querySelectorAll("[data-i18n]").forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[key] && translations[key][currentLang]) {
          el.innerHTML = translations[key][currentLang];
        } else if (translations[key] && translations[key]["en"]) {
          el.innerHTML = translations[key]["en"]; // fallback на английский
        }
      });
    });

  // Обработка смены языка вручную (если добавим меню)
  window.setLanguage = function (lang) {
    if (supportedLangs.includes(lang)) {
      localStorage.setItem("lang", lang);
      location.reload();
    }
  };
});
