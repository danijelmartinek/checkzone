import themeOptions from '_styles/index.js';

const initialState = {
    THEME_OPTIONS: themeOptions,
    DEFAULT_THEME: themeOptions['dark']
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_THEME':
            return {
                ...state,
                DEFAULT_THEME: action.setTheme(state.THEME_OPTIONS)
            }
            
        default:
            return state
    }
}

export default Reducer;