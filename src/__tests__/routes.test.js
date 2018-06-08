
import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import Routes from '../Routes';


describe('RecipesAddModal', () => {
  const wrapper = shallow(<Routes />);
  it('Renders properly ', () => {
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
