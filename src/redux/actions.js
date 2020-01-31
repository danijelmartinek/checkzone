export function setTheme(mode) {
	return {
		type: 'SET_THEME',
		setTheme: (themeObj) => {
			let tempObj = themeObj[mode];

			tempObj.fonts = themeObj.fonts,
			tempObj.options = themeObj.options
			
			return tempObj;
		}
	}
}

export function startCounter(obj) {
	return {
		type: 'START_COUNTER'
	}
}

export function resumeCounter(obj) {
	return {
		type: 'RESUME_COUNTER'
	}
}

export function stopCounter(obj) {
	return {
		type: 'STOP_COUNTER'
	}
}

export function updateCounter(obj) {
	return {
		type: 'UPDATE_COUNTER',
		payload: obj
	}
}

export function toggleTodo(todoId, isChecked) {
	return { 
		type: 'TOGGLE_TODO',
		toggleTodo: (projectObj) => {
			projectObj.tasks.map((task, i) => {
				if(task.id === todoId) {
					task.checked = !task.checked
				}	
			})
			return projectObj;
		},

		addTodoToLog: (logObj) => {
			if(!isChecked) {
				logObj.tasks.push(todoId);
			} else {
				const ind = logObj.tasks.indexOf(todoId);
				if (ind > -1) {
					logObj.tasks.splice(ind, 1);
				}
			}
			
			return logObj;
		}
	}
}
