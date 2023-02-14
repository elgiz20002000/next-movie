import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper';
import MenuReducer from './MenuSlice'
import MovieReducer from './MovieSlice'
import ModalReducer from './ModalSlice'
import SavedReducer from './SaveSlice'


export const store = () => configureStore({   
    reducer: {
        'menu':MenuReducer,
        'movie':MovieReducer,
        'modal':ModalReducer,
        'saved':SavedReducer
    },
})


export const wrapper = createWrapper(store);