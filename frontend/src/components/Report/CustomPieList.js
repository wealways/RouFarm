import React,{useContext} from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components/native';
import PieContext from '@/contexts/Report/Pie';


const TagText = styled.Text`
  padding:7px;
  font-size:14px;
  border-radius:10px;
  background-color:${({name}) => name==="건강" ? "#6f95aa" : name==="자기개발" ? "#0c985e" : name==="일상" ? "#dce8ef" : "#687396"};
  color:${({name}) => name!="일상"?"white":"#000"};
`
const ItemView= styled.View`
  margin: 3px 3px;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
`

const CustomHeatmapRate = () => {
  const {Pie} = useContext(PieContext);

  const data ={
    '건강':[
      {id:1,content:'조깅',cnt:20,rate:0.7},
      {id:2,content:'필라테스가기',cnt:4,rate:1},
    ],
    '자기개발':[
      {id:1,content:'1일1커밋',cnt:30,rate:0.8},
      {id:2,content:'독서',cnt:8,rate:0.5},
    ],
    '일상':[
      {id:1,content:'빨래',cnt:4,rate:1},
      {id:2,content:'아침에 바로 일어나기',cnt:30,rate:0.8},
      {id:2,content:'야식안먹기',cnt:30,rate:0.4},
    ],
    '없음':[
      {id:1,content:'멍때리기',cnt:30,rate:1},
      {id:2,content:'숨쉬기',cnt:30,rate:0.8},
    ]
  }
  let list
  if(Pie.click != ''){
    list = data[Pie.click]
  }
  return (
    <View>
      {list===undefined && <Text>
        파이 한 조각을 클릭해주세요 🍩
      </Text> }
      {list &&
      <>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'baseline', marginLeft:3,marginRight:3,width:300,marginTop:5,paddingBottom:5, borderStyle:'solid',borderBottomWidth:1}}>
          <TagText name={Pie.click}>#{Pie.click}</TagText>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:100}}>
            <Text>개수</Text>
            <Text>달성률</Text>
          </View>
        </View>
        <View>
          {list.map((item,i)=>(
            <ItemView key={i}>
              <Text>{item.content}</Text>
              <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:100}}>
                <Text>{item.cnt}</Text>
                <Text>{item.rate}</Text>
              </View>
            </ItemView>
          ))}
        </View>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginLeft:3,marginRight:3,width:300,marginTop:5,borderStyle:'solid',borderColor:"#000066", borderTopWidth:2}}>
          <View></View>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:100}}>
            <Text style={{fontSize:20}}>{list.reduce((acc,cur)=>acc+cur.cnt,0)}</Text>
            <Text style={{fontSize:20}}>{(list.reduce((acc,cur)=>acc+cur.rate,0)/list.length).toFixed(1)}</Text>
          </View>
        </View>
      </>
      }
    </View>
  )
}

export default CustomHeatmapRate;

