import React, { useState } from 'react';
import { TouchableOpacity, Image, Text } from 'react-native';
import { CheckBox } from 'react-native-elements';

import { ModalComponent } from '@/components/common';

import { TodoWrapper } from './style';

function DailyQuest() {
  let dailyQ = [
    { id: 1, content: '코딩 테스트 문제 풀기', checked: false },
    { id: 2, content: 'javascript 공부하기', checked: false },
    { id: 3, content: '책 읽기', checked: false },
  ];

  // 모달
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <>
      {dailyQ.map((value) => (
        <TodoWrapper key={value.id}>
          <TouchableOpacity onPress={openModal}>
            <Text>{value.content}</Text>
          </TouchableOpacity>
          <CheckBox
            checkedIcon={
              <Image
                style={{ width: 16, height: 16 }}
                source={require('@/assets/images/check-box.png')}
              />
            }
            uncheckedIcon={
              <Image
                style={{ width: 16, height: 16 }}
                source={require('@/assets/images/blank-check-box.png')}
              />
            }
            checked={value.checked}
            onPress={() => {
              !value.checked;
            }}
          />
        </TodoWrapper>
      ))}
      {/* 모달 */}
      <ModalComponent showModal={showModal} setShowModal={setShowModal}>
        <TouchableOpacity>
          <Text>수정</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text>삭제</Text>
        </TouchableOpacity>
      </ModalComponent>
    </>
  );
}

export default DailyQuest;
