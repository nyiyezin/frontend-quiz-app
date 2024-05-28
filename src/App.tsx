import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <h1 className="text">Hello World!</h1>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
