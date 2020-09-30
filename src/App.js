import React, { Component } from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

import './App.css';


class App extends Component {

constructor(props){
	super(props);
	this.state = {
		// isDisplayForm :false,
		filter : {
			name : '', 
			status : -1,
		}, 
		keyword: '',
		sortBy : 'name',
		sortValue : 1
	}
}

// componentWillMount(){
// 	if(localStorage && localStorage.getItem('tasks')){
// 		var tasks = JSON.parse(localStorage.getItem('tasks'));
// 		this.setState({
// 			tasks : tasks
// 		});
// 	}
// }


onToggleForm = () => {
	var itemEdit = this.props;
	if ( itemEdit && itemEdit.id !== ''){
		this.props.onOpenForm();
	}else{
		this.props.onToggleForm();	
	}
	
	this.props.onCLearTask({
		id : '',
		name : '',
		status : false
	});
}

// onCloseForm = () => {
// 	this.setState({
// 			isDisplayForm : false
// 		})
// }

// onSubmit = (data) => {
// 	var {tasks} = this.state;
// 	console.log(data);
// 	if(data.id == ''){
// 		data.id = this.generateID()
// 		tasks.push(data);
// 	} else{
// 	var index = this.findIndex(data.id);
// 	if( index!== -1){
// 		tasks[index] = data;
// 		}
// 	}
	
// 	this.setState({
// 		tasks : tasks,
// 		taskEditing : null
// 	});
// 	localStorage.setItem('tasks', JSON.stringify(tasks));

// }

// onUpdateStatus = (id) => {
// 	var { tasks } = this.state;
// 	var index = this.findIndex(id);
// 	if( index!== -1){
// 		tasks[index].status = !tasks[index].status;
// 		this.setState({
// 			tasks : tasks
// 		});
// 	}

// 	localStorage.setItem('tasks', JSON.stringify(tasks));
// }

findIndex = (id) =>{
	var { tasks } = this.state;
	var result = -1;
	tasks.forEach((task, index) => {
		if(task.id === id){
			result = index; 
		}
	});
	return result;
}


onShowForm = () => {
	this.setState({
			isDisplayForm : true
		})
}

onUpdateForm = (id) => {
	var { tasks } = this.state;
	var index = this.findIndex(id);
	var taskEditing = tasks[index];
	this.setState({
			taskEditing : taskEditing
		});
	this.onShowForm();

}

onFilter = (filterName, filterStatus) =>{
	filterStatus = parseInt(filterStatus, 10);
	this.setState({
		filter : {
			name : filterName.toLowerCase(),
			status : filterStatus
		}
	})
}

onSearch = (text) => {
	this.setState({
		keyword : text.keyword.toLowerCase()
	})
}

onSort = (sortBy, sortValue) => {
	this.setState({
			sortBy : sortBy,
			sortValue : sortValue
	});
}

render(){
	var { 
		// isDisplayForm,
		taskEditing,
		filter, 
		// keyword, 
		sortBy, 
		sortValue 
	} = this.state;
	var { isDisplayForm } = this.props;

	// if(filter){
	// 	if(filter.name){
	// 	  tasks = tasks.filter((task) => {
	// 			return task.name.toLowerCase().indexOf(filter.name) !== -1;
	// 		});
	// 	}
	// 	tasks = tasks.filter((task) => {
	// 			if(filter.status == -1 || filter.status === "-1"){
	// 				return task;
	// 			} else {
	// 				return task.status === ( filter.status === 1 ? true : false);
	// 			}
	// 	});
		
	// }

	// if(keyword){
	// 	tasks = tasks.filter((task) => {
	// 			return task.name.toLowerCase().indexOf(keyword) !== -1;
	// 		});
	// }

	// if(sortBy === "name"){
	// 	tasks.sort((a, b) => {
	// 		if(a.name > b.name) return sortValue;
	// 		else if(a.name < b.name) return -sortValue;
	// 		else return 0;
	// 	});
	// } else {
	// 	tasks.sort((a, b) => {
	// 		if(a.status > b.status) return -sortValue;
	// 		else if(a.status < b.status) return sortValue;
	// 		else return 0;
	// 	});
	// }

	var elmTaskForm = isDisplayForm ? 
	<TaskForm 
	//onCloseForm = { this.onCloseForm} 
	//onSubmit = {this.onSubmit} 
	/> : '';

	return (
	    <div className="container">
	        <div className="text-center">
	            <h1>Quản Lý Công Việc</h1>
	            <hr/>
	        </div>
	        <div className="row">
	            <div className = {(isDisplayForm ===false) ? '' : 'col-xs-4 col-sm-4 col-md-4 col-lg-4'}>

	                { elmTaskForm }
	            
	            </div>
	            <div className = {(isDisplayForm ===true) ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12'}>
	                <button 
	                type="button" 
	                className="btn btn-primary" 
	                onClick = { this.onToggleForm }>

	                    <span className="fa fa-plus mr-5"></span>Thêm Công Việc
	                </button>

	                <Control 
	                onSearch = { this.onSearch } 
	                onSort = { this.onSort } 
	                sortBy = { sortBy } 
	                sortValue = { sortValue } />

	                <div className="row mt-15">
	                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
	                       <TaskList 	                    
	                       onFilter = { this.onFilter }
	                       />
	                    </div>
	                </div>
	            </div>
	        </div>
	    </div>
	  );
	}
}

const mapStateProps = state => {
	return {
		isDisplayForm : state.isDisplayForm,
		itemEdit : state.itemEdit
	};
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onToggleForm : () => {
			dispatch(actions.toggleForm());
		},
		onOpenForm : () => {
			dispatch(actions.openForm());
		},
		onCloseForm : () => {
			dispatch(actions.closeForm());
		},
		 onCLearTask : (task) => {
          dispatch(actions.editItem(task));
        }
	};
}
export default connect(mapStateProps, mapDispatchToProps)(App);
