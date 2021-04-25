import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ModalComponent from '@/components/ModalComponent';
import { modalOpen } from '@/modules/modal';

const ModalContainer = ({ active }) => {
  return <ModalComponent active={active} />;
};

// const mapStateToProps = (state) => ({
//   open: state.open,
// });

// const mapDispatchToProps = (dispatch) =>
//   bindActionCreators(
//     {
//       modalOpen,
//     },
//     dispatch,
//   );
export default connect(
  (state) => ({
    open: state.open,
  }),
  {
    modalOpen,
  },
)(ModalContainer);
