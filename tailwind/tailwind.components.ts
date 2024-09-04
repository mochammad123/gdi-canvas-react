import plugin from 'tailwindcss/plugin';
import tailwindAnimation from './tailwind.animation';

export default plugin(({ addComponents, addUtilities }) => {
  const modalComponent = [
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
            animation: `scale-up 0.1s cubic-bezier(0.390, 0.575, 0.565, 1.000)`,
            borderRadius: '.25rem',
            '@keyframes scale-up': {
              ...tailwindAnimation.keyframes['scale-up'],
            },
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
        '@apply bg-black/55': '',
      },
      '.modal-open': {
        overflow: 'hidden',
        paddingRight: '17px',
        '.header': {
          right: '17px',
        },
      },
    },
  ];

  const tableComponent = [
    {
      '.table-admin': {
        position: 'relative',
        borderCollapse: 'collapse',
        tableLayout: 'fixed',
        '&.separate-border': {
          borderSpacing: 'initial',
          borderCollapse: 'separate',
          'td, th': {
            borderTopWidth: '0',
            borderLeftWidth: '0',
            borderColor: '0.2px',
          },
        },
        '&.stripped-rows': {
          tbody: {
            tr: {
              backgroundColor: 'var(--greyish-semi-white)',
              '&:nth-of-type(odd)': {
                backgroundColor: 'white',
              },
            },
          },
        },
        '&.sticky-header': {
          thead: {
            tr: {
              'th, .th-sort': {
                position: 'sticky',
                top: '-1px',
                backgroundColor: 'var(--greyish-semi-white)',
                zIndex: '50',
                cursor: 'pointer',
              },
            },
          },
        },
        '&.table-hover': {
          tbody: {
            'tr:hover': {
              td: {
                backgroundColor: 'var(--greyish-semi-white)',
              },
            },
          },
        },
        '&.row-cursor-pointer': {
          tbody: {
            tr: {
              cursor: 'pointer',
            },
          },
        },
        tbody: {
          'tr.active-row-navy': {
            'td:not(:has(svg))': {
              backgroundColor: 'var(--navy-100) !important',
              color: 'white',
            },
          },
          'tr.active-row': {
            td: {
              backgroundColor: 'var(--knitto-blue-40) !important',
            },
          },
        },
      },
    },
  ];
  const formUtility = [
    {
      '.form-validated input:invalid, .form-validated input:invalid ~ .input-div': {
        borderColor: '#ef4444',
      },
    },
  ];

  const textUtility = [
    {
      '.input-error-text': {
        color: '#ef4444',
        fontWeight: '500',
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
      },
      '.text-link': {
        color: 'var(--navy-100)',
        textDecoration: 'underline',
      },
    },
  ];

  addUtilities([...formUtility, ...textUtility]);
  addComponents([...modalComponent, ...tableComponent]);
});
