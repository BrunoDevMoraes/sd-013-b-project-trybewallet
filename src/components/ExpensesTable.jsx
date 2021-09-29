import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteRow as deleteRowAction,
  attIsEditing as attIsEditingAction } from '../actions';

class ExpensesTable extends Component {
  constructor(props) {
    super(props);
    this.bindings();
  }

  bindings() {
    this.renderTable = this.renderTable.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
    this.renderRow = this.renderRow.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
    this.renderEditButton = this.renderEditButton.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  handleEdit(id) {
    const { attIsEditing, expenses } = this.props;
    const wantedExpense = expenses.find((expense) => expense.id === id);
    attIsEditing(wantedExpense);
  }

  handleDelete(id) {
    const { deleteRow, expenses } = this.props;
    const arrayOfExpenses = expenses;
    const filteredArray = arrayOfExpenses.filter((expense) => expense.id !== id);
    console.log(filteredArray);
    deleteRow(filteredArray);
  }

  renderEditButton(id) {
    return (
      <button
        type="button"
        data-testid="edit-btn"
        onClick={ () => this.handleEdit(id) }
      >
        Editar
      </button>
    );
  }

  renderDeleteButton(id) {
    return (
      <button
        type="button"
        data-testid="delete-btn"
        onClick={ () => this.handleDelete(id) }
      >
        Excluir
      </button>
    );
  }

  renderTableHeader() {
    return (
      <tr>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </tr>
    );
  }

  renderRow(expense) {
    const expenseName = expense.exchangeRates[expense.currency].name;
    const splittedName = expenseName.split('/');
    const correctExpenseName = splittedName[0];

    const conversion = expense.exchangeRates[expense.currency].ask;
    const conversionNumber = parseFloat(conversion);
    const roundedConversionString = conversionNumber.toFixed(2);

    const convertedValue = ((conversionNumber) * (expense.value));
    const roundedConvertedValueString = convertedValue.toFixed(2);

    return (
      <tr key={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{expense.value}</td>
        <td>{correctExpenseName}</td>
        <td>
          {roundedConversionString}
        </td>
        <td>{roundedConvertedValueString}</td>
        <td>Real</td>
        <td>
          {this.renderEditButton(expense.id)}
          {this.renderDeleteButton(expense.id)}
        </td>
      </tr>
    );
  }

  renderTable(expenses) {
    return (
      <table border="2">
        {this.renderTableHeader()}
        {expenses.map((expense) => this.renderRow(expense))}
      </table>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        { this.renderTable(expenses) }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteRow: (payload) => dispatch(deleteRowAction(payload)),
  attIsEditing: (payload) => dispatch(attIsEditingAction(payload)),
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteRow: PropTypes.func.isRequired,
  attIsEditing: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpensesTable);
