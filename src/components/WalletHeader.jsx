import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WalletHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currency: 'BRL',
    };
    this.renderHeader = this.renderHeader.bind(this);
    this.renderTotalOutgoing = this.renderTotalOutgoing.bind(this);
  }

  renderTotalOutgoing() {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      const array = [];
      expenses.forEach((expense) => array.push({
        value: parseFloat(expense.value),
        conversion: parseFloat(expense.exchangeRates[expense.currency].ask),
      }));
      const secondArray = [];
      array.forEach((expense) => {
        secondArray.push(((expense.value) * (expense.conversion)));
      });
      const totalAmount = secondArray.reduce((total, price) => total + price, 0);
      return (Math.round(totalAmount * 100) / 100);
    }
    return 0;
  }

  renderHeader(email, currency) {
    return (
      <header>
        <h4 data-testid="email-field">{email}</h4>
        <h4 data-testid="total-field">
          Despesa Total:
          {this.renderTotalOutgoing()}
        </h4>
        <h4 data-testid="header-currency-field">
          Moeda:
          {currency}
        </h4>
      </header>
    );
  }

  render() {
    const { userEmail } = this.props;
    const { currency } = this.state;
    return (
      <div>
        {this.renderHeader(userEmail, currency)}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

WalletHeader.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, null)(WalletHeader);
