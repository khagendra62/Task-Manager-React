import ToDoList from "./components/ToDoList";
import { useLightMode } from "./hooks/useLightMode";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import "./App.css";
import logo from "../public/task-manager.png";

const App = () => {
  const [theme, toggleTheme] = useLightMode();
  return (
    <div className="container">
      <div className="theme-icon">
        <button onClick={toggleTheme}>
          {theme === "dark" ? (
            <MdLightMode className="light-icon" />
          ) : (
            <MdDarkMode className="dark-icon" />
          )}
        </button>
      </div>
      {/* <img src={logo} alt="logo" className="task-manager-logo logo" /> */}
      <h1 className="logo">Task Manager</h1>
      <ToDoList />
    </div>
  );
};

export default App;
