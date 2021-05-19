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
  font-size:${({theme}) => theme.fontSizes.md}px;
  color: #000;
  margin: 8px 2px;
  border-bottom-width:2px;
`
// const StyledText = styled.Text`
//   font-size: ${FontSize}px;
//   color: ${Color};
// `
const Card = styled.View`
  display:flex;
  flex-direction:row;
  padding: 10px 16px;
  margin-bottom: 10px;
  align-items:center;
  border-radius:8px;
  background: #fff;
  width: ${({width}) => width - 20}px;
  elevation: 12;
  background-color:#fefdfa;
`;

// 월간 수확
const MonthChartView = styled.View`
  flex:4;
  background-color:#fefdfa;
  border-radius:8px;
  padding: 0 8px;
  
`
const MonthTextView = styled.View`
  flex:2;
  margin-left:8px;
  align-items:center;
  justify-content:center;
  background-color:#fefdfa;
`

// 실패 리스트
const FailListView = styled.View`
  background-color:#fefdfa;
  elevation:12;
  border-radius:8px;
  padding: 16px;
  margin: 8px;
  flex:1;
`
// 요일별 달성률
const ChartView = styled.View`
  background-color:#fefdfa;
  elevation:12;
  border-radius:8px;
  padding: 16px;
  margin: 8px;
  flex:1;
`

export {Wrapper, Contents, TitleText, SubtitleText, Card, MonthChartView, MonthTextView, FailListView, ChartView}