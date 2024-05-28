
import {configureStore} from '@reduxjs/toolkit';
import ArticleReducer from './ArticleSlice';

const store = configureStore({
    reducer: {
        articles: ArticleReducer
    }
});

export default store;
