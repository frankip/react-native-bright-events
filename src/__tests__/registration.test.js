
import React from 'react';

import expect from "expect";
import { shallow, mount, render } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Registration from '../components/Registration';

describe('Register Component', () => {
  const wrapper = shallow(<Registration />);

  // it('renders without crashing', () => {
  //   expect(shallowToJson(<Registration />)).toMatchSnapshot();
  // });
  it('renders state initially', () => {
    expect(wrapper.state().first_name).toEqual('');
    expect(wrapper.state().last_name).toEqual('');
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().password).toEqual('');
  });
  it('renders appropriate number of inputs', () => {
    expect(wrapper.find('input').length).toEqual(5);
  });
  it('should have one submit  button', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });
  it('should have a submit prop', () => {
    expect(wrapper.prop("handleOnSubmit")).toBeDefined();
    console.log(wrapper.prop);
  });
  it('should have one one form element', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });
  // it('return an error if input is empty', () => {
  //   wrapper.instance().handleOnSubmit();
  //   wrapper.instance().state.first_name = 'loice';
  //   wrapper.instance().handleOnSubmit();
  // });
});
