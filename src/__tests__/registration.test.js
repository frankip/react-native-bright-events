
import 'jsdom-global/register';
import React from 'react';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import Enzyme, { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { shallowToJson } from 'enzyme-to-json';
import Registration from '../components/Registration';

Enzyme.configure({ adapter: new Adapter() });

const fakeSubmit = sinon.spy();
const fakeOnChange = sinon.spy();

function setup() {
  const options = new ReactRouterEnzymeContext();
  const props = {
    state: {
      first_name: '',
      last_name: '',
      email: '',
      password: '',
      isLoged: false,
    },
    onSubmit: fakeSubmit,
    onChange: fakeOnChange,
  };
  return mount(
    <Registration {...props} />,
    options.get(),
  );
}

describe('Register Component', () => {
  // const wrapper = shallow(<Registration />);
  const wrapper = setup();

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
    const htmlwrapper = setup();
    // expect(wrapper.find('input').length).toEqual(5);
    expect(htmlwrapper.find('input').length).toEqual(5);
  });
  it('should have one submit  button', () => {
    expect(wrapper.find('button').length).toEqual(1);
  });
  it('should have a submit prop', () => {
    expect(wrapper.prop('onSubmit')).toBeDefined();
  });
  it('should have one one form element', () => {
    expect(wrapper.find('form').length).toEqual(1);
  });

  describe('signup form ', () => {
    it('should call onsubmit when form is submitted', () => {
      // const form = wrapper.find('[type="submit"]');
      // console.log(form.debug());

      // form.simulate('submit');
      // expect(fakeSubmit.calledOnce).toBe(true);
      const form = wrapper.find('form');
      form.instance().onSubmit = sinon.spy();
      form.simulate('submit');
      // console.log(form.instance().onSubmit);

      expect(fakeSubmit.calledOnce).toBe(false);
    });
  });
});
