import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient'


const Contents = styled.View`
  flex: 1;
  height:100%;
  /* width: 100%;
  height: 100%; */
  /* align-items: center; */
  margin: 10px;
  justify-content:space-between;
`;
const Card = styled.View`
  display:flex;
  /* flex-direction:column; */
  padding: 20px;
  margin-bottom: 10px;
  /* justify-content:space-between; */
  /* align-items:space-between; */
  border-radius:8px;
  background: #fff;
  width: ${({ width }) => width - 20}px;
  max-height: ${({ height }) => height / 2}px;
  
  elevation: 12;
`;
const ListView = styled.View`
  border-bottom-color:#a1a1a1;
  border-bottom-width: 1px;
  border-radius: 1px;
  margin:5px;
  padding:5px;
  display:flex;
  flex-direction:row;
  /* justify-content:space-between; */
  align-items:center;
  /* width:270px; */
`
const TagText = styled.Text`
  padding:5px;
  margin-right:10px;
  border-radius:10px;
  background-color:${({ name }) => name === "건강" ? "#6f95aa" : name === "자기개발" ? "#0c985e" : name === "일상" ? "#dce8ef" : "#687396"};
  color:${({ name }) => name != "일상" ? "white" : "#000"};
`


const Detail = ({ route }) => {
  useEffect(() => {
    console.log('here')
    console.log(route, 'route')
    return () => {

    }
  }, [])

  const width = useWindowDimensions().width;
  const height = useWindowDimensions().height;

  const date = route.params.date.split('-')
  const year = date[0]
  const month = date[1]
  const day = date[2]


  const res = [
    { id: 1, routine: '코딩 테스트 문제 풀기', tag: '자기개발', completed: false },
    { id: 2, routine: '헬스장 가기', tag: '건강', completed: true },
    { id: 3, routine: '명상하기', tag: '일상', completed: true },
    { id: 3, routine: '명상하기', tag: '일상', completed: true },
    { id: 3, routine: '명상하기', tag: '일상', completed: true },
  ]
  const completed = res.filter(r => r.completed)
  const notCompleted = res.filter(r => !r.completed)
  const rate = completed.length / res.length * 100
  return (
    <LinearGradient
      colors={['#dce8ef', '#fff']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <Contents>
        <Card width={width} height={height}>
          <Text style={styles.date}>{year}년 {month}월 {day}일</Text>
          <ScrollView>
            <Text style={{ fontSize: 20, marginTop: 5, marginBottom: 5 }}>🎉 성공</Text>
            <View style={{ marginLeft: 20 }}>
              {completed.map((data, idx) => (
                <ListView key={idx}>
                  <TagText name={data.tag}>#{data.tag}</TagText>
                  <Text>
                    {data.routine}
                  </Text>
                </ListView>
              ))}
            </View>
            <Text style={{ fontSize: 20, marginTop: 5, marginBottom: 5 }}>❗ 실패</Text>
            <View style={{ marginLeft: 20 }}>
              {notCompleted.map((data, idx) => (
                <ListView key={idx}>
                  <TagText name={data.tag}>#{data.tag}</TagText>
                  <Text>
                    {data.routine}
                  </Text>
                </ListView>
              ))}
            </View>
          </ScrollView>
        </Card>
        <View style={styles.result}>
          {rate == 100 &&
            <Text style={styles.comment}>
              훌륭합니다!! 👍👍
            </Text>
          }
          {rate >= 50 && rate < 100 &&
            <Text style={styles.comment}>
              잘하고 있어요.
              조금만 더 노력합시다! 🤜
            </Text>
          }
          {rate < 50 &&
            <Text style={styles.comment}>
              뭐함? 왜케 안함 👿
            </Text>
          }
          <View style={styles.rate}>
            <Text style={{ fontSize: 20, borderBottomWidth: 1, paddingRight: 10 }}>
              달성 :
            </Text>
            <Text style={{ fontSize: 30, borderBottomWidth: 1 }}>
              {rate.toFixed(1)}%
            </Text>
          </View>
        </View>
      </Contents>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  date: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 10
  },
  result: {
    margin: 15,
    justifyContent: 'space-between',
    minHeight: 120
  },
  comment: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: 15,
  },
  rate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  }
})

export default Detail;