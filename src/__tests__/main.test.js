import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { shallowToJson } from 'enzyme-to-json';
import localStorage from 'mock-local-storage';

import Main from '../components/Main';

global.window = {};
window.localStorage = global.localStorage;

describe('Main component', () => {
  const wrapper = shallow(<Main />);
  wrapper.instance().handleSubmit({ preventDefault() {} });

  it('Renders properly without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('displays a search box', () => {
    expect(wrapper.find('[type="submit"]').length).toEqual(1);
  });
  it('renders a modal dialog', () => {
    expect(wrapper.find('Dialog').length).toEqual(1);
  });
  it('should have one form element', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });
  it('renders state initially', () => {
    expect(wrapper.state().eventList).toEqual([]);
    expect(wrapper.state().isLoggedIn).toEqual(false);
    expect(wrapper.state().open).toEqual(true);
    expect(wrapper.state().payload).toEqual({});
  });
  it('renders a floating action button', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
