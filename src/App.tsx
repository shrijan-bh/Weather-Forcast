import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "../src/styles/style.css";
// import FullDetail from "./pages/FullDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
