import React, { Component } from 'react'

export class TodoList extends Component {
    constructor(props) {
        super(props)

    }
    handleOnDelete = (id) => {
        let newTodoList = this.props.parentState.todoList.filter(
            (item) => item.id != id
        )
        this.props.parentSetState({ todoList: newTodoList })
        if (this.props.parentState.editMode && this.porps.editTodo.id === id) {
            this.props.parentSetState({ inputValue: '', editMode: false, errorMessage: '',editTodo:null })
        }
    }
    handleMarkAsDone = (todo) => {
        const newTodoList = this.props.parentState.todoList.map(item => {
            if (item.id === todo.id) {
                item.isDone = !item.isDone;
            }
            return item
        })
        this.props.parentSetState({ todoList: newTodoList })
    }
    handleCheckboxDelete = () => {
        if (this.props.parentState.editMode && this.porps.editTodo.isChecked) {
            this.props.parentSetState({ inputValue: '', editMode: false, errorMessage: '',editTodo:null })
        }
        const newTodoList = this.props.parentState.todoList.filter(item => !item.isChecked)
        this.props.parentSetState({ todoList: newTodoList })
    }
    handleCheckbox = (todo) => {
        const newTodoList = this.props.parentState.todoList.map(item => {
            if (item.id === todo.id) {
                item.isChecked = !item.isChecked;
            }
            return item
        })
        this.props.parentSetState({ todoList: newTodoList })
    }
    handlDoneDelete = () => {
        if (this.props.parentState.editMode && this.porps.editTodo.isDone) {
            this.props.parentSetState({ inputValue: '', editMode: false, errorMessage: '',editTodo:null })
        }
        const newTodoList = this.props.parentState.todoList.filter(item => !item.isDone)
        this.props.parentSetState({ todoList: newTodoList })
    }
    
    handleUpTask = (todo, index) => {
        if (index === 0) {
            return
        }
        const newTodoList = [...this.props.parentState.todoList]
        newTodoList[index] = newTodoList[index - 1]
        newTodoList[index - 1] = todo
        this.props.parentSetState({ todoList: newTodoList })
    }
    handleDawnTask = (todo, index) => {
        if (index === this.props.parentState.todoList.length - 1) {
            return
        }
        const newTodoList = [...this.props.parentState.todoList]
        newTodoList[index] = newTodoList[index + 1]
        newTodoList[index + 1] = todo
        this.props.parentSetState({ todoList: newTodoList })
    }
    handleDeleteAll = () => {
        if (this.props.parentState.editMode) {
            this.props.parentSetState({ inputValue: '', editMode: false, errorMessage: '' })
        }
        this.props.parentSetState({ todoList: [],editTodo:null });
    }
    render() {
        return <div>
            {this.props.parentState.errorMessage ? <p>{this.props.parentState.errorMessage}</p> : null}
            <ul>
                {this.props.parentState.todoList && this.props.parentState.todoList.map((item, idx) => (<li key={item.id} >
                    <input type="checkbox" checked={item.isChecked} onChange={() => this.handleCheckbox(item)} />
                    <span style={{ color: item.isDone ? "green" : "red" }}>{item.name}</span>
                    <button onClick={() => this.handleOnDelete(item.id)}>delete</button>
                    <button onClick={() => { this.props.parentSetState({ editMode: true, inputValue: item.name,editTodo:item }) }}>edit</button>
                    <button onClick={() => this.handleMarkAsDone(item)}>{!item.isDone? 'done' : 'not done' }</button>
                    <button onClick={() => this.handleUpTask(item, idx)}>up</button>
                    <button onClick={() => this.handleDawnTask(item, idx)}>dawn</button>
                </li>))}
            </ul>
            {this.props.parentState.todoList.length ? <div>
                <button onClick={() => this.handleDeleteAll()}>Delete all</button>
                <button onClick={() => this.handleCheckboxDelete()} >Delete checked items</button>
                <button onClick={() => this.handlDoneDelete()} >Delete Done</button>
            </div> : null}
        </div>
    }
}