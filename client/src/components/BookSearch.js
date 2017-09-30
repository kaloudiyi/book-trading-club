import React, { Component } from 'react';
import { Form, FormControl, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as actions from '../actions';

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    };
  }

  handleChange = event => {
    this.setState({ title: event.target.value });
  };

  handleSubmit = event => {
    const { title } = this.state;
    const { email } = this.props;

    this.props.addBook(email, title);
    event.preventDefault();
  };

  checkError() {
    return this.props.error ? <p>Not found</p> : <p />;
  }

  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit} inline>
          <FormControl
            placeholder="Book Name"
            componentClass="input"
            onChange={this.handleChange}
          />
          <Button bsStyle="primary" type="submit">
            Add
          </Button>
          {this.checkError()}
        </Form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.set.email,
    error: state.book.error
  };
}

export default connect(mapStateToProps, actions)(BookSearch);
