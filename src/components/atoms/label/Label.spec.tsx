import {render, screen} from '@testing-library/react';
import Label from './Label';

describe('snapshot', () => {
  it('Matches the snapshot', () => {
    expect(render(<Label title="test" idFor="test" />)).toMatchSnapshot();
  });
});



it('Renders Label', () => {
  render(<>
    <Label title="test" idFor="test" />
    <input type="text" id="test" /> {/* test will not throw because of this input */}
  </>);
  expect(screen.getByTestId('label')).toBeInTheDocument();
});

it('Has accessible title', () => {
  render(<>
    <Label title="test" idFor="test" />
    <input type="text" id="test" /> {/* test will not throw because of this input */}
  </>);
  screen.getByLabelText('test');
});

it('Indicates required fields', () => {
  render(<>
    <Label title="test" idFor="test" required={true} />
    <input type="text" id="test" /> {/* test will not throw because of this input */}
  </>);
  screen.getByLabelText('*', {exact: false});
});

it('Appends custom classes', () => {
  const classes = ['test1', 'test2'];
  render(<Label classes={classes} idFor="test" title={"test"} />);
  const label = screen.getByTestId("label");
  expect(label.className).toContain(classes[0]);
  expect(label.className).toContain(classes[1]);
});


