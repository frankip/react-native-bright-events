// import 'jsdom-global/register';
import React from 'react';
import expect from 'expect';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import ReactRouterEnzymeContext from 'react-router-enzyme-context';

const options = new ReactRouterEnzymeContext();

global.React = React;
global.expect = expect;
global.Adapter = Adapter;
global.Enzyme = Enzyme;
global.mount = mount;
global.shallow = shallow;
global.sinon = sinon;
global.options = options;

// test('works', () => {
//   expect(true).toBe(true);
// });
