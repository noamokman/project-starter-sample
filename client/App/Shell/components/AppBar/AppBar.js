import React from 'react';
import {AppBar} from 'material-ui';
import styled from 'styled-components';
import AppBarActions from '../AppBarActions';

const ClickableTitle = styled.span`
  cursor: pointer;
`;

export default ({home}) => (
  <AppBar title={<ClickableTitle>{'Starter'}</ClickableTitle>} onTitleClick={home} showMenuIconButton={false} iconElementRight={<AppBarActions />} />
);