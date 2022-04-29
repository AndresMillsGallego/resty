import { act } from "react-dom/test-utils";
import { initialState, reducer } from "../app";
import '@testing-library/jest-dom'

describe('Testing our brand new shiny reducer!', () => {
  let state = null;

  test('Reducer should update the history', () => {
    act(() => {
      state = reducer(initialState, {});
    })
    expect(state.url).toBeFalsy();
    act(() => {
      state = reducer(state, {type: 'Add', payload: 'test'})
    })
    expect(state.history.includes('test')).toBeTruthy();
  })
})