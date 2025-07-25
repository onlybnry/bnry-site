
document.addEventListener("DOMContentLoaded", () => {
    const defaultLang = localStorage.getItem("lang") || "en";
    setLanguage(defaultLang);

    // dropdown logic
    const flags = document.querySelectorAll(".lang-option");
    flags.forEach(flag => {
        flag.addEventListener("click", () => {
            const lang = flag.getAttribute("data-lang");
            localStorage.setItem("lang", lang);
            setLanguage(lang);
        });
    });
});

function setLanguage(lang) {
    fetch("translations.json")
        .then(res => res.json())
        .then(data => {
            document.querySelectorAll("[data-i18n]").forEach(el => {
                const key = el.getAttribute("data-i18n");
                if (data[lang] && data[lang][key]) {
                    el.innerHTML = data[lang][key];
                }
            });
        });
}
