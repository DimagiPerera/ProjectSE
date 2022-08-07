import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import AddUser from './components/AddUser';
import Details from './components/DisplayUsers/UsersList';

function App() {
  return (
    <div>
            <Header />
      <Router>
        <section>
          {localStorage.getItem("token") ? (
            <Switch>
              
              <Route path="/home" component={Details} exact/>
              <Route path="/add" component={AddUser} />

              <Route path="/" component={SignIn} />

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
