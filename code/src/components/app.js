import React from "react";
import ReactDom from "react-dom";
import TodoList from "./TodoList"

class App extends React.Component {
  state = {
    text: '',
    items: []
  }

  componentWillMount() {
    this.setState(JSON.parse(localStorage.getItem('state')))
  }

  render() {
    return (
      <div className="todo-items">
        <div className="todo-text">
          <h1>TO-DO's</h1>
        </div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            <div className="text">
              Key task to complete today
            </div>
            <input
              className="input"
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.text}
            />
          </label>
          <input className="button" type="submit" value="Add" />
          <button className="remove-button" type="button" value="Remove all" onClick={this.removeAll}>Remove All</button>
        </form>
        <div>
          {
            this.state.items.sort((a, b) => {
              if (a.id < b.id) {
                return 1;
              }
              if (a.id > b.id) {
                return -1;
              }
            }).map(item =>
              <div key={item.id}>
                <input type="checkbox" name="vehicle3" value={item.text} checked={item.checked} onChange={this.handleChecked(item.id)} />
                <span className="returns">{item.text}</span>
              </div>)
          }
        </div>
      </div>
    )
  }

  handleChecked = (id) => () => {
    const filteredList = this.state.items.filter(i => i.id !== id);
    const item = this.state.items.find(i => i.id === id);
    item.checked = !item.checked;

    this.setState({
      items: [...filteredList, item]
    }, () => localStorage.setItem('state', JSON.stringify(this.state)))
  }

  handleChange = (e) => {
    this.setState({ text: e.target.value }, () => localStorage.setItem('state', JSON.stringify(this.state)));
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newItem = {
      text: this.state.text,
      id: Date.now(),
      checked: false
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }), () => localStorage.setItem('state', JSON.stringify(this.state)));
  }

  removeAll = () => {
  this.setState(state => ({
    items: [],
    text: ''
  }), () => localStorage.setItem('state', JSON.stringify(this.state)));
  }

}

export default App
