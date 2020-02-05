const initTheme = (themeOpts, mode) => {
    let defaultTheme = themeOpts[mode]
    defaultTheme.fonts = themeOpts.fonts,
    defaultTheme.options = themeOpts.options

    return defaultTheme;
}

const getTemplateData = (type) => {
    const initProjectInfo = {
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
    
    const initLogInfo = {
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

    if(type === "project") {
        return initProjectInfo;
    } else if(type === "log") {
        return initLogInfo;
    } else {
        return null;
    }
}



export {
    initTheme,
    getTemplateData
}