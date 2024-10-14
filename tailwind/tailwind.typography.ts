import plugin from 'tailwindcss/plugin';

export default plugin(({ addUtilities }) => {
  const mediaQueryDesktop = '@media (min-width: 1024px)';
  const mediaQueryMobile = '@media (min-width: 320px)';
  const headings = {
    base: {
      'h1,h2,h3,h4,h5,h6': {
        color: 'var(--black-100)',
      },
      'h1,h2,h3,h6': {
        fontWeight: '700',
      },
      'h4,h5': {
        fontWeight: '600',
      },
    },
    desktop: {
      h1: {
        fontSize: '52px',
        lineHeight: '78px',
      },
      h2: {
        fontSize: '41px',
        lineHeight: '61.5px',
      },
      h3: {
        fontSize: '20px',
        lineHeight: '30px',
      },
      h4: {
        fontSize: '20px',
        lineHeight: '30px',
      },
      h5: {
        fontSize: '18px',
        lineHeight: '27px',
      },
      h6: {
        fontSize: '14px',
        lineHeight: '21px',
      },
    },
    mobile: {
      h1: {
        fontSize: '41px',
        lineHeight: '61.5px',
      },
      h2: {
        fontSize: '36px',
        lineHeight: '54px',
      },
      h3: {
        fontSize: '24px',
        lineHeight: '27px',
      },
      h4: {
        fontSize: '32px',
        lineHeight: '30px',
      },
      h5: {
        fontSize: '18px',
        lineHeight: '27px',
      },
      h6: {
        fontSize: '14px',
        lineHeight: '21px',
      },
    },
  };

  const global = {
    '.global-paragraph': {
      fontFamily: `"Source Sans Pro", sans-serif`,
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '24px',
      letterSpacing: '0.24px',
    },
    '.global-strong': {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '700',
      letterSpacing: '0.16px',
      fontFamily: `"Source Sans Pro", sans-serif`,
    },
    'global-desc': {
      fontSize: '14px',
      lineHeight: '21px',
      fontWeight: '400',
      letterSpacing: '0.32px',
      fontFamily: `"Source Sans Pro", sans-serif`,
    },
    '.global-button': {
      fontFamily: `"Open Sans", sans-serif`,
      fontSize: '14px',
      lineHeight: '21px',
      fontWeight: '600',
      letterSpacing: '0.32px',
    },
    '.global-report-title': {
      fontFamily: `"Open Sans", sans-serif`,
      fontSize: '13px',
      lineHeight: '19.5px',
      fontWeight: '700',
    },
    '.global-report-content': {
      fontFamily: `"Open Sans", sans-serif`,
      fontWeight: '400',
      fontSize: '13px',
      lineHeight: '19.5px',
    },
    '.global-hint': {
      fontFamily: `"Open Sans", sans-serif`,
      fontWeight: '700',
      fontSize: '10px',
      lineHeight: '15px ',
      letterSpacing: '0.08px',
    },
    '.global-description': {
      fontFamily: `"Open Sans", sans-serif`,
      fontWeight: '400',
      fontSize: '14px',
      lineHeight: '21px ',
      letterSpacing: '0.2%',
    },
  };

  const typography = [
    {
      // heading
      ...headings.base,

      // global
      ...global,

      // mobile
      [mediaQueryMobile]: {
        ...headings.mobile,
        '.subtitle-1': {
          color: 'var(--black-100)',
          fontFamily: `"Source Sans Pro", sans-serif`,
          fontSize: '20px',
          fontWeight: '400',
          lineHeight: '30px',
        },
        '.subtitle-2': {
          color: 'var(--black-100)',
          fontFamily: `"Source Sans Pro", sans-serif`,
          fontSize: '18px',
          fontWeight: '600',
          lineHeight: '27px',
          letterSpacing: '0.24px',
        },
        '.subtitle-3': {
          color: 'var(--black-100)',
          fontFamily: `"Source Sans Pro", sans-serif`,
          fontSize: '20px',
          fontWeight: '300',
          lineHeight: '30px',
        },
      },
      // desktop
      [mediaQueryDesktop]: {
        ...headings.desktop,
        '.subtitle-1': {
          color: 'var(--black-100)',
          fontFamily: `"Source Sans Pro", sans-serif`,
          fontSize: '23px',
          fontWeight: '400',
          lineHeight: '34.5px',
        },
        '.subtitle-2': {
          color: 'var(--black-100)',
          fontFamily: `"Source Sans Pro", sans-serif`,
          fontSize: '20px',
          fontWeight: '600',
          lineHeight: '30px',
          letterSpacing: '0.24px',
        },
        '.subtitle-3': {
          color: 'var(--black-100)',
          fontFamily: `"Source Sans Pro", sans-serif`,
          fontSize: '24px',
          fontWeight: '300',
          lineHeight: '36px',
        },
      },
    },
  ];

  addUtilities(typography);
});
