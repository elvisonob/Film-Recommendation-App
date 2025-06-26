import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import OptionsSelector from './components/OptionsSelector';
import Home from './components/Home';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/optionsselector', element: <OptionsSelector /> },
]);

const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
