import logo from "./logo.svg";
import "./App.css";
import { Inbox } from "./components/inbox/inbox";
import { Bar } from "./components/topBar/bar";

function App() {
  return (
    <div className="App">
      <div className="background">
        <div>
          <Bar />
          <Inbox />
        </div>
      </div>
    </div>
  );
}

export default App;
