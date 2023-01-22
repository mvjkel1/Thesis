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
import { Loader } from '../../../styling/loader';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import '@testing-library/jest-dom';
import { EditGroupData } from './EditGroupData';
import { useNavigate } from 'react-router-dom';

const mockStore = configureStore([]);

describe('AddGroup successfully adds class', () => {
  let store;
  const theme = createTheme(getDesignTokens('light'));

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {
          token: 'some-user-token'
        }
      },
      workgroups: {
        data: [
          {
            _id: '',
            name: 'Teleinformatyka-2022',
            founder: {
              _id: '63b9c0fda5599b4657ead210',
              name: 'test',
              email: 'test@test.test',
              role: 'group-representative'
            },
            __v: 1
          }
        ]
      }
    });

    store.dispatch = jest.fn();
    const mockedNavigator = jest.fn((arg) => {
      id: '1234';
    });
    jest.spyOn(axios, 'patch').mockResolvedValueOnce({ data: {} });
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useNavigate: () => mockedNavigator
    }));

    render(
      <Suspense fallback={<Loader />}>
        <I18nextProvider i18n={i18n}>
          <ThemeProvider theme={theme}>
            <Provider store={store}>
              <EditGroupData />
            </Provider>
          </ThemeProvider>
        </I18nextProvider>
      </Suspense>
    );
  });

  it('Renders lazy component', async () => {
    await waitFor(() => expect(screen.getByRole('button')).toBeInTheDocument());
  });

  it('Refuses if no input is given', async () => {
    act(() => {
      fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: '' } });
      fireEvent.click(screen.getByRole('button'));
    });
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(0));
  });

  it('Dispatches action', async () => {
    act(() => {
      fireEvent.change(screen.getByPlaceholderText(/name/i), { target: { value: 'sampleclass' } });
      fireEvent.click(screen.getByText(/submit/i, { selector: 'button' }));
    });
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(1));
  });
});
