import "./assets/styles/App.scss";
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {store} from "./store/store";
import {Provider} from "react-redux";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppRouter/>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
