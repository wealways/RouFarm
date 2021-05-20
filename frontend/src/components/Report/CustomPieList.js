import React,{useContext, useEffect, useState} from 'react';
import {Text, View,ScrollView} from 'react-native';
import styled from 'styled-components/native';

import HeatmapContext from '@/contexts/Report/Heatmap';

const TagText = styled.Text`
  padding:7px;
  font-size:14px;
  border-radius:10px;
  background-color:${({name}) => name==="운동" ? "#DE9E9B" : name==="지식" ? "#7EC07A" : name==="자기개발" ? "#86C5C9" : "#E75B46"};
  color:${({name}) => name!="자기개발"?"white":"#000"};
`
const ItemView= styled.View`
  margin: 3px 3px;
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  align-items:center;
`

const CustomHeatmapRate = ({res}) => {
  const [data,setData] = useState({})
  const {heatmap} = useContext(HeatmapContext);
  
  useEffect(()=>{
    setData(res[heatmap.date]['해쉬태그별'])
  },[heatmap.date])

  let list
  if(heatmap.pieClick != ''){
    list = data[heatmap.pieClick]
  }

  return (
    <View style={{flex:1}}>
      {list===undefined && <Text>
        파이 한 조각을 클릭해주세요 🍩
      </Text> }
      {list &&
      <>
        <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'baseline', marginLeft:3,marginRight:3,marginTop:5,paddingBottom:5, borderStyle:'solid',borderBottomWidth:1}}>
          <TagText name={heatmap.pieClick}>#{heatmap.pieClick}</TagText>
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:100}}>
            <Text>개수</Text>
            <Text>달성률</Text>
          </View>
        </View>
        <ScrollView style={{maxHeight:130}}>
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
          <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',marginLeft:3,marginRight:3,marginTop:5,borderStyle:'solid',borderColor:"#2c5061", borderTopWidth:2}}>
            <View></View>
            <View style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:100}}>
              <Text style={{fontSize:20}}>{list.reduce((acc,cur)=>acc+cur.cnt,0)}</Text>
              <Text style={{fontSize:20}}>{(list.reduce((acc,cur)=>acc+cur.rate,0)/list.length).toFixed(1)}</Text>
            </View>
          </View>
        </ScrollView>
      </>
      }
    </View>
  )
}

export default CustomHeatmapRate;

