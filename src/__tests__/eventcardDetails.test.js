import 'jsdom-global/register';
import React from 'react';
import { shallow } from "enzyme";
import shallowToJson  from 'enzyme-to-json';
import EventCard from '../components/EventCard';

describe('Eventcard Details component', () => {
  const wrapper = shallow(<EventCard />);
  it('Renders properly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
