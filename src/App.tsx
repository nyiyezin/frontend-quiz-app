import { Provider } from "react-redux";
import { AnimatePresence } from "framer-motion";
import { store } from "./redux/store";
import { ThemeProvider } from "./components/ThemeProvider";
import { Layout } from "./components/Layout";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="theme">
        <AnimatePresence mode="wait">
          <Layout />
        </AnimatePresence>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
