import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class EditItem extends Component {
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

  componentDidMount() {
    this.setState({ name: this.props.match.params.item })
  }

  handleSubmit(event) {
    console.log(`WE HANDLING SUBMIT ${this.state.name} ${this.state.desc}`);
    event.preventDefault();
    const url = `http://localhost:5000/catalog/${this.props.match.params.category}/${this.props.match.params.item}/JSON`;
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.desc,
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
    console.log('WE HANDLING A NAME CHANGE');
    this.setState({ name: event.target.value });
  }

  handleDescChange(event) {
    console.log('WE HANDLING A DESCRIPTION CHANGE');
    this.setState({ desc: event.target.value });
  }


  render() {
    return (
      <div>
        <h2>Edit Item in {this.props.match.params.category}</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} placeholder={this.state.name} />
          <textarea name="description" value={this.state.desc} onChange={this.handleDescChange} placeholder={this.state.desc} />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}

export default withRouter(EditItem);
