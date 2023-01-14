import React, { Suspense } from 'react';
import { Provider } from 'react-redux';
import axios from 'axios';
import { screen, configure, fireEvent, render, waitFor, findByTestId, act } from '@testing-library/react'
import configureStore from 'redux-mock-store';
import { getDesignTokens, lightPalette } from '../../../styling/theme';
import { createTheme, ThemeProvider } from '@mui/material';
import { Loader } from '../../../loader';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../i18n';
import "@testing-library/jest-dom";
import AddEvent from './AddEvent';
import moment from 'moment';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';


const mockStore = configureStore([]);

describe('AddEvent successfully adds events', () => {
  let store;
  const theme = createTheme(getDesignTokens("light"));

  beforeEach(() => {
    store = mockStore({
      auth: {
        user: {
            token: 'some-user-token'
        }
      }
    });

    store.dispatch = jest.fn();
    jest.spyOn(axios, 'post').mockResolvedValueOnce({data: ''});

    render(
        <Suspense fallback={<Loader/>}>
            <I18nextProvider i18n={i18n}> 
                <ThemeProvider theme={theme}>
                    <Provider store={store}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <AddEvent classId="1234" groupId="1234" />
                    </LocalizationProvider>
                    </Provider>
                </ThemeProvider>
            </I18nextProvider>
        </Suspense>
    );
  });

  it('Renders lazy component', async () => {
    await waitFor(() => expect(screen.getByText(/submit/i)).toBeInTheDocument())
  });

  it('Dispatches action on successful API call', async () => {
    act(() => {
        fireEvent.change(screen.getByPlaceholderText(/name/i), {target: {value: 'sampleevent'}})
        fireEvent.change(screen.getByPlaceholderText(/description/i), {target: {value: 'somedescription'}})
        fireEvent.click(screen.getByText(/submit/i))
    })
    await waitFor(() => expect(store.dispatch).toHaveBeenCalledTimes(1))
  });

});