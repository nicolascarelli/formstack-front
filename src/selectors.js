import { createSelector } from "reselect";

const getVinyl = (state, props) => {
  const id = props.match.params.id;
  let vinylById = state.vinyls.find((item) => item.id === id);
  if (typeof vinylById == "undefined") {
    vinylById = {
      id: "new",
      title: "",
      band: "",
      album: "",
    };
  }
  return vinylById;
};

export const makeGetVinylState = () =>
  createSelector([getVinyl], (vinyl) => vinyl);
