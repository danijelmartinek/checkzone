import Firebase from "_/database/firebase/setFunctions.js"
import { getTemplateData } from './initStates';

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

export function refCounter(ref) {
	return {
		type: 'REF_COUNTER',
		payload: ref
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


export function changeSelectedProject(project) {
	return {
		type: 'CHANGE_SELECTED_PROJECT',
		changeProject: () => {
			return Object.assign(getTemplateData("project"), project);
		}
	}
}


const getdata = async () => {

	let options = await Firebase.options()
	.then(data => {
		return data;
	})
	.catch(err => {
		console.log(err);
	})

	let projects = await Firebase.getAll('projects')
	.then(res => {
		return res.data;
	})
	.catch(err => {
		console.log(err);
	})

	let selectedProject = projects.find(el => el.id === options.selectedProject);

	return Promise.resolve({
		options,
		projects,
		selectedProject
	})
}

export function initData(dispatch) {
	getdata()
	.then(data => {
		dispatch({
			type: 'INIT_DATA',
			options: data.options,
			projects: data.projects,
			selectedProject: () => {
				return Object.assign(getTemplateData("project"), data.selectedProject);
			}
		})	
	})
}
