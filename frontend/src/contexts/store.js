import React, { useReducer } from "react";
import { ADD_FAVORITE, REMOVE_FAVORITE, SET_TOKEN } from "../constant";

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
};
const AuthContext = React.createContext({
  authContext: initialState,
  addFavorite: () => {},
  removeFavorite: () => {},
  setToken: () => {},
});

export const AuthProvider = (props) => {
  const [postContext, dispatch] = useReducer(authReducer, initialState);

  const addFavorite = (id) => {
    dispatch({
      type: ADD_FAVORITE,
      payload: { id },
    });
  };

  const removeFavorite = (id) => {
    dispatch({
      type: REMOVE_FAVORITE,
      payload: { id },
    });
  };

  const setToken = (token) => {
    dispatch({
      type: SET_TOKEN,
      payload: { token },
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authContext: postContext,
        addFavorite,
        removeFavorite,
        setToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useTodoContext = () => React.useContext(AuthContext);
