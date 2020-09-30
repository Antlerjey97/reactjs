import * as types from './../constants/ActionTypes'


var s4 = () => {
	return Math.floor((1+Math.random()) *0x10000).toString(16).substring(1);
}

var generateID = () => {
	return s4() + s4() + '-' + s4() + '-' + s4();
}

var findIndex = (tasks, id) =>{
	var result = -1;
	tasks.forEach((task, index) => {
		if(task.id === id){
			result = index; 
		}
	});
	return result;
}

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
	switch(action.type) {
		case types.LIST_ALL:
			return state;
		case types.SAVE_TASK:
			var task = {
				id : action.task.id,
				name : action.task.name,
				status : action.task.status === false ? false : true
			}

			if( !task.id) {
				task.id = generateID();
				state.push(task);
			} else {
				var index = findIndex(state, task.id);
				state[index] = task;
			}
		
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];

		case types.UPDATE_STATUS:
			var index = findIndex(state, action.id);
			state[index] = { 
				...state[index],
				status : !state[index].status
			}
			localStorage.setItem('tasks', JSON.stringify(state));
			return [...state];

		case types.DELETE_ITEM:	
			var index = findIndex(state, action.id);
			if( index!== -1){
				state.splice(index, 1);
			}
			localStorage.setItem('tasks', JSON.stringify(state));
			
			return [...state];	

		default: 
			return state;
	}

}


export default myReducer;