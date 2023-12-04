import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import Taraininglist from './components/Traininglist.jsx';
import Customerlist from './components/Customerlist.jsx';
import TrainingCalendar from './components/TrainingCalendar.jsx';
import ActivityChart from './components/ActivityChart.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <Customerlist />,
        index: true
      },
      {
        path: "traininglist",
        element: <Taraininglist />
      },
      {
        path: "calendar",
        element: <TrainingCalendar />
      },
      {
        path: "chart",
        element: <ActivityChart/>
      },
    ]
  }

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
