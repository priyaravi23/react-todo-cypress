import React, { Component } from 'react'

class Todo extends Component {
    deleteTodo = id => {
        this.props.removeTodo(id);
    };
    render() {
        return (
            <label>
                {this.props.value}
                <button className="destroy" onClick={() => this.deleteTodo(this.props.id)}></button>
            </label>
        );
    }
}

export default Todo;