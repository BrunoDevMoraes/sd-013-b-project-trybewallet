const INITIAL_STATE = {
  expenses: [],
  isEditing: false,
  editingExpense: {},
};

const ATT_CURRENCIES = 'ATT_CURRENCIES';
const SAVE_NEW_EXP = 'SAVE_NEW_EXP';
const DELETE_ROW = 'DELETE_ROW';
const ATT_EDITING = 'ATT_EDITING';
const SUBMIT_EDITION = 'SUBMIT_EDITION';

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ATT_CURRENCIES:
    return ({
      ...state,
      currencies: action.payload,
    });
  case SAVE_NEW_EXP:
    return ({
      ...state,
      expenses: [...state.expenses, action.payload],
    });
  case DELETE_ROW: {
    return ({
      ...state,
      expenses: action.payload,
    });
  }
  case ATT_EDITING: {
    return ({
      ...state,
      isEditing: true,
      editingExpense: action.payload,
    });
  }
  case SUBMIT_EDITION: {
    console.log(action.payload);
    return ({
      ...state,
      expenses: action.payload,
      isEditing: false,
      editingExpense: {},
    });
  }
  default:
    return state;
  }
};

export default wallet;
