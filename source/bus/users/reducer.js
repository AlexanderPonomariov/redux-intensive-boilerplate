// Core
import { fromJS, List } from 'immutable';

// Instruments
import { types } from './types';

const initialState = List();

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FILL_USERS:
            return fromJS(action.payload);

        case types.CLEAR_USERS:
            return initialState.clear();

        default:
            return state;
    }
};