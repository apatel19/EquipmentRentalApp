import React from 'react';
import AccountDetailContainer from './AccountDetailContainer';
import renderer from 'react-test-renderer';

test('Card snapshot match test', () => {
  const tree = renderer.create(<AccountDetailContainer />).toJSON();
  expect(tree).toMatchSnapshot();
});
