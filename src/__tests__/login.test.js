
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import expect from "expect";
import Login from '../components/Login';

describe('Login Component', () => {
  const wrapper = shallow(<Login />);
  // const preventDefault = jest.fn();
  // it('renders without crashing', () => {
  //   expect(shallowToJson(wrapper)).toMatchSnapshot();
  // });
  it('renders state initially', () => {
    expect(wrapper.state().email).toEqual('');
    expect(wrapper.state().password).toEqual('');
  });
  it('renders appropriate number of inputs', () => {
    expect(wrapper.find('input').length).toEqual(2);
  });
  it('shows a submit button', () =>{
    expect(wrapper.find('.button').length).toEqual(1)
  })
});
