import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { StrictMode } from 'react';

import App from './App.jsx'
import Hello from './pages/Hello';
import Ask from './pages/Ask';
import Error from "./pages/Error"
import './index.css'


const router = createBrowserRouter([
	{
		path: '*',
		element: <App />,
		errorElement: <Error />,
		children: [
			{
				index: true,
				element: <Hello />,
			},
			{
				path: 'ask',
				element: <Ask />,
			},
		],
	},
]);

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);