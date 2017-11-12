import React from 'react';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import {IconButton} from 'material-ui';

export default ({onClick}) => (
  <IconButton tooltip='Delete' onClick={onClick}>
    <ActionDelete />
  </IconButton>
);