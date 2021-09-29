import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCurrencies, submitEdition as submitEditionAction } from '../actions';

class EditExpenseForm extends Component {
  constructor(props) {
    super(props);
    const { editingExpense:
      { id, value, currency, method, tag, description } } = this.props;
    this.state = {
      id,
      cost: value,
      description,
      currencyChecked: currency,
      method,
      tag,
    };
    this.bindings();
  }

  componentDidMount() {
    const { requestCurrencies } = this.props;
    requestCurrencies();
  }

  bindings() {
    this.renderEditForm = this.renderEditForm.bind(this);
    this.renderCostInput = this.renderCostInput.bind(this);
    this.renderDescriptionInput = this.renderDescriptionInput.bind(this);
    this.renderCurrenciesSelect = this.renderCurrenciesSelect.bind(this);
    this.renderPaymentMethodSelect = this.renderPaymentMethodSelect.bind(this);
    this.renderTagSelect = this.renderTagSelect.bind(this);
    this.renderFormButton = this.renderFormButton.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const eventName = event.target.name;
    this.setState({
      [eventName]: event.target.value,
    });
  }

  handleClick() {
    const { expenses, submitEdition, editingExpense: { exchangeRates } } = this.props;
    const arrExpenses = [...expenses];
    const { id, cost, description, currencyChecked, method, tag } = this.state;
    const expenseObj = {
      id,
      value: cost,
      currency: currencyChecked,
      method,
      tag,
      description,
      exchangeRates,
    };
    arrExpenses.splice(id, 1, expenseObj);
    submitEdition(arrExpenses);
  }

  renderCostInput() {
    const { cost } = this.state;
    return (
      <label htmlFor="valorId">
        Valor
        <input
          name="cost"
          type="text"
          value={ cost }
          onChange={ this.handleChange }
          id="valorId"
        />
      </label>
    );
  }

  renderDescriptionInput() {
    const { description } = this.state;
    return (
      <label htmlFor="descriçãoId">
        Descrição
        <input
          name="description"
          type="text"
          value={ description }
          id="descriçãoId"
          onChange={ this.handleChange }
        />
      </label>
    );
  }

  renderCurrenciesSelect() {
    const { currenciesArr } = this.props;
    const { currencyChecked } = this.state;
    return (
      <label htmlFor="moedaId">
        Moeda
        <select
          value={ currencyChecked }
          name="currencyChecked"
          id="moedaId"
          onChange={ this.handleChange }
        >
          {currenciesArr.map((currency) => (
            <option
              key={ currency.code }
              value={ currency.code }
            >
              { currency.code }
            </option>
          ))}
        </select>
      </label>
    );
  }

  renderPaymentMethodSelect() {
    const { method } = this.state;
    return (
      <label htmlFor="pagamentoId">
        Método de pagamento
        <select
          value={ method }
          name="method"
          id="pagamentoId"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
      </label>
    );
  }

  renderTagSelect() {
    const { tag } = this.state;
    return (
      <label htmlFor="tagId">
        Tag
        <select
          value={ tag }
          name="tag"
          id="tagId"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
      </label>
    );
  }

  renderFormButton() {
    return (
      <button
        type="button"
        onClick={ this.handleClick }
      >
        Editar despesa
      </button>
    );
  }

  renderEditForm() {
    return (
      <form>
        {this.renderCostInput()}
        {this.renderDescriptionInput()}
        {this.renderCurrenciesSelect()}
        {this.renderPaymentMethodSelect()}
        {this.renderTagSelect()}
        {this.renderFormButton()}
      </form>
    );
  }

  render() {
    const { currenciesArr } = this.props;
    return (
      <div>
        {currenciesArr ? this.renderEditForm() : <p>Loading...</p>}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currenciesArr: state.wallet.currencies,
  editingExpense: state.wallet.editingExpense,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  requestCurrencies: () => dispatch(fetchCurrencies()),
  submitEdition: (payload) => dispatch(submitEditionAction(payload)),
});

EditExpenseForm.propTypes = {
  requestCurrencies: PropTypes.func.isRequired,
  submitEdition: PropTypes.func.isRequired,
  currenciesArr: PropTypes.arrayOf(
    PropTypes.object,
  ).isRequired,
  editingExpense: PropTypes.shape({
    id: PropTypes.number,
    value: PropTypes.number,
    currency: PropTypes.string,
    method: PropTypes.string,
    tag: PropTypes.string,
    description: PropTypes.string,
    exchangeRates: PropTypes.objectOf(PropTypes.object),
  }).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditExpenseForm);
