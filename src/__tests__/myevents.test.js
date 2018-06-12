import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import expect from 'expect';
import Myevents from '../components/myEvents';
import localStorage from 'mock-local-storage';
global.window = {};
window.localStorage = global.localStorage;

describe('Search form', () => {
  const wrapper = shallow(<Myevents />);
  wrapper.instance().handleSubmit({ preventDefault() {} });
  it('Renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('renders state initially', () => {
    expect(wrapper.state().eventList).toEqual([]);
    expect(wrapper.state().open).toEqual(true);
    expect(wrapper.state().payload).toEqual({});
    expect(wrapper.state().token).toEqual(null);
  });
  it('renders form inputs', () => {
    expect(wrapper.find('input').length).toEqual(4);
  });
});
