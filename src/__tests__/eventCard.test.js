import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import expect from 'expect';
import EventCard from '../components/EventCard';

// Enzyme.configure({ adapter: new Adapter() });

describe('event card component', () => {
  const wrapper = shallow(<EventCard />);
  //   const preventDefault = jest.fn();
  it('renders without crashing', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
  it('should render image', () => {
    expect(wrapper.find('img').length).toEqual(1);
  });
});
