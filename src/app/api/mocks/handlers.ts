import { getHabitsMock } from './get-habits-mock';
import { getDatesTheHabitWasCompletedMock } from './get-dates-the-habit-was-completed';
import { addHabitMock } from './add-habit-mock';
import { toggleHabitMock } from './toggle-habit-mock';
import { removeHabitMock } from './remove-habit-mock';
import { updateHabitMock } from './update-habit-mock';

export const handlers = [
  getHabitsMock,
  getDatesTheHabitWasCompletedMock,
  addHabitMock,
  toggleHabitMock,
  removeHabitMock,
  updateHabitMock,
];
