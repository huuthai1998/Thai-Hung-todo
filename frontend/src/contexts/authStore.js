import React, { useReducer } from "react";
import { SET_USER } from "../constant";

const authReducer = (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
      };
    default:
      return state;
  }
};

const initialState = {
  user: {},
};
const AuthContext = React.createContext({
  authContext: initialState,
  setUser: () => {},
});

export const AuthProvider = (props) => {
  const [authContext, dispatch] = useReducer(authReducer, initialState);

  const setUser = (user) => {
    dispatch({
      type: SET_USER,
      payload: { user },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authContext: authContext,
        setUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => React.useContext(AuthContext);
