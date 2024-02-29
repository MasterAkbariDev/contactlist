import { Route, Routes } from "react-router";
import Home from "./containers/Home";
import Contact from "./containers/Contact";
import UserContextProvider from "./context/UserContext";
import NotFound from "./containers/NotFound";
import ErrorHandler from "./components/Error/ErrorHandler";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/Contact/:id" Component={Contact} />
        <Route path="*" Component={NotFound} />
      </Routes>
    </UserContextProvider>
  );
}

export default ErrorHandler(App);
