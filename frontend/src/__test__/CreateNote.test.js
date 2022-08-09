import {getByTestId, fireEvent, render,screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import {BrowserRouter as Router} from 'react-router-dom'
// import userEvent from '@testing-library/user-event'
import CreateNote from "../components/CreateNote";
import DataProvider from "../redux/store";


test("title input should be rendered", () => {
    render(
        <DataProvider>
            <Router>
              <CreateNote/>
              </Router>
        </DataProvider>    
    );
    const titleInput = screen.getByPlaceholderText("Enter the Title Here");
    expect(titleInput).toBeInTheDocument();
  });


  test("add note button should be rendered", () => {
    render(
        <DataProvider>
            <Router>
              <CreateNote/>
              </Router>
        </DataProvider>    
    );
    const buttonEl = screen.getByRole('button', { name: 'Add Note' })
    expect(buttonEl).toBeInTheDocument();
  });
