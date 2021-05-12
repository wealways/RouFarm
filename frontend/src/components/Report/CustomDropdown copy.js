import React,{useState,useContext} from 'react';
import {View,Text,TouchableOpacity,ScrollView} from 'react-native'

import Modal from '@/components/common/ModalComponent'

import HeatmapContext from '@/contexts/Report/Heatmap';

const CustomDropdown = ({date}) => {
  const {heatmap,dateDispatch} = useContext(HeatmapContext);
  console.log('히트맵',heatmap)

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  const onValueChange = (item) => {
    dateDispatch(item);
    setShowModal((prev) => !prev);
  }
  

  return (
    <>
      <TouchableOpacity onPress={toggleModal} style={{padding:5}}>
        <Text style={{fontSize:15,fontWeight:'bold'}}>{heatmap.date.split('-')[0]}년 {heatmap.date.split('-')[1]}월 </Text>
      </TouchableOpacity>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <Text>날짜 선택 📆</Text>
        <ScrollView style={{maxHeight:100}}>
        {
          date.map((d,idx)=>(
            <TouchableOpacity key={idx} onPress={() => onValueChange(d)} style={{width:150,alignItems:'center'}}>
              <Text style={{fontSize:20,margin:5}}>{d}</Text>
            </TouchableOpacity>
          ))
        }
        </ScrollView>
      </Modal>
    </>
  )
}

export default CustomDropdown;