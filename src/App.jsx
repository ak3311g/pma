import { Route,Routes } from "react-router-dom";
import Header from "./components/header";
import NotFound from "./pages/notfound";
import Home from "./pages/home";
import Register from "./pages/register";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
