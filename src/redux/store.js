import themeOptions from '_styles/index.js';


const initTheme = (themeOpts, mode) => {
    let defaultTheme = themeOpts[mode]
    defaultTheme.fonts = themeOpts.fonts,
    defaultTheme.options = themeOpts.options

    return defaultTheme;
}

let projects = [
    {
        id: 1,  
        labelColor: 'red',
        name: 'Lorem Ipsum 2',
        timeInfo: {
            totalTime: 32135,
            totalPauseTime: 3143,
            startTime: '2020-01-13T00:05:32.000Z'
        },
        logs: [
            {
                active: false,
                startTime: '2020-01-13T00:05:32.000Z',
                countTime: 32135,
                endTime: '',
                totalSessionTime: 32135,
                pauseTime: 3143,
                pauseEntities: [],
                tasks: [2],
                commits: []
            }
        ],
        tasks: [
            {
                id: 2,
                todo: 'Task 1',
                checked: false
            },
            {
                id: 1,
                todo: 'Task 1+1',
                checked: false
            },
            {
                id: 43,
                todo: 'Task 1',
                checked: false
            },
            {
                id: 321,
                todo: 'Task 1+1',
                checked: false
            },
            {
                id: 54,
                todo: 'Task 1',
                checked: false
            },
            {
                id: 76,
                todo: 'Task 1+1',
                checked: false
            }
        ],
        commits: []
    }
]

let projectInfo = {
    labelColor: '#ffffff',
    name: 'Lorem Ipsum',
    timeInfo: {
        totalTime: 0,
        totalPauseTime: 0,
        startTime: ''
    },
    logs: [],
    tasks: [],
    commits: []
}

let initLogInfo = {
    active: false,
    startTime: '-',
    countTime: 0,
    endTime: '',
    totalSessionTime: 0,
    pauseTime: 0,
    pauseEntities: [],
    tasks: [],
    commits: []
}


const initialState = {
    THEME_OPTIONS: themeOptions,
    DEFAULT_THEME: initTheme(themeOptions, 'dark'),

    PROJECT_INFO: projects[0],
    LOG_INFO: {...initLogInfo},

    REF_COUNTER: {}
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_THEME':
            return {
                ...state,
                DEFAULT_THEME: action.setTheme(state.THEME_OPTIONS)
            }
        case 'START_COUNTER':
            return {
                ...state,
                LOG_INFO: {
                    ...state.LOG_INFO,
                    active: true,
                    startTime: new Date(),
                }
            }
        case 'STOP_COUNTER':
            return {
                ...state,
                LOG_INFO: {...initLogInfo}
            }
        case 'RESUME_COUNTER':
            return {
                ...state,
                LOG_INFO: {
                    ...state.LOG_INFO,
                    active: true,
                }
            }
        case 'UPDATE_COUNTER':
            return {
                ...state,
                LOG_INFO: action.payload
            }

        case 'TOGGLE_TODO':
            return {
                ...state,
                PROJECT_INFO: action.toggleTodo(state.PROJECT_INFO),
                LOG_INFO: action.addTodoToLog(state.LOG_INFO, state.PROJECT_INFO)
            }

        case 'REF_COUNTER':
            return {
                ...state,
                REF_COUNTER: action.payload
            }

        default:
            return state
    }
}

export default Reducer;