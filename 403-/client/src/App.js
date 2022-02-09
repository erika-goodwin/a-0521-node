import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Credentials from './container/Credentials';
import ForgotPasswordContainer from './container/ForgotPasswordContainer';
import ResetPasswordContainer from './container/ResetPasswordContainer';
import PrivateRoute from './container/PrivateRoute';
import Welcome from './pages/Welcome'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PrivateRoute /> }>
          <Route path="" element={<Welcome />} />
        </Route>
        <Route path="/login" element={<Credentials />} />
        <Route path="/forgot" element={<ForgotPasswordContainer />} />
        <Route path="/passwordReset" element={<ResetPasswordContainer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
