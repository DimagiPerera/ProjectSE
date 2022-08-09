import {getByTestId, fireEvent, render,screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import CreateUser from "../components/CreateUser";
import DataProvider from "../redux/store";


test("firstname input should be rendered", () => {
    render(
        <DataProvider>
            <Router>
              <CreateUser/>
              </Router>
        </DataProvider>    
    );
    const titleInput = screen.getByPlaceholderText("Enter Firstname");
    expect(titleInput).toBeInTheDocument();
  });

  test("lastname input should be rendered", () => {
    render(
        <DataProvider>
            <Router>
              <CreateUser/>
              </Router>
        </DataProvider>    
    );
    const titleInput = screen.getByPlaceholderText("Enter Lastname");
    expect(titleInput).toBeInTheDocument();
  });

  test("email input should be rendered", () => {
    render(
        <DataProvider>
            <Router>
              <CreateUser/>
              </Router>
        </DataProvider>    
    );
    const titleInput = screen.getByPlaceholderText("Enter Email");
    expect(titleInput).toBeInTheDocument();
  });

  test("email input field should validate email", ()=>{
    render(
        <DataProvider>
            <Router>
              <CreateUser/>
              </Router>
        </DataProvider>    
    );
    const email = screen.getByPlaceholderText("Enter Email");
    userEvent.type(email,"dimagi");
    expect(email.value).not.toMatch("dimagi@gmail.com");
});

  test("create user button should be rendered", () => {
    render(
        <DataProvider>
            <Router>
              <CreateUser/>
              </Router>
        </DataProvider>    
    );
    const buttonEl = screen.getByRole('button', { name: 'CREATE' })
    expect(buttonEl).toBeInTheDocument();
  });



 