import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Main from "./Components/Main"
import Home from './Pages/Home';
import Login from "./Pages/Login"
import SignUp from "./Pages/SignUp"
import ForgotPassword from "./Pages/ForgotPassword"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './Components/PrivateRoute';
import ChatState from './context/ChatState';
import Modal from './Components/Modal';

function App() {
  return (
    <>
      <ChatState>
        <Router>
          <Routes>
            <Route exact path='/' element={<Main />} />
            <Route exact path='/modal' element={<Modal />} />
            <Route exact path='/home' element={<PrivateRoute />}>
              <Route exact path='/home' element={<Home />} />
            </Route>
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/forgot-password' element={<ForgotPassword />} />
          </Routes>
        </Router>
      </ChatState>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
}

export default App;
