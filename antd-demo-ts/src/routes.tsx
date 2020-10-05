import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Book from './Pages/Book';
import BookList from './Pages/BookList';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={BookList} />
            <Route path="/book/:id" component={Book} />
        </BrowserRouter>
    );
}

export default Routes;