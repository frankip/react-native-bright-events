import Enzym from '../setupTests';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Registration from '../components/Registration';

describe('Register Component', () => {
  const wrapper = shallow(<Registration />);
  it('renders without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('renders state initially', () => {
    expect(wrapper.state().first_name).toEqual('');
    expect(wrapper.state().last_name).toEqual('');
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().password).toEqual('');
  });
});
