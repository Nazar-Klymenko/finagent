export const fieldArrayState = {
  openDialog: true,
  formInitiated: false,
  editingMode: false,
  addingMode: false,
  editingIndex: 0,
};

export function reducer(state, action) {
  let newState;
  switch (action.type) {
    case "edit":
      newState = {
        ...state,
        editingMode: true,
        editingIndex: action.payload,
        openDialog: true,
      };
      break;
    case "submit":
      newState = {
        ...state,
        formInitiated: true,
        editingMode: false,
        addingMode: false,
      };
      break;
    case "firstApplicant":
      newState = {
        ...state,
        editingMode: true,
        openDialog: true,
      };
      break;
    case "subsequentApplicant":
      newState = {
        ...state,
        addingMode: true,
        editingMode: true,
        openDialog: true,
        editingIndex: action.payload,
      };
      break;
    case "secondVisit":
      newState = {
        ...state,
        formInitiated: true,
        addingMode: false,
      };
      break;
    case "setDialog":
      newState = {
        ...state,
        openDialog: action.payload,
      };
      break;
    case "setAddingMode":
      newState = {
        ...state,
        addingMode: action.payload,
      };
      break;
    default:
      throw new Error();
  }
  return newState;
}

export const setEdit = (dispatch, payload) => {
  return dispatch({ type: "edit", payload: 0 });
};

export const setSubmit = (dispatch, payload) => {
  return dispatch({ type: "submit", payload });
};
export const setFirstApplicant = (dispatch, payload) => {
  return dispatch({ type: "firstApplicant", payload });
};

export const setSubsequentApplicant = (dispatch, payload) => {
  return dispatch({ type: "subsequentApplicant", payload });
};
export const setSecondVisit = (dispatch, payload) => {
  return dispatch({ type: "secondVisit", payload });
};
export const setDialog = (dispatch, payload) => {
  return dispatch({ type: "setDialog", payload });
};
export const setAddingMode = (dispatch, payload) => {
  return dispatch({ type: "setAddingMode", payload });
};
