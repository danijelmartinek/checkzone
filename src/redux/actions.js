export function setTheme(mode) {
    return {
      type: 'SET_THEME',
      setTheme: (themeObj) => {
        return themeObj[mode];
      }
    }
  }