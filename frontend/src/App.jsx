import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/login/LoginPage.jsx";
import RegisterPage from "./pages/register/RegisterPage.jsx";
import HomePage from "./pages/HomePage";
import SearchAssistantPage from "./pages/search/SearchAssistantPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import VenueDetailsPage from "./pages/venue/VenueDetailsPage.jsx";

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
              element={<ProtectedRoute> <HomePage /> </ProtectedRoute>}
          />

          <Route
                path="/venues/:id"
                element={<ProtectedRoute><VenueDetailsPage /> </ProtectedRoute>}
          />
          <Route
              path="search"
              element={<ProtectedRoute> <SearchAssistantPage/> </ProtectedRoute>}
          />

        </Routes>
      </BrowserRouter>
  );
}

export default App;