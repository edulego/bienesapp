import {
    CREATE_BIEN,
    RETRIEVE_BIENES,
    UPDATE_BIEN,
    DELETE_BIEN,
    DELETE_ALL_BIENES
  } from "./types";
  
  import BienDataService from "../services/bien.service";
  
  export const createBien = (title, description) => async (dispatch) => {
    try {
      const res = await BienDataService.create({ title, description });
  
      dispatch({
        type: CREATE_BIEN,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const retrieveBienes = () => async (dispatch) => {
    try {
      const res = await BienDataService.getAll();
  
      dispatch({
        type: RETRIEVE_BIENES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const updateBien = (id, data) => async (dispatch) => {
    try {
      const res = await BienDataService.update(id, data);
  
      dispatch({
        type: UPDATE_BIEN,
        payload: data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const deleteBien = (id) => async (dispatch) => {
    try {
      await BienDataService.delete(id);
  
      dispatch({
        type: DELETE_BIEN,
        payload: { id },
      });
    } catch (err) {
      console.log(err);
    }
  };
  
  export const deleteAllBienes = () => async (dispatch) => {
    try {
      const res = await BienDataService.deleteAll();
  
      dispatch({
        type: DELETE_ALL_BIENES,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
  };
  
  export const findBienesByTitle = (title) => async (dispatch) => {
    try {
      const res = await BienDataService.findByTitle(title);
  
      dispatch({
        type: RETRIEVE_BIENES,
        payload: res.data,
      });
    } catch (err) {
      console.log(err);
    }
  };