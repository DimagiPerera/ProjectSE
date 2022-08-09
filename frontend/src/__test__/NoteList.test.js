import {getByTestId, fireEvent, render,screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import {BrowserRouter as Router} from 'react-router-dom'
// import userEvent from '@testing-library/user-event'
import NoteList from "../components/NoteList";
import DataProvider from "../redux/store";


test("table should be rendered", () => {
    render(
        <DataProvider>
            <Router>
              <NoteList/>
              </Router>
        </DataProvider>    
    );
    const tableEl = screen.getByRole('table', { name: '' })
  expect(tableEl).toBeInTheDocument();
  });
