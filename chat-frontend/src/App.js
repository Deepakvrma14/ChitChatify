// routes
import Router from "./routes";
// theme
import {ThemeProvider} from './context/ThemeProvider';
// components


function App() {
  return (
    <ThemeProvider>
        {" "}
        <Router />{" "}
    </ThemeProvider>
  );
}

export default App;
