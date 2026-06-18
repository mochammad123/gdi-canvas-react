import plugin from 'tailwindcss/plugin';

export default plugin(({ addBase, addComponents }) => {
  addBase({
    '@keyframes scale-up': {
      '0%': { transform: 'scale(0.7)' },
      '100%': { transform: 'scale(1)' },
    },
  });

  addComponents([
    {
      '.modal': {
        overflow: 'auto',
        position: 'fixed !important',
        top: '0',
        bottom: '0',
        outlineStyle: 'none',
        width: '100%',
        height: '100%',
        zIndex: '99999',
        '.modal-dialog': {
          position: 'relative',
          marginTop: '2rem',
          marginBottom: '2rem',
          marginLeft: 'auto',
          marginRight: 'auto',
          '&.centered': {
            top: '50%',
            transform: 'translateY(-50%)',
          },
          '.modal-content': {
            position: 'relative',
            backgroundColor: 'white',
            animation: 'scale-up 0.1s cubic-bezier(0.390, 0.575, 0.565, 1.000)',
            borderRadius: '.25rem',
          },
        },
      },
      '.modal-backdrop': {
        position: 'fixed',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        zIndex: '999',
        backgroundColor: 'rgb(0 0 0 / 0.55)',
      },
      '.modal-open': {
        overflow: 'hidden',
        paddingRight: '17px',
        '.header': {
          right: '17px',
        },
      },
      '.dark .modal-content': {
        backgroundColor: 'var(--black-80)',
        color: 'var(--greyish-semi-white)',
      },
    },
  ]);
});
