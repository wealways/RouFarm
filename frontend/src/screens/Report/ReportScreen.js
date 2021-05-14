import React, { useState, useEffect, useContext } from 'react';
import {
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  StyleSheet
} from 'react-native';

//styled
import styled from 'styled-components/native';
import {
  Wrapper,
  Contents,
  TitleText,
  SubtitleText,
  Card,
  MonthChartView,
  MonthTextView,
  FailListView,
  ChartView,
} from './Report.styles';
import LinearGradient from 'react-native-linear-gradient'

import Icon from 'react-native-vector-icons/FontAwesome';

// components
import CustomHeatmapChart from '@/components/Report/CustomHeatmapChart';
import CustomHeatmapRate from '@/components/Report/CustomHeatmapRate';
import FailView from '@/components/Report/CustomFailList';
import CustomFailPicker from '@/components/Report/CustomFailPicker';
import CustomBarChart from '@/components/Report/CustomBarChart';
import CustomPieChart from '@/components/Report/CustomPieChart';
import CustomPieList from '@/components/Report/CustomPieList';
import CustomDropdown from '@/components/Report/CustomDropdown';

//Context API
import { HeatmapProvider } from '@/contexts/Report/Heatmap';
import { PieProvider } from '@/contexts/Report/Pie';
import { FailListProvider } from '@/contexts/Report/FailList';

function ReportScreen({ navigation }) {

  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  const TopTab = ({
    tabs: ['월간 리포트', '주간 리포트'],
    lineColor: '#000066',
    noSelectedStyled: { color: '#525252', fontSize: 14 },
    selectedStyle: { color: 'black', fontWeight: 'bold', fontSize: 14 },
    tabStyle: { paddingTop: 12, paddingBottom: 5, marginRight: 10 }
  })

  const [showIndex, setShowIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // setLoading(true);
  })

  // 월간
  const date = ['2021-05', '2021-04', '2021-03']
  // 주간
  const weekDate = ['2021-05-w3', '2021-05-w2', '2021-05-w1']

  return (
    <LinearGradient
      colors={['#dce8ef', '#fff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <HeatmapProvider>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* <TitleText> Report Page</TitleText> */}
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {TopTab.tabs.map((d, idx) => {
              return (
                <View
                  key={idx}
                  onTouchStart={() => {
                    if (showIndex !== idx) {
                      setLoading(false);
                      setShowIndex(idx);
                    }
                  }}
                  style={{
                    borderBottomWidth: showIndex === idx ? 1 : 0,
                    borderBottomColor: TopTab.lineColor,
                    width: width / 2,
                    alignItems: 'center'
                  }}
                >
                  <Text
                    style={[
                      showIndex === idx ? TopTab.selectedStyle : TopTab.noSelectedStyled,
                      TopTab.tabStyle
                    ]}
                  >
                    {d}
                  </Text>
                </View>
              )
            })}
          </View>
          {showIndex === 0 &&
            <>
              {/* section 1 - 월간 수확 */}
              <Contents>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                  <CustomDropdown date={date} flag={'month'} />
                  <Icon name="caret-down" size={15} color="#000" style={{ marginRight: 6 }} />
                </View>
                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <SubtitleText>월간 수확</SubtitleText>
                </View>
                <View>
                  <Card width={width}>
                    <MonthChartView>
                      <CustomHeatmapChart navigation={navigation} />
                    </MonthChartView>
                    <MonthTextView>
                      <CustomHeatmapRate />
                    </MonthTextView>
                  </Card>
                </View>
              </Contents>
              {/* section 4 - 해쉬태그 별 달성률 */}
              <Contents>
                {/* <PieProvider> */}
                <SubtitleText>해쉬태그 별 루틴 개수</SubtitleText>
                <View>
                  <Card width={width}>
                    <CustomPieChart date={date} />
                  </Card>
                  <Card width={width}>
                    <CustomPieList />
                  </Card>
                </View>
                {/* </PieProvider> */}
              </Contents>
            </>
          }
          {showIndex === 1 &&
            <>
              {/* section 2 - 실패 리스트 */}
              <Contents>
                <FailListProvider>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <CustomDropdown date={weekDate} flag={'week'} />
                    <Icon name="caret-down" size={15} color="#000" style={{ marginRight: 6 }} />
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 330 }}>
                    <SubtitleText>실패리스트</SubtitleText>
                  </View>
                  <Card width={width}>
                    <FailView />
                  </Card>
                </FailListProvider>
              </Contents>
              {/* section 3 - 요일 별 달성률 */}
              <Contents>
                <SubtitleText>요일 별 달성률</SubtitleText>
                <View>
                  <Card width={width}>
                    <CustomBarChart />
                  </Card>
                </View>
              </Contents>
            </>
          }


        </ScrollView>
      </HeatmapProvider>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default ReportScreen;
