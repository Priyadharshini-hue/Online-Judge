import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import ResetPassword from "./components/auth/ResetPassword";
import AddProblem from "./components/problems/AddProblem";
import ProblemList from "./components/problems/ProblemList";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./privateRoutes/PrivateRoutes";
import ProblemDetails from "./components/problems/ProblemDetails";
import DisableGoBackButton from "./components/auth/DisableGoBackButton";
import ProblemEdit from "./components/problems/ProblemEdit";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <DisableGoBackButton />
        <NavigationBar />
        <Routes>
          <Route path="/user/signIn" element={<SignIn />} />
          <Route path="/user/signUp" element={<SignUp />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route
            path="/problems/add"
            element={
              <PrivateRoute>
                <AddProblem />
              </PrivateRoute>
            }
          />
          <Route
            path="/problems/list"
            element={
              <PrivateRoute>
                <ProblemList />
              </PrivateRoute>
            }
          />
          <Route
            path="/problems/:problemId"
            element={
              <PrivateRoute>
                <ProblemDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/problems/edit/:problemId"
            element={
              <PrivateRoute>
                <ProblemEdit />
              </PrivateRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
