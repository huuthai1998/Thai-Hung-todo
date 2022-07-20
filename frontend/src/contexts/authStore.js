import React, { useReducer } from "react";
import { LOG_IN, SET_TOKEN } from "../constant";

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_TOKEN:
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

const initialState = {
  token: "",
  isLoading: false,
};
const AuthContext = React.createContext({
  authContext: initialState,
  setToken: () => {},
});

export const AuthProvider = (props) => {
  const [authContext, dispatch] = useReducer(authReducer, initialState);

  const setToken = (token) => {
    dispatch({
      type: SET_TOKEN,
      payload: { token },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authContext: authContext,
        setToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
