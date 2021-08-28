import "./App.css";
import BuildConfig from "./config";
import LoginPage from "./view/login";

BuildConfig.init(process.env.REACT_APP_ENV);

function App() {
  return (
    <div className='App'>
      <LoginPage />
    </div>
  );
}

export default App;
