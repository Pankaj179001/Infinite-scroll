import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Main/Home";
import Header from "./Pages/Header/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Home />} />
        <Route path="/users" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
