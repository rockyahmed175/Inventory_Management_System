import i18n from '../i18n/i18n';

export function setLanguage(lang) {
  i18n.changeLanguage(lang);
  localStorage.setItem('appLanguage', lang);
}

export function getLanguage() {
  return localStorage.getItem('appLanguage') || 'en';
}
