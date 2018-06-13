// Core
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

// Instruments
import { galleryReducer } from './reducer';

const logger = createLogger({
    duration:  true,
    collapsed: true,
    colors:    {
        title:     () => '#139BFE',
        prevState: () => '#1C5FAF',
        action:    () => '#149945',
        nextState: () => '#A47104',
        error:     () => '#ff0005',
    },
});

export const store = createStore(galleryReducer, applyMiddleware(logger));
