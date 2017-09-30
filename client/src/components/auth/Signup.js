import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

class Signup extends Component {
  handleFormSubmit({ email, password }) {
    if (email && password) this.props.signupUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          name="email"
          type="email"
          component={renderField}
          label="Email"
        />
        <Field
          name="password"
          type="password"
          component={renderField}
          label="Password"
        />
        <Field
          name="passwordConfirm"
          type="password"
          component={renderField}
          label="Confirm Password"
        />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">
          Sign Up
        </button>
      </form>
    );
  }
}

const renderField = ({
  input,
  label,
  type,
  meta: { touched, error, warning }
}) => (
  <fieldset className="form-group">
    <label>{label}</label>
    <input
      className="form-control"
      {...input}
      placeholder={label}
      type={type}
    />
    {touched && error && <span className="error">{error}</span>}
  </fieldset>
);

function validate(formProps) {
  const errors = {};
  const variables = ['email', 'password', 'passwordConfirm'];
  variables.forEach(function(key) {
    if (!formProps[key]) {
      errors[key] = 'Please enter an ' + key;
    }
  });

  if (formProps.password !== formProps.passwordConfirm) {
    // console.log(formProps.password, formProps.passwordConfirm);
    errors.password = 'Passwords must match';
  }
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const reduxFormSignup = reduxForm({
  form: 'signup',
  fields: ['email', 'password', 'passwordConfirm'],
  validate
})(Signup);

export default connect(mapStateToProps, actions)(reduxFormSignup);
