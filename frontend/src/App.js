import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AddUser from './components/AddUser';

function App() {
  return (
    <div>
            <Header />
      <Router>
        <section>
          {localStorage.getItem("token") ? (
            <Switch>
              <Route path="/" component={SignIn} />
              <Route path="/home" component={SignUp} />
              <Route path="/add" component={AddUser} />

            </Switch>
          ) : (
              <Switch>
                <Route path="/" component={SignIn} />
              </Switch>
            )}
        </section>
      </Router>
      <Footer/>
    </div>
  );
}

export default App;
