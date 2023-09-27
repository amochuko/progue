import { setupStore, type AppStore, type RootState } from '../../config-store';

import { type PreloadedState } from '@reduxjs/toolkit';
import { render, RenderOptions } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';


// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'quries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

/**
 * @dev This is to replace deafult `render` 
 * from React testing library. It is set up 
 * to with a custom redux store for integration test
 * @param ui - React component to be test
 * @param param1 preloadedState - State to test with if needed
 * @param param2 store - Then main store from `redux` to test with if needed
 * @returns ReactElement wrapped with a `redux Provider`
 */
export function renderWithProviders(ui:React.ReactElement, {
    preloadedState={},
     // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
}: ExtendedRenderOptions={}){
    function Wrapper({children}:PropsWithChildren<{}>):JSX.Element{
        return <Provider store={store} >{children}</Provider>
    }

    // Return an object with the store and all of RTL's query functions
    return {store, ...render(ui, {wrapper: Wrapper, ...renderOptions})}
}