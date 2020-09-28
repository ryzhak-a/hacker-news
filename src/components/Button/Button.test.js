import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { Button } from './Button';

Enzyme.configure({ adapter: new Adapter() });

describe('Button', () => {
  const props = {
    onClick: () => {}
  };

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button {...props}>Give Me More</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Button {...props}>Give Me More</Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
