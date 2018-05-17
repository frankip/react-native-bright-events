import Enzym from '../setupTests';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Registration from '../components/Registration';

describe('Register Component', () => {
  const wrapper = shallow(<Registration />);
  const wrapper_instance = wrapper.instance()

  console.log('fgh', wrapper.props);
  it('renders without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('renders state initially', () => {
    expect(wrapper.state().first_name).toEqual('');
    expect(wrapper.state().last_name).toEqual('');
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().password).toEqual('');
  });
  it('renders appropriate number of inputs', () => {
    expect(wrapper.find('input').length).toEqual(5);
  });
  it('return an error if input is empty', () => {
    const payload = {

      first_name: '',
      last_name: '',
      email: '',
      password: '',

    };
    console.log("instance", wrapper_instance.handleOnSubmit);
  });
});
