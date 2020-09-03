import Vue from 'vue';
import VueI18n from 'vue-i18n';

import messagesEn from './i18n/messages-en';

Vue.use(VueI18n);

const messages = {
  en: {
    messages: messagesEn,
  },
};

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en',
  messages, // set locale messages
});

export default i18n;