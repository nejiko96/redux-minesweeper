const localeBundle = {
  en: {
    remain1: '',
    remain2: 'mines',
    timer1: 'time: ',
    timer2: '',
    retry: 'Retry',
    cleared: 'Cleared!',
  },
  ja: {
    remain1: 'あと',
    remain2: '個',
    timer1: '',
    timer2: '秒経過',
    retry: 'もう一回？',
    cleared: 'クリア！',
  },
};

const initLocale = (lang) => localeBundle[lang] ?? localeBundle.en;

export { initLocale };
