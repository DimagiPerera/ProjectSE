import {getByTestId, render,screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import Login from "../components/Login";
import DataProvider from "../redux/store";


describe("Test the Login Component",()=>{
    test("render the login form with 1 button",async()=>{
        render(
            <DataProvider>
                <Router>
                  <Login/>
                  </Router>
            </DataProvider>    
        );
        const buttonList = await screen.findAllByRole("button");
        expect(buttonList).toHaveLength(1);
    });
});

test("email input field should accept email", ()=>{
    render(
        <DataProvider>
            <Router>
              <Login/>
              </Router>
        </DataProvider>    
    );
    const email = screen.getByPlaceholderText("Enter Email");
    userEvent.type(email,"dimagi");
    expect(email.value).not.toMatch("dimagi@gmail.com");
});

test("password input field should have type password", ()=>{
    render(
        <DataProvider>
            <Router>
              <Login/>
              </Router>
        </DataProvider>    
    );
    const password = screen.getByPlaceholderText("Enter Password");
    expect(password).toHaveAttribute("type","password");
});
