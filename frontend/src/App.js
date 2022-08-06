import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from './components/Login';

function App() {
  return (
    <div>
      <Router>
        <section>
          {localStorage.getItem("token") ? (
            <Switch>
              <Route path="/" component={SignIn} />

            </Switch>
          ) : (
              <Switch>
                <Route path="/" component={SignIn} />
              </Switch>
            )}
        </section>
      </Router>
    </div>
  );
}

export default App;
