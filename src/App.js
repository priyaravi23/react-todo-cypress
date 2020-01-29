import React, { Component } from 'react';
import Todo from './app/todo/todo';
import './app/todo/todo.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

let counter = 1;

class App extends Component {
    state = {
        list: [
            {
                id: 1,
                value: "Create an app using create-react-app CLI",
                complete: true
            },
            {
                id: 2,
                value: "Style app",
                complete: true
            },
            {
                id: 3,
                value: "Add functionality",
                complete: false
            }
        ],
        item: ""
    };

    handleInputChange = event => {
        this.setState({
            item: event.target.value
        });
    };

    handleKeyPress = event => {
        if (event.key === "Enter") {
            event.preventDefault();

            const item = {
                id: counter++,
                value: this.state.item.slice()
            };
            this.setState({
                list: this.state.list.concat(item),
                item: ""
            });
        }
    };

    handleRemove = id => {
        this.setState({
            list: this.state.list.filter(c => c.id !== id)
        });
    };

    clearCompleted = () => {
      const items = this.state.list.filter(item => item.id === "");

        this.setState({
            list: items
        })
    };

    render() {
        return (
            <section className="todoapp">

                <header className="header">
                    <h1>Todo</h1>
                    <input type="text"
                           autoFocus
                           className="new-todo"
                           value={this.state.item}
                           placeholder="What needs to be done?"
                           onKeyPress={this.handleKeyPress}
                           onChange={this.handleInputChange}
                    />
                </header>

                <section className="main">
                    <ul className="todo-list">
                        {this.state.list.map(item => {
                            return (
                                <li>
                                    <div className="view">
                                        <input className="toggle" type="checkbox" />
                                        <Todo {...item} key={item.id} removeTodo={this.handleRemove} />
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </section>

                <Router>
                    <footer class="footer">
                        <span class="todo-count"><strong>{ this.state.list.length }</strong> item left</span>
                        <ul class="filters">
                            <li>
                                <Link to="/">All</Link>
                            </li>
                            <li>
                                <Link to="/active">Active</Link>
                            </li>
                            <li>
                                <li><Link to="/completed">Completed</Link></li>
                            </li>
                        </ul>

                        <button className="clear-completed"
                                onClick={this.clearCompleted}> Clear completed </button>
                    </footer>
                </Router>

    </section>
        );
    }
}

export default App;