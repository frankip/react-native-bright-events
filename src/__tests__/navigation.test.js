import React from 'react';
import localStorage from 'mock-local-storage';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import sinon from 'sinon';
import expect from 'expect';
import Navigation from '../components/Navigation';

const wrapper = shallow(<Navigation />);

describe('Navigation Component', () => {
  it("Renders properly ", () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('has navigation elememt', () => {
    expect(wrapper.find('nav').length).toEqual(1);
  });
  it('renders home icon', () => {
    expect(wrapper.find('.fa-home').length).toEqual(1);
  });
  it('renders logout icon', () => {
    expect(wrapper.find('.fa-sign-in').length).toEqual(1);
  });
  it('renders Link to other components', () => {
    expect(wrapper.find('Link').length).toEqual(2);
  });

});
