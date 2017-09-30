import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import SelecInput from './SelectInput';
import * as actions from '../actions';
import { country } from './country';

const options = country.map(function(item) {
  return { value: item, label: item };
});

class Settings extends Component {
  handleFormSubmit({ city, country }) {
    const { email } = this.props;
    if (email && city && country)
      this.props.updateSettings({ email, city, country });
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
      <div>
        <h4 className="display-4">Settings</h4>
        <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
          <fieldset className="form-group">
            <label>City:</label>
            <Field name="city" component="input" className="form-control" />
          </fieldset>
          <fieldset className="form-group">
            <label>Country:</label>
            <Field name="country" options={options} component={SelecInput} />
          </fieldset>
          {this.renderAlert()}
          <button action="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    email: state.set.email,
    initialValues: state.set
  };
}

const reduxFormSettings = reduxForm({
  form: 'settings',
  fields: ['city', 'country']
})(Settings);

export default connect(mapStateToProps, actions)(reduxFormSettings);
