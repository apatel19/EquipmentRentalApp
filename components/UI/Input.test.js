import React from 'react';
import Input from './Input';
import renderer from 'react-test-renderer';

describe('Custom input component', () => {
  it('Card snapshot match test', () => {
    const tree = renderer.create(<Input />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
