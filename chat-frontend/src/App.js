// routes
import Router from "./routes";
// theme
import ThemeProvider from './theme';
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
