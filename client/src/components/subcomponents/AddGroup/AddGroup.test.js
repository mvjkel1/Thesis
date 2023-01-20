import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import {
  screen,
  configure,
  fireEvent,
  render,
  waitFor,
  findByTestId,
  act
} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { getDesignTokens, lightPalette } from '../../../styling/theme';
import { createTheme, ThemeProvider } from '@mui/material';
import { Loader } from '../../../loader';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import '@testing-library/jest-dom';
import AddGroup from './AddGroup';

const mockStore = configureStore([]);

describe('AddGroup successfully adds group', () => {
  let store;
  const theme = createTheme(getDesignTokens('light'));

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {
          token: 'some-user-token'
        }
      }
    });

    store.dispatch = jest.fn();
    jest
      .spyOn(axios, 'post')
      .mockResolvedValueOnce({ data: { data: { group: { invitationToken: 'invtoken' } } } });

    render(
      <Suspense fallback={<Loader />}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <AddGroup />
            </Provider>
          </ThemeProvider>
        </I18nextProvider>
      </Suspense>
    );
  });

  it('Renders lazy component', async () => {
    await waitFor(() => expect(screen.getByRole('button')).toBeInTheDocument());
  });

  it('Refusesif no input is given', async () => {
    act(() => {
      fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: '' } });
      fireEvent.click(screen.getByRole('button'));
    });
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(0));
  });

  it('Dispatches  action on successful API call and displays result', async () => {
    act(() => {
      fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'sampleclass' } });
      fireEvent.click(screen.getByText(/submit/i, { selector: 'button' }));
    });
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(1));
    await waitFor(() => screen.getByDisplayValue(/invtoken/i));
  });
});
