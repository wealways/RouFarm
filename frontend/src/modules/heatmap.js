import { createAction, handleActions } from 'redux-actions';

// action 타입
const HEATMAP_CHANGE = 'heatmap/CHANGE';

// action 생성
export const heatmapChange = createAction(HEATMAP_CHANGE, (input) => input);

// 초기화
const nowdate = new Date();
const nowyear = nowdate.getFullYear();
let nowmonth = nowdate.getMonth() + 1;
nowmonth = nowmonth >= 10 ? nowmonth : '0' + nowmonth;

const initialState = {
  date: `${nowyear}-${nowmonth}`,
};

// Reducer 함수
const heatmap = handleActions(
  {
    [HEATMAP_CHANGE]: (state, { payload: input }) => ({
      ...state,
      date: input,
    }),
  },
  initialState,
);

export default heatmap;
