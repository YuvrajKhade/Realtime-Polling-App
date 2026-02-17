import "./App.css";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import CreatePoll from "./pages/CreatePoll";
import ViewPoll from "./pages/ViewPoll";
import AppNavbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CreatePoll />} />
          <Route path="/poll/:pollId" element={<ViewPoll />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
