import React from 'react';
import AccountList from './AccountList';
import {shallow} from 'enzyme';

import renderer from 'react-test-renderer';

test('Card snapshot match test', () => {
  const tree = renderer.create(<AccountList />).toJSON();
  expect(tree).toMatchSnapshot();
});
