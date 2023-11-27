
import './App.css'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,RouterProvider
} from "react-router-dom";
import Registration from './pages/Registration'
import Login from './pages/Login';
import Home from './pages/Home';
import RootLayout from './components/RootLayout';
import Massage from './pages/Massage';

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
   <Route>
          <Route
            path="/"
            element={<Registration />}
          >
          </Route>
          <Route
          path="/login"
           element={<Login />}
          >
          </Route>
        
          <Route
          path="/page"
           element={<RootLayout />}
          >
              <Route
          path="home"
           element={<Home />}
          >
          </Route>
          <Route
          path="Massage"
           element={<Massage/>}
          >
          </Route>
          <Route
          path="notification"
           element={<Massage/>}
          >
          </Route>
          <Route
          path="setting"
           element={<Massage/>}
          >
          </Route>

          </Route>
          
   </Route>
    )
  );
 
  

  return (
    <>
  <RouterProvider router={router} />
    </>
  )
}

export default App
