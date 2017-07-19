import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {toggleVisibility} from '../redux';
import ToggleVisibilityButton from './ToggleVisibilityButton';

const ToggleVisibilityButtonContainer = ({visibility, toggleVisibility}) => {
  return (
    <ToggleVisibilityButton onTouchTap={toggleVisibility} visibility={visibility} />
  );
};

export default connect(
  ({home: {visibility}}) => ({visibility}),
  dispatch => bindActionCreators({toggleVisibility}, dispatch)
)(ToggleVisibilityButtonContainer);