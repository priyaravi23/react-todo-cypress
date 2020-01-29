import React, { Component } from 'react';
import Todo from './app/todo/todo';
import './app/todo/todo.css'

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

    showCompleted = (id) => {

    };

    render() {
        return (
            <section className="todoapp">

                <header className="header">
                    <h1>Todo</h1>
                    <input className="new-todo"
                           type="text"
                           autofocus
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

                <footer class="footer">
                    <span class="todo-count"><strong>{ this.state.list.length }</strong> item left</span>
                    <ul class="filters">
                        <li>
                            <a onClick={this.showAll}> All </a>
                        </li>
                        <li>
                          <a onClick={this.showActive}> Active </a>
                        </li>
                        <li>
                            <a onClick={this.showCompleted}> Completed </a>
                        </li>
                    </ul>

                    <button className="clear-completed"
                            onClick={this.clearCompleted}> Clear completed </button>
                </footer>

    </section>
        );
    }
}

export default App;