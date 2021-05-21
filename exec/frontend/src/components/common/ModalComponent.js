import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text } from 'react-native';
import { Overlay } from 'react-native-elements';
import theme from '../../theme';
const ModalComponent = ({
  showModal,
  setShowModal,
  children, // 컴포넌트를 자식으로 넘겨받는다.
}) => {
  return (
    <>
      {showModal ? (
        <View>
          <Overlay isVisible={showModal} />
          <Modal
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(false);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>{children}</View>
            </View>
          </Modal>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: theme.colors.third,
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 8,
  },
});

export default ModalComponent;
