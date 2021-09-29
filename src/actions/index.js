export const logIn = (payload) => ({ type: 'LOG_IN', payload });

const attCurrencies = (payload) => ({ type: 'ATT_CURRENCIES', payload });

const saveNewExpense = (payload) => ({ type: 'SAVE_NEW_EXP', payload });

export const deleteRow = (payload) => ({ type: 'DELETE_ROW', payload });

export const attIsEditing = (payload) => ({ type: 'ATT_EDITING', payload });

export const submitEdition = (payload) => ({ type: 'SUBMIT_EDITION', payload });

export function fetchCurrencies() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const objResponse = await response.json();
    let currenciesArray = [];
    const currencies = ['USD', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
      'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    currencies.forEach((key) => {
      currenciesArray = [...currenciesArray, objResponse[key]];
    });
    return dispatch(attCurrencies(currenciesArray));
  };
}

export function fetchCurrenciesAndSaveNewExpense(expense) {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const objResponse = await response.json();
    let currenciesFilteredObj = {};
    const currencies = ['USD', 'USDT', 'CAD', 'EUR', 'GBP', 'ARS', 'BTC', 'LTC',
      'JPY', 'CHF', 'AUD', 'CNY', 'ILS', 'ETH', 'XRP'];
    currencies.forEach((key) => {
      currenciesFilteredObj = { ...currenciesFilteredObj, [key]: objResponse[key] };
    });
    const expenseAndCurrencies = { ...expense, exchangeRates: currenciesFilteredObj };
    return dispatch(saveNewExpense(expenseAndCurrencies));
  };
}
