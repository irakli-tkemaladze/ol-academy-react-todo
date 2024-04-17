import React, { Component } from 'react'
import { TodoForm } from './todoForm'
import { TodoList } from './todoList'
export class TodoWrapper extends Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValue: '',
            todoList: [],
            editMode: false,
            errorMessage: '',
            editTodo:null
        }
    }
    
    updateState = (newState) => {
        this.setState(newState)
    }





    render() {
        return <div>
            <TodoForm parentState={this.state} parentSetState={this.updateState} />
            <TodoList parentState={this.state} parentSetState={this.updateState} />
        </div>
    }
}


