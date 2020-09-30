import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends React.Component {

constructor(props){
    super(props);
    this.state = {
        id : '',
        name : '',
        status : false
    }
}

onClose = () => {
    this.props.onCloseForm();
}

componentWillMount(){
    if(this.props.task){
        this.setState({
            id : this.props.task.id,
            name : this.props.task.name,
            status : this.props.task.status,
        });
    }
}

componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if(nextProps && nextProps.task){
        this.setState({
            id : nextProps.task.id,
            name : nextProps.task.name,
            status : nextProps.task.status,
        });
    } else {
        this.setState({
            id : '',
            name : '',
            status : false
        });
    }
}

onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if(name === 'status'){
        value = target.value ==='true' ? true : false ;
    }
    this.setState({
        [name] : value
    });
}

onSubmit = (event) => {
    event.preventDefault();
    // this.props.onSubmit(this.state);
    this.props.onSaveTask(this.state);
    this.onClear();
    this.onClose();

}


onClear = () => {
    this.setState({
        name : '',
        status : false
    });
}

render(){
console.log(this.props.task);
    return (
      <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">{ this.state.id ? 'Sửa Công việc' : 'Thêm Công Việc' }<span className="fa fa-times-circle text-right" onClick = {this.onClose} ></span></h3>
            </div>
            <div className="panel-body">
                <form onSubmit = { this.onSubmit }>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input type="text" className="form-control" name = "name" value = { this.state.name } onChange = { this.onChange }/>
                    </div>
                    <label>Trạng Thái :</label>
                    <select className="form-control" required="required" name = "status" value = { this.state.status } onChange = { this.onChange }>
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br/>
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning"> <span className="fa fa-plus mr-5"> </span>{this.state.id  ? 'Sửa ' : 'Thêm'}</button>&nbsp;
                        <button type="button" className="btn btn-danger" onClick = { this.onClear }> <span className="fa fa-close mr-5"> </span>Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div>
      );
    }
}

const mapStateToProps = state => {
    return {
   isDisplayForm : state.isDisplayForm,
   task : state.itemEdit
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSaveTask : (task) => {
            dispatch(actions.saveTask(task));
        },
        onCloseForm : () => {
            dispatch(actions.closeForm());
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);
