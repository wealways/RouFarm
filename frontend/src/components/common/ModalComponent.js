import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';

const ModalComponent = ({
  showModal,
  setShowModal,
  children, // 컴포넌트를 자식으로 넘겨받는다.
}) => {
  return (
    <>
      {showModal ? (
        <View>
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
    backgroundColor: 'white',
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
    elevation: 5,
  },
});

export default ModalComponent;
