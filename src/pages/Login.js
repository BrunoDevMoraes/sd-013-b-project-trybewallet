import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { logIn } from '../actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      shouldRedirect: false,
      disabled: true,
    };

    this.renderPasswordInput = this.renderPasswordInput.bind(this);
    this.renderEmailInput = this.renderEmailInput.bind(this);
    this.renderSubmitButton = this.renderSubmitButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.checkValidityOfInputs = this.checkValidityOfInputs.bind(this);
  }

  checkValidityOfInputs() {
    const passwordMinimum = 6;
    const email = document.getElementById('emailId').value; // Special Thanks: Victor Mendonça - Turma 13 - Tribo B
    const password = document.getElementById('passwordId').value; // Pq verificando o estado {email e password} não vai?? Só passa verificando o input
    console.log(email);
    const arrayOfAtSigns = email.match(/@/g);
    if (email.includes('@') === true
    && arrayOfAtSigns.length === 1
    && email[email.length - 1] !== '@'
    && email[email.length - 1] !== '.'
    && password.length >= passwordMinimum
    ) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  }

  handleChange(event) {
    const eventName = event.target.name;
    this.setState({
      [eventName]: event.target.value,
    });
    this.checkValidityOfInputs();
  }

  renderEmailInput() {
    const { email } = this.state;
    return (
      <div>
        <label htmlFor="emailId">
          Email
          <input
            type="email"
            name="email"
            value={ email }
            id="emailId"
            data-testid="email-input"
            onChange={ this.handleChange }
          />
        </label>
        <br />
      </div>
    );
  }

  renderPasswordInput() {
    const { password } = this.state;
    return (
      <div>
        <label htmlFor="passwordId">
          Password
          <input
            type="password"
            name="password"
            value={ password }
            id="passwordId"
            data-testid="password-input"
            onChange={ this.handleChange }
          />
        </label>
      </div>
    );
  }

  renderSubmitButton() {
    const { email, password, disabled } = this.state;
    const { logInProp } = this.props;
    return (
      <div>
        <button
          type="button"
          disabled={ disabled }
          onClick={ () => {
            logInProp({ email, password });
            this.setState({ shouldRedirect: true });
          } }
        >
          Entrar
        </button>
      </div>
    );
  }

  render() {
    const { renderEmailInput,
      renderPasswordInput,
      renderSubmitButton } = this;

    const { shouldRedirect } = this.state;
    if (shouldRedirect === true) {
      return <Redirect to="/carteira" />;
    }
    return (
      <form>
        {renderEmailInput()}
        {renderPasswordInput()}
        {renderSubmitButton()}
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  logInProp: (payload) => dispatch(logIn(payload)),
});

Login.propTypes = {
  logInProp: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
