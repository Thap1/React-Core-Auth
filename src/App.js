import { RecoilRoot } from "recoil";
import "./App.css";
import BuildConfig from "./config";
import { AppRouter } from "./router";

BuildConfig.init(process.env.REACT_APP_ENV);

function App() {
  return (
    <div className='App'>
      <RecoilRoot>
        <AppRouter />
      </RecoilRoot>
    </div>
  );
}

export default App;
