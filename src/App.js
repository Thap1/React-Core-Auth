import "./App.css";
import BuildConfig from "./config";
import { AppRouter } from "./router";

BuildConfig.init(process.env.REACT_APP_ENV);

function App() {
  return (
    <div className='App'>
      <AppRouter />
    </div>
  );
}

export default App;
