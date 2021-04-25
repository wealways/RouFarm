const OPENMODAL = 'modal/OPENMODAL';

export const modalOpen = () => ({ type: OPENMODAL });

const initialState = {
  open: false,
};

function modal(state = initialState, action) {
  switch (action.type) {
    case OPENMODAL:
      return {
        open: !state.open,
      };
    default:
      return state;
  }
}

export default modal;
