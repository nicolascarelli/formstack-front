export const ADD_VINYL = 'ADD_VINYL';
export const UPDATE_VINYL = 'UPDATE_VINYL';
export const REMOVE_VINYL = 'REMOVE_VINYL';
export const SET_INITIAL_VINYLS = 'SET_INITIAL_VINYLS';

export function addVinyl(vinyl) {
  return { type: ADD_VINYL, vinyl };
}

export function updateVinyl(vinyl) {
  return { type: UPDATE_VINYL, vinyl };
}

export function removeVinyl(id) {
  return { type: REMOVE_VINYL, id };
}

export function setInitialVinyls(vinyls) {
  return { type: SET_INITIAL_VINYLS, vinyls };
}