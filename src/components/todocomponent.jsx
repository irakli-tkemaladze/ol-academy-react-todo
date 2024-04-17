import React, { Component } from 'react'

export class Todo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            todoList: [],
            editMode: false,
            errorMessage: ''
        }
        this.uniqueId = 1;
        this.editTodo = null;
    }
    checkValidate = () => {
        let valid = true
        if (!this.state.inputValue) {
            valid = false;
            this.setState({ errorMessage: 'დავალების ველი ცარიელია' })
        } else if (this.state.todoList.find((item) => item.name === this.state.inputValue)) {
            valid = false;
            this.setState({ errorMessage: 'ასეთი დავალება უკვე დამატებულია' })
        }
        return valid
    }
    handleAddTask = (inputValue) => {
        if (!this.checkValidate()) {
            return
        }
        if (!this.state.todoList.length) {
            this.uniqueId = 1
        }
        let todo = {
            name: inputValue,
            id: this.uniqueId,
            isDone: false,
            isChecked: false,
        }
        this.setState({ todoList: [todo, ...this.state.todoList], inputValue: '', errorMessage: '' })
        this.uniqueId += 1

    }
    handleOnChange = (e) => { this.setState({ inputValue: e.target.value }) }
    handleOnDelete = (id) => {
        let newTodoList = this.state.todoList.filter(
            (item) => item.id != id
        )
        this.setState({ todoList: newTodoList })
        if (this.state.editMode && this.editTodo.id === id) {
            this.setState({ inputValue: '', editMode: false, errorMessage: '' })
            this.editTodo = null;
        }
    }
    handleMarkAsDone = (todo) => {
        const newTodoList = this.state.todoList.map(item => {
            if (item.id === todo.id) {
                item.isDone = !item.isDone;
            }
            return item
        })
        this.setState({ todoList: newTodoList })
    }
    handleCheckboxDelete = () => {
        if (this.state.editMode && this.editTodo.isChecked) {
            this.setState({ inputValue: '', editMode: false, errorMessage: '' })
            this.editTodo = null;
        }
        const newTodoList = this.state.todoList.filter(item => !item.isChecked)
        this.setState({ todoList: newTodoList })
    }
    handleCheckbox = (todo) => {
        const newTodoList = this.state.todoList.map(item => {
            if (item.id === todo.id) {
                item.isChecked = !item.isChecked;
            }
            return item
        })
        this.setState({ todoList: newTodoList })
    }
    handlDoneDelete = () => {
        if (this.state.editMode && this.editTodo.isDone) {
            this.setState({ inputValue: '', editMode: false, errorMessage: '' })
            this.editTodo = null;
        }
        const newTodoList = this.state.todoList.filter(item => !item.isDone)
        this.setState({ todoList: newTodoList })
    }

    handleEditValue = (editTodoValue) => {
        if (!this.checkValidate()) {
            return
        }
        const newTodoList = this.state.todoList.map(item => {
            if (item.id === this.editTodo.id) {
                item.name = editTodoValue;
            }
            return item
        })
        this.setState({ todoList: newTodoList, editMode: false, inputValue: '', errorMessage: '' })
        this.editTodo = null;
    }
    handleUpTask = (todo, index) => {
        if (index === 0) {
            return
        }
        const newTodoList = [...this.state.todoList]
        newTodoList[index] = newTodoList[index - 1]
        newTodoList[index - 1] = todo
        this.setState({ todoList: newTodoList })
    }
    handleDawnTask = (todo, index) => {
        if (index === this.state.todoList.length - 1) {
            return
        }
        const newTodoList = [...this.state.todoList]
        newTodoList[index] = newTodoList[index + 1]
        newTodoList[index + 1] = todo
        this.setState({ todoList: newTodoList })
    }
    handleDeleteAll = () => {
        if (this.state.editMode) {
            this.setState({ inputValue: '', editMode: false, errorMessage: '' })
        }
        this.setState({ todoList: [] });
        this.editTodo = null
    }

    render() {
        return <div>
            {this.state.editMode ? <form>
                <input type="text"
                    placeholder='enter edited task here...'
                    className='todo-input'
                    onChange={this.handleOnChange}
                    value={this.state.inputValue}
                />
                <button type='button' onClick={() => this.handleEditValue(this.state.inputValue)}>update task</button>
                <button type='button' onClick={() => { this.setState({ editMode: false, inputValue: '' }); this.editTodo = null }}>cancel edit</button>
            </form> : <form>
                <input type="text"
                    placeholder='enter task here...'
                    className='todo-input'
                    onChange={this.handleOnChange}
                    value={this.state.inputValue}
                />
                <button type='button' onClick={() => this.handleAddTask(this.state.inputValue)}>add task</button>
            </form>}
            {this.state.errorMessage ? <p>{this.state.errorMessage}</p> : null}
            <ul>
                {this.state.todoList && this.state.todoList.map((item, idx) => (<li key={item.id} >
                    <input type="checkbox" checked={item.isChecked} onChange={() => this.handleCheckbox(item)} />
                    <span style={{ color: item.isDone ? "green" : "red" }}>{item.name}</span>
                    <button onClick={() => this.handleOnDelete(item.id)}>delete</button>
                    <button onClick={() => { this.setState({ editMode: true, inputValue: item.name }); this.editTodo = item }}>edit</button>
                    <button onClick={() => this.handleMarkAsDone(item)}>done</button>
                    <button onClick={() => this.handleUpTask(item, idx)}>up</button>
                    <button onClick={() => this.handleDawnTask(item, idx)}>dawn</button>
                </li>))}
            </ul>
            {this.state.todoList.length ? <div>
                <button onClick={() => this.handleDeleteAll()}>Delete all</button>
                <button onClick={() => this.handleCheckboxDelete()} >Delete checked items</button>
                <button onClick={() => this.handlDoneDelete()} >Delete Done</button>
            </div> : null}
        </div>
    }

}