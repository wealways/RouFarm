import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { TodoWrapper } from './style';

import { ModalComponent } from '@/components/common';

function EmergencyQuest() {
  let emergencyQ = [
    { id: 1, content: '부모님에게 안부전화하기' },
    { id: 2, content: '30분 산책하며 머리 식히기' },
    { id: 3, content: '물 1L 마시기' },
  ];

  // 모달
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      {emergencyQ.map((value) => (
        <TodoWrapper key={value.id}>
          <TouchableOpacity onPress={openModal}>
            <Text>{value.content}</Text>
          </TouchableOpacity>
        </TodoWrapper>
      ))}

      {/* 모달 */}
      <ModalComponent showModal={showModal} setShowModal={setShowModal}>
        <TouchableOpacity>
          <Text>완료</Text>
        </TouchableOpacity>
      </ModalComponent>
    </>
  );
}

export default EmergencyQuest;
