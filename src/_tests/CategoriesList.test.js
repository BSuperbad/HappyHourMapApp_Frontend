import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from "axios";
import CategoriesList from '../categories/CategoriesList';
import { UserContext } from '../context/UserContext';
import { MemoryRouter } from 'react-router-dom';
import {categories} from './_testCommon';

jest.mock('axios');

const adminUser = {
  isAdmin: true
};

const testUser = {
  isAdmin: false
}

// test('it renders without crashing', async ()=>{
//   axios.get.mockResolvedValue({data: categories});
//   const { container } = render(<CategoriesList/>);
//   const heading = await waitFor(()=> screen.findByText("List of Categories of Spaces"))
//   const nav = container.querySelector("nav")
//   expect(nav).toBeInTheDocument()

//   expect(heading).toBeInTheDocument();
//   expect(axios.get).toHaveBeenCalled()
// })

test("matches category snapshot", ()=>{
  axios.get.mockResolvedValue({data: categories});
  const {container} = render (
    <MemoryRouter initialEntries={categories}>
      <CategoriesList/>
    </MemoryRouter>
  );
  expect(container).toMatchSnapshot();
});

  test('renders category list', async () => {
    render(
      <UserContext.Provider value={{ testUser }}>
        <MemoryRouter>
        <CategoriesList />
        </MemoryRouter>
      </UserContext.Provider>
     
    );
    expect(screen.getByText('List of Categories of Spaces')).toBeInTheDocument();
    expect(screen.getByText('Test Restaurant')).toBeInTheDocument();
    expect(screen.getByText('Test Cafe')).toBeInTheDocument();
  });

  // test('renders "Add New Category" button for admin users', async () => {
  //   render(
  //     <UserContext.Provider value={{ currentUser }}>
  //       <CategoriesList />
  //     </UserContext.Provider>
  //   );
  //   expect(screen.getByText('Add New Category')).toBeInTheDocument();
  // });

  // test('does not render "Add New Category" button for non-admin users', async () => {
  //   const nonAdminUser = {
  //     isAdmin: false,
  //   };

  //   render(
  //     <UserContext.Provider value={{ currentUser: nonAdminUser }}>
  //       <CategoriesList />
  //     </UserContext.Provider>
  //   );

  //   await screen.findByText('List of Categories of Spaces');

  //   expect(screen.queryByText('Add New Category')).not.toBeInTheDocument();
