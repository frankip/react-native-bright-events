
import 'jsdom-global/register';
import React from 'react';
import { shallow } from "enzyme";
import shallowToJson  from 'enzyme-to-json';
import EventCardDetails from '../components/EventCardDetails';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import localStorage from "mock-local-storage";
import EventCard from '../components/EventCard';

describe('Eventcard Details component', () => {
  const wrapper = shallow(<EventCard />);
  // const wrapper = setup();
  it('Renders properly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
