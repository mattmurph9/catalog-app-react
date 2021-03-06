import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class NewItem extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      desc: '',
    };

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleSubmit(event) {
    console.log(`WE HANDLING SUBMIT ${this.state.name} ${this.state.desc}`);
    event.preventDefault();
    const url = `http://localhost:5000/catalog/${this.props.match.params.category}/JSON`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.desc,
        creator: localStorage.getItem('user'),
      }),
    }).then(this.handleRedirect);
  }

  handleRedirect(result) {
    if (result.status === 200) {
      console.log('WE HANDLING REDIRECT');
      const url = `/catalog/${this.props.match.params.category}/`+this.state.name;
      this.props.history.push(url);
    } else {

    }
  }

  handleNameChange(event) {
    this.setState({ name: event.target.value });
  }

  handleDescChange(event) {
    this.setState({ desc: event.target.value });
    console.log(localStorage.getItem('user'));
  }


  render() {
    return (
      <div>
        <h2>New Item in {this.props.match.params.category}</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
          <textarea name="description" value={this.state.desc} onChange={this.handleDescChange} />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default withRouter(NewItem);
