// action 타입
const OPENMODAL = 'modal/OPENMODAL';

// action 생성자
export const modalOpen = () => ({ type: OPENMODAL });

// 초기화
const initialState = {
  open: false,
};

// reducer 생성
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
