import { ADD_VINYL, UPDATE_VINYL, REMOVE_VINYL, SET_INITIAL_VINYLS } from '../actions/actions';

const initialState = {
  vinyls: []
};

function rootReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_VINYL:
      console.log(action.vinyl)
      return {
        vinyls: [
          ...state.vinyls,
          {
            id: action.vinyl.id,
            title: action.vinyl.title,
            band: action.vinyl.band,
            album: action.vinyl.album
          }
        ]
      };
    case REMOVE_VINYL:
      return {
        vinyls: state.vinyls.filter((vinyl) => vinyl.id != action.id)
      };
    case UPDATE_VINYL:
      return {
        vinyls: state.vinyls.map((vinyl) => vinyl.id == action.vinyl.id ? action.vinyl : vinyl )
    };
    case SET_INITIAL_VINYLS:
      return {
        vinyls: [
          ...state.vinyls,
          ...action.vinyls
        ]
      };

    default:
      return state;
  };
}

export default rootReducer;