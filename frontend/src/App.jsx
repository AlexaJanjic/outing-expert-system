import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login/LoginPage.jsx";
import RegisterPage from "./pages/register/RegisterPage.jsx";
import HomePage from "./pages/HomePage";

function App() {
  return (
      <BrowserRouter>
        <Routes>

          <Route
              path="/"
              element={<LoginPage />}
          />

          <Route
            path="/login"
            element={<LoginPage />}
          />

          <Route
              path="/register"
              element={<RegisterPage />}
          />

          <Route
              path="/home"
              element={<HomePage />}
          />

          <Route
                path="/venues/:id"
                // element={<VenueDetailsPage />}
          />

        </Routes>
      </BrowserRouter>
  );
}

export default App;