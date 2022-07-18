import React, { useReducer } from "react";
import { ADD_FAVORITE, REMOVE_FAVORITE, SET_TOKEN } from "../constant";

const postReducer = (state, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      return { favorites: [...state.favorites, action.payload.id] };
    case REMOVE_FAVORITE:
      return {
        favorites: state.favorites.filter((id) => id !== action.payload.id),
      };
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
  favorites: [],
  token: "",
};
const PostContext = React.createContext({
  postContext: initialState,
  addFavorite: () => {},
  removeFavorite: () => {},
  setToken: () => {},
});

export const PostProvider = (props) => {
  const [postContext, dispatch] = useReducer(postReducer, initialState);

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
    <PostContext.Provider
      value={{
        postContext,
        addFavorite,
        removeFavorite,
        setToken,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export const useTodoContext = () => React.useContext(PostContext);
