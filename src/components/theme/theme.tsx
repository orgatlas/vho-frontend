import type { } from '@mui/material/themeCssVarsAugmentation';
import { alpha } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import 'src/assets/fonts/migra/font.css'
import 'src/assets/fonts/inter/font.css';

const light = '#c2f2ed'
const normal = '#33998f'
const dark = '#02645b'
const error = '#ff5757'
const text_dark = '#373e40'
const text_light = '#f2f2f2'

export const theme = createTheme({
    palette: {
        primary: {
            main: normal,
            dark: dark,
        },
        secondary: {
            main: dark,
            light: light,
        },
        warning: {
            main: error,
        },
        error: {
            main: error
        },
        success: {
            main: normal
        },
        text: {
            primary: text_dark,
            secondary: text_light,
        },
        background: {
            default: text_light,
            paper: text_dark,
        }
    },
    typography: {
        fontFamily: ['"inter"', 'sans-serif'].join(','),
        h1: {
            fontFamily: ['"Migra"', 'serif'].join(','),
            fontSize: 60,
            fontWeight: 600,
            lineHeight: 78 / 70,
            letterSpacing: -0.2,
        },
        h2: {
            fontSize: 48,
            fontWeight: 600,
            lineHeight: 1.2,
        },
        h3: {
            fontSize: 42,
            lineHeight: 1.2,
        },
        h4: {
            fontSize: 36,
            fontWeight: 500,
            lineHeight: 1.5,
        },
        h5: {
            fontSize: 20,
            fontWeight: 600,
        },
        h6: {
            fontSize: 18,
        },
        subtitle1: {
            fontSize: 18,
        },
        subtitle2: {
            fontSize: 16,
        },
        body1: {
            fontWeight: 400,
            fontSize: 15,
        },
        body2: {
            fontWeight: 400,
            fontSize: 14,
        },
        caption: {
            fontWeight: 400,
            fontSize: 12,
        },
    }
});


theme.components = {
    MuiCssBaseline: {
        styleOverrides: {
            html: {
                scrollBehavior: 'smooth',
            },
        },
    },
    MuiTable: {
        styleOverrides: {
            root: {
                border: '10px solid ' + theme.palette.secondary.main,
                borderBottom: '20px solid ' + theme.palette.secondary.main,
            }
        }
    },
    MuiTableCell: {
        styleOverrides: {
            root: {
                color: theme.palette.secondary.main,
            },
        },
    },
    MuiTableRow: {
        styleOverrides: {
            root: {
                backgroundColor: theme.palette.background.default,
            }
        }
    },
    MuiTableContainer: {
        styleOverrides: {
            root: {
                borderRadius: '10px',
            }
        }
    },
    MuiTableHead: {
        styleOverrides: {
            root: {
                backgroundColor: theme.palette.secondary.main,
                textTransform: 'capitalize',
            },
        }
    },

    MuiTableBody: {
        styleOverrides: {
            root: {
                backgroundColor: theme.palette.background.default,
                borderRadius: '10px',
            }
        }
    },
    MuiTab: {
        styleOverrides: {
            root: {
                border: 'none',
                borderRadius: '10px',
                fontFamily: "Helvetica World",
                fontSize: 20,
                fontWeight: 600,
                textTransform: 'none',
                color: '#fff',
                '&.Mui-selected': {
                    color: '#fff',
                    backgroundColor: theme.palette.primary.main,
                },
            },
        },
    },
    MuiButtonBase: {
        defaultProps: {
            disableTouchRipple: true,
            disableRipple: true,
        },
        styleOverrides: {
            root: {
                boxSizing: 'border-box',
                transition: 'all 100ms ease-in',
                '&:focus-visible': {
                    outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
                    outlineOffset: '2px',
                },
            },
        },
    },
    MuiButton: {
        styleOverrides: {
            root: ({ theme, ownerState }) => ({
                boxSizing: 'border-box',
                boxShadow: 'none',
                borderRadius: '10px',
                textTransform: 'none',
                '&:active': {
                    transform: 'scale(0.98)',
                },
                ...(ownerState.size === 'small' && {
                    maxHeight: '32px',
                }),
                ...(ownerState.size === 'medium' && {
                    height: '40px',
                }),
                ...(ownerState.variant === 'contained' &&
                    ownerState.color === 'secondary' && {
                    color: theme.palette.text.secondary,
                    background: theme.palette.secondary.main,
                    boxShadow: `inset 0 1px ${alpha(theme.palette.primary.main, 0.4)}`,
                    '&:hover': {
                        background: theme.palette.background.default,
                        backgroundImage: 'none',
                        boxShadow: `0 0 0 1px  ${alpha(theme.palette.primary.main, 0.5)}`,
                    },
                }),
                ...(ownerState.variant === 'outlined' && {
                    backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    borderColor: theme.palette.primary.main,
                    color: theme.palette.secondary.main,
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.3),
                        borderColor: theme.palette.primary.main,
                    },
                }),
                ...(ownerState.variant === 'text' && {
                    color: theme.palette.primary.main,
                    '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.3),
                        borderColor: theme.palette.primary.main,
                    },
                }),
            }),
        },
    },
    MuiCard: {
        styleOverrides: {
            root: ({ theme, ownerState }) => ({
                backgroundColor: theme.palette.primary.main,
                borderRadius: 10,
                padding: '20px',
                textAlign: 'left',
                boxShadow: 'none',
                color: theme.palette.text.secondary,
                transition: 'background-color, border, 80ms ease',
                ...(ownerState.variant === 'outlined' && {
                    backgroundColor: theme.palette.background.default,
                    color: theme.palette.text.primary,
                    borderColor: theme.palette.primary.main,
                    borderWidth: '3px',
                }),
            }),
        },
    },
    MuiTextField: {
        defaultProps: {
            variant: 'filled',
        },
        styleOverrides: {
            root: ({ theme, ownerState }) => ({
                borderRadius: 10,
                boxShadow: 'none',
                '& .MuiFilledInput-root': {
                    background: alpha(theme.palette.secondary.main, 0.1),
                    borderRadius: 10,
                    '&:before, &:after': {
                        display: 'none',
                    },
                    '&.Mui-focused': {
                        background: alpha(theme.palette.secondary.main, 0.2),
                        boxShadow: `0 0 0 2px ${theme.palette.primary.main}`
                    }
                },
                '& .MuiFilledInput-input': {
                    padding: '14px 12px',
                }
            }),
        },
    },

    MuiDivider: {
        styleOverrides: {
            root: ({ theme }) => ({
                borderColor: `${alpha(theme.palette.secondary.main, 0.8)}`,
            }),
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: ({ theme }) => ({
                backgroundImage: 'none',
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.text.secondary,
            }),
        },
    },
    MuiChip: {
        styleOverrides: {
            root: ({ theme }) => ({
                color: theme.palette.text.primary.dark,
            }),
        },
    }
}