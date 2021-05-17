import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import styled from 'styled-components/native';

import Modal from '@/components/common/ModalComponent'

import HeatmapContext from '@/contexts/Report/Heatmap';

const monthText = styled.Text`
  font-size:20;
  margin:5;
`
const weekText = styled.Text`
  font-size:15;
  margin:5;
`


const CustomDropdown = ({ date, flag }) => {
  const { heatmap, dateDispatch, weekDateDispatch } = useContext(HeatmapContext);

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };
  const onValueChange = (item) => {
    if (flag === 'month') {
      dateDispatch(item);
    } else if (flag === 'week') {
      weekDateDispatch(item)
    }
    setShowModal((prev) => !prev);
  }

  return (
    <>
      <TouchableOpacity onPress={toggleModal} style={{ padding: 5 }}>
        {flag === 'month' &&
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{heatmap.date.split('-')[0]}년 {heatmap.date.split('-')[1]}월 </Text>
        }
        {flag === 'week' &&
          <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{heatmap.date.split('-')[0]}년 {heatmap.weekDate.split('-')[1]}월 {heatmap.weekDate.split('-')[2].replace(/w/, '')}주차</Text>
        }
      </TouchableOpacity>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <Text style={{ marginBottom: 5 }}>날짜 선택 📆</Text>
        <ScrollView style={{ maxHeight: 100 }}>
          {
            date.map((d, idx) => (
              <TouchableOpacity
                key={idx}
                onPress={() => {
                  onValueChange(d)
                }}
                style={{ width: 150, alignItems: 'center' }}
              >
                {flag === 'month' &&
                  <Text style={{ fontSize: 20, margin: 5 }}>{d}</Text>
                }
                {flag === 'week' &&
                  <Text style={{ fontSize: 15, margin: 5 }}>{d.split('-')[0]}-{d.split('-')[1]} {d.split('-')[2].replace(/w/, '')}주차</Text>
                }
              </TouchableOpacity>
            ))
          }
        </ScrollView>
      </Modal>
    </>
  )
}

export default CustomDropdown;