import Habit from "./components/Habit";
import "./styles/globals.css";

function App() {
  return (
    <div>
      <Habit completions={3} maxCompletions={10} />
      <Habit completions={5} maxCompletions={10} />
      <Habit completions={7} maxCompletions={10} />
    </div>
  );
}

export default App;
