import React from 'react';
import App from '../../../client/App';
import {shallow} from 'enzyme';

describe('App component', () => {
  it('renders without crashing', () => {
    shallow(<App />);
  });
});