import {
    CREATE_BIEN,
    RETRIEVE_BIENES,
    UPDATE_BIEN,
    DELETE_BIEN,
    DELETE_ALL_BIENES,
  } from "../actions/types";
  
  const initialState = [];
  
  function bienReducer(bienes = initialState, action) {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_BIEN:
        return [...bienes, payload];
  
      case RETRIEVE_BIENES:
        return payload;
  
      case UPDATE_BIEN:
        return bienes.map((bien) => {
          if (bien.id === payload.id) {
            return {
              ...bien,
              ...payload,
            };
          } else {
            return bien;
          }
        });
  
      case DELETE_BIEN:
        return bienes.filter(({ id }) => id !== payload.id);
  
      case DELETE_ALL_BIENES:
        return [];
  
      default:
        return bienes;
    }
  };
  
  export default bienReducer;