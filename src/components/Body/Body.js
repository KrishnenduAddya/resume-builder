import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '../Home/Home';
import Resume from '../Resume/Resume';

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: "/",
            element: <HomePage/>
        },
        {
            path: "/resume",
            element: <Resume/>
        },
    ]);

    return (
        <div>
            <RouterProvider router={appRouter}/>
        </div>
    )
}

export default Body;