import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AccessibleTaskList from './AccessibleTaskList';

test('renders initial tasks and toggles completion', () => {
  render(<AccessibleTaskList />);
  const firstTask = screen.getByText('Write documentation');
  expect(firstTask).toBeInTheDocument();

  const checkbox = screen.getAllByRole('checkbox')[0];
  expect(checkbox.checked).toBe(false);

  fireEvent.click(checkbox);
  expect(checkbox.checked).toBe(true);
  expect(firstTask).toHaveClass('completed');
});

test('adds a new task', () => {
  render(<AccessibleTaskList />);
  const input = screen.getByLabelText('New task');
  const addButton = screen.getByText('Add Task');

  fireEvent.change(input, { target: { value: 'New test task' } });
  fireEvent.click(addButton);

  expect(screen.getByText('New test task')).toBeInTheDocument();
});
