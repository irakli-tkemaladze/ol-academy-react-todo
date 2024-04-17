import React, { Component } from 'react'

export class TodoForm extends Component {
    constructor(props) {
        super(props)

        this.uniqueId = 1;
    }
    handleOnChange = (e) => { this.props.parentSetState({ inputValue: e.target.value }) }
    checkValidate = () => {
        let valid = true
        if (!this.props.parentState.inputValue) {
            valid = false;
            this.props.parentSetState({ errorMessage: 'დავალების ველი ცარიელია' })
        } else if (this.props.parentState.todoList.find((item) => item.name === this.props.parentState.inputValue)) {
            valid = false;
            this.props.parentSetState({ errorMessage: 'ასეთი დავალება უკვე დამატებულია' })
        }
        return valid
    }

    handleAddTask = (inputValue) => {
        if (!this.checkValidate()) {
            return
        }
        if (!this.props.parentState.todoList.length) {
            this.uniqueId = 1
        }
        let todo = {
            name: inputValue,
            id: this.uniqueId,
            isDone: false,
            isChecked: false,
        }
        this.props.parentSetState({ todoList: [todo, ...this.props.parentState.todoList], inputValue: '', errorMessage: '' })
        this.uniqueId += 1

    }
    handleEditValue = (editTodoValue) => {
        if (!this.checkValidate()) {
            return
        }
        const newTodoList = this.props.parentState.todoList.map(item => {
            if (item.id === this.props.parentState.editTodo.id) {
                item.name = editTodoValue;
            }
            return item
        })
        this.props.parentSetState({ todoList: newTodoList, editMode: false, inputValue: '', errorMessage: '', editTodo: null })
    }

    render() {
        return <div> {this.props.parentState.editMode ? <form>
            <input type="text"
                placeholder='enter edited task here...'
                className='todo-input'
                onChange={this.handleOnChange}
                value={this.props.parentState.inputValue}
            />
            <button type='button' onClick={() => this.handleEditValue(this.props.parentState.inputValue)}>update task</button>
            <button type='button' onClick={() => { this.props.parentSetState({ editMode: false, inputValue: '', editTodo: null }) }}>cancel edit</button>
        </form> : <form>
            <input type="text"
                placeholder='enter task here...'
                className='todo-input'
                onChange={this.handleOnChange}
                value={this.props.parentState.inputValue}
            />
            <button type='button' onClick={() => this.handleAddTask(this.props.parentState.inputValue)}>add task</button>
        </form>}
        </div>
    }
}