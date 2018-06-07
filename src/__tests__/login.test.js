
import "jsdom-global/register";
import React from 'react';
import { shallowToJson } from 'enzyme-to-json';
import Enzyme, { mount, shallow } from 'enzyme';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';
import expect from 'expect';
import Login from '../components/Login';

Enzyme.configure({ adapter: new Adapter() });

const fakeSubmit = sinon.spy();
const fakeOnChange = sinon.spy();

function setup() {
  const options = new ReactRouterEnzymeContext();
  const props = {
    state: {
      email: '',
      password: '',
      loggedIn: false,
      access_token: '',
    },
    onSubmit: fakeSubmit,
    onChange: fakeOnChange,
  };
  return mount(
    <Login {...props} />,
    options.get(),
  );
}

describe('Login Component', () => {
  const wrapper = setup();

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
  it('shows a submit button', () => {
    expect(wrapper.find('.button').length).toEqual(1);
  });
  it('should render a form', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });
  it('simulates click onsubmit', () => {
    const form = wrapper.find('form');
    form.simulate('submit', { preventDefault() { } });
    expect(fakeSubmit.called).toBe(false);
  });
  it('should have a submit prop', () => {
    expect(wrapper.prop('onSubmit')).toBeDefined();
  });
});
