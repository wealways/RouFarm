import React from 'react';
import { Modal, StyleSheet, Pressable, View } from 'react-native';

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
            style={{ top: '50%', left: '50%' }}
            animationType="fade"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
              setShowModal(!showModal);
            }}>
            <View
              style={styles.centeredView}
              // style={{
              //   position: 'absolute',
              //   top: '50%',
              //   left: '50%',
              //   transform: [{ translateX: '-50%%' }, { translateY: -50 }],
              // }}
            >
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
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
