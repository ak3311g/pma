import { Route,Routes } from "react-router-dom";
import Header from "./components/header";
import NotFound from "./pages/notfound";
import Home from "./pages/home";
import Register from "./pages/register";
import Project from "./pages/project";
import Profile from "./pages/profile";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="projects" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/project/:id" element={<Project />} />
        <Route path="/:username" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
