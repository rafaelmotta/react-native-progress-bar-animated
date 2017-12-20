import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import {
  AnimatedProgressBar,
} from '../../src/components';

describe('<AnimatedProgressBar />', () => {

  const props = {
    value: 0,
    width: 300,
    height: 10,
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AnimatedProgressBar {...props} />)
  });
  
  it('renders correctly', () => {
    expect(wrapper.length).toBe(1);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
})