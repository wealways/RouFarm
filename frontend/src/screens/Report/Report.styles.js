import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex:1;
  background:#dce8ef;

`;
const Contents = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  /* align-items: center; */
  margin: 10px;
`;
const TitleText = styled.Text`
  font-size: ${({theme}) => theme.fontSizes.xxl}px;
  color: #000;
  margin:20px;
  text-align:center;
`
const SubtitleText = styled.Text`
  font-size:${({theme}) => theme.fontSizes.lg}px;
  color: #000;
  margin: 8px 0;
`
// const StyledText = styled.Text`
//   font-size: ${FontSize}px;
//   color: ${Color};
// `
const Card = styled.View`
  display:flex;
  flex-direction:row;
  padding: 16px;
  align-items:center;
  border-radius:8px;
  background: #fff;
  width: ${({width}) => width - 20}px;
  elevation: 12;
`;

// 월간 수확
const MonthChartView = styled.View`
  flex:4;
  background:#fff;
  border-radius:8px;
  padding: 8px;
`
const MonthTextView = styled.View`
  flex:2;
  margin-left:8px;
  align-items:center;
  justify-content:center;
`

// 실패 리스트
const FailListView = styled.View`
  background:#fff;
  elevation:12;
  border-radius:8px;
  padding: 16px;
  margin: 8px;
  flex:1;
`
// 요일별 달성률
const ChartView = styled.View`
  background:#fff;
  elevation:12;
  border-radius:8px;
  padding: 16px;
  margin: 8px;
  flex:1;
`

export {Wrapper, Contents, TitleText, SubtitleText, Card, MonthChartView, MonthTextView, FailListView, ChartView}