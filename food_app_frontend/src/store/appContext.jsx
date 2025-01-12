import react, { useContext, useReducer, createContext } from "react";

const initialState = {
  authenticatedUser: {
    username: null,
    id: null,
    isAuthenticated: false,
  },
};

const ActionTypes = {
  LOGIN_USER: "LOGIN_USER",
  LOGOUT_USER: "LOGOUT_USER",
};

const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_USER:
      return {
        ...state,
        authenticatedUser: {
          username: action.payload.username,
          id: action.payload._id || action.payload.id,
          isAuthenticated: true,
        },
      };

    case ActionTypes.LOGOUT_USER: {
      return {
        ...state,
        authenticatedUser: initialState.authenticatedUser,
      };
    }
    default:
      return state;
  }
};

const AppContext = createContext();

// provider function

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

// Action creators
export const Actions = {
  loginUser: (userData) => ({
    type: ActionTypes.LOGIN_USER,
    payload: userData,
  }),

  logoutUser: () => ({
    type: ActionTypes.LOGOUT_USER,
  }),
};

export default AppContext;
