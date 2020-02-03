import React, { Component, useState } from 'react';
import Todo from './app/todo/todo';
import './app/todo/todo.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import uuid from 'uuid';

class App extends Component {
    state = {
        todos: [
            {
                id: 'a493a83b-dcdb-475a-8123-3e4b8bf3410c',
                value: "Create an app using create-react-app CLI",
                complete: true
            },
            {
                id: '8c9fc3c0-3416-489b-a94f-123a6de60f6c',
                value: "Style app",
                complete: true
            },
            {
                id: '1df70967-7323-4db2-a749-a15d7e6381f3',
                value: "Add functionality",
                complete: false
            }
        ],
        currentTodo: "",
        filter: 'all'
    };

    handleFilterChange = e => {
        e.preventDefault();
        const filter = e.target.dataset.filter;
        this.setState({
            filter
        });
    };

    handleTodoChange = event => {
        this.setState({
            currentTodo: event.target.value
        });
    };

    handleNewTodo = event => {
        if (event.key === "Enter") {
            event.preventDefault();

            const newItem = {
                id: uuid.v4(),
                value: this.state.currentTodo.slice()
            };
            this.setState({
                todos: this.state.todos.concat(newItem),
                currentTodo: ""
            });
        }
    };

    handleRemove = id => {
        const filteredItems = this.state.todos.filter(item => item.id !== id);

        this.setState({
            todos: filteredItems
        });
    };

    clearComplete = () => {
        const remainingTodos = this.state.todos.filter(todo => {
            if (!todo.complete) {
                return todo;
            }
        });

        this.setState({
            todos: remainingTodos
        });
    };

    markComplete = (e) => {
        let id = e.target.getAttribute('data-id');
        let tempTodos = this.state.todos;

        tempTodos.forEach((todo) => {
            if (id === todo.id) {
                if (todo.complete){
                    todo.complete = false;
                }
                else if (!todo.complete) {
                    todo.complete = true;
                }
            }
        });

        this.setState({
            todos: tempTodos
        });
    };

    render() {
        const {filter} = this.state;
        return (
            <section className="todoapp">

                <header className="header">
                    <h1>Todo</h1>
                    <input type="text"
                           autoFocus
                           className="new-todo"
                           value={this.state.currentTodo}
                           placeholder="What needs to be done?"
                           onKeyPress={this.handleNewTodo}
                           onChange={this.handleTodoChange}
                    />
                </header>

                <section className="main">
                    <ul className={`todo-list ${filter}`}>
                        {this.state.todos.map(item => {
                            return (
                                <li className={item.complete ? "todo completed" : "todo"}>
                                    <div className="view">
                                        <input className="toggle"
                                               type="checkbox"
                                               checked={item.complete}
                                               data-id={item.id}
                                               onChange={this.markComplete}/>
                                        <Todo {...item} key={item.id} removeTodo={this.handleRemove} />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </section>

                <Router>
                    <footer class="footer">
                        <span class="todo-count"><strong>{(this.state.todos.filter(todo => !todo.complete)).length}</strong> item left</span>
                        <ul class="filters">
                            <li>
                                <a data-filter="all" href="#" onClick={this.handleFilterChange}>All</a>
                            </li>
                            <li>
                                <a data-filter="active"  href="#" onClick={this.handleFilterChange}>Active</a>
                            </li>
                            <li>
                                <a data-filter="complete"  href="#" onClick={this.handleFilterChange}>Completed</a>
                            </li>
                        </ul>

                        <button className="clear-completed"
                                onClick={this.clearComplete}> Clear completed </button>
                    </footer>
                </Router>

    </section>
        );
    }
}

export default App;