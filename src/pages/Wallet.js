import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AddExpenseForm from '../components/AddExpenseForm';
import WalletHeader from '../components/WalletHeader';
import ExpensesTable from '../components/ExpensesTable';
import EditExpenseForm from '../components/EditExpenseForm';

class Wallet extends React.Component {
  render() {
    const { isEditing } = this.props;
    return (
      <div>
        <WalletHeader />
        { isEditing ? <EditExpenseForm /> : <AddExpenseForm /> }
        <ExpensesTable />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isEditing: state.wallet.isEditing,
});

Wallet.propTypes = {
  isEditing: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(Wallet);
