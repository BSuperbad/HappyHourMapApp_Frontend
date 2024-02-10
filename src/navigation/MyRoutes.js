import { Routes, Route } from 'react-router-dom';
import LoginForm from '../forms/LoginForm.js';
import SpacesListWithSearch from '../spaces/SpacesListWithSearch.js';
import SpaceDetail from '../spaces/SpaceDetail.js';
import UsersList from '../users/UsersList.js';
import UserDetail from '../users/UserDetail.js';
import UserCommentsList from '../comments/UserCommentsList.js';
import SpaceCommentsList from '../comments/SpaceCommentsList.js';
import Home from '../homepage/Home.js';
import CategoriesList from '../categories/CategoriesList.js';
import CategorySpaces from '../categories/CategorySpaces.js';
import SignupForm from '../forms/SignUpForm.js';
import AdminRoute from '../navigation/AdminRoute.js';
import SpaceForm from '../forms/SpaceForm.js'
import LocationsList from '../locations/LocationsList.js';
import LocationDetailWithSpaces from '../locations/LocationDetailWithSpaces.js';
import CategoryEdit from '../categories/CategoryEdit.js';
import CategoryForm from '../forms/CategoryForm.js';
import SpaceEdit from '../spaces/SpaceEdit.js';
import UserEdit from '../users/UserEdit.js';
import LocationForm from '../forms/LocationForm.js';
import LocationEdit from '../locations/LocationEdit.js';
import CommentForm from '../forms/CommentForm.js';
import CommentEdit from '../comments/CommentEdit.js'
import RatingForm from '../forms/RatingForm.js';
import RatingAvg from '../ratings/RatingsAvg.js';
import RatingEdit from '../ratings/RatingEdit.js';
import UserSpacesList from '../users/UserSpacesList.js';
import Map from '../map/Map.js'

const MyRoutes = ({login, signup, remove, update, create})=>{

    return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<LoginForm login={login} />} />
      <Route path="/signup" element={<SignupForm signup={signup}/>}/>
      <Route path="/spaces" element={<SpacesListWithSearch remove={remove}/>} />
      <Route path="/spaces/:title" element={<SpaceDetail remove={remove}/> } />
      <Route path="/users/:username" element={<UserDetail/> } />
      <Route path="/comments/users/:username" element={<UserCommentsList/>} />
      <Route path="/users/:username/spaces" element={<UserSpacesList remove={remove} />}/>
      <Route path="/comments/spaces/:title" element={<SpaceCommentsList/>} />
      <Route path="/categories" element={<CategoriesList/>} />
      <Route path ="/categories/:cat_type" element={<CategorySpaces />}/>
      <Route path ="/users/:username/edit" element={<UserEdit update={update} remove={remove} />}/>
      <Route path="/locations" element={<LocationsList/>} />
      <Route path="/comments/:username/spaces/:title/new" element={<CommentForm/>} />
      <Route path="/comments/:comment_id/edit" element={<CommentEdit update={update} remove={remove}/>} />
      <Route path="/ratings/:username/spaces/:title/new" element={<RatingForm/>} />
      <Route path="/comments/:comment_id/edit" element={<CommentEdit update={update} remove={remove}/>} />
      <Route path="/ratings/spaces/:title" element={<RatingAvg/>} />
      <Route path="/ratings/:rating_id/edit" element={<RatingEdit update={update} remove={remove}/>}/>
      <Route path="/map/:title" element={<Map />} />

      
      <Route path="/locations/spaces/:city/:neighborhood" element={<LocationDetailWithSpaces/>}/>
      <Route path ="/categories/:cat_type/edit" element={<AdminRoute element={<CategoryEdit update={update} remove={remove}/>}/>}/>
      <Route path ="/categories/new" element={<AdminRoute element={<CategoryForm create={create}/>}/>}/>
      <Route path="/users" element={<AdminRoute element={<UsersList />}/>}/>
      <Route path="/spaces/:title/edit" element={<AdminRoute element={<SpaceEdit update={update} remove={remove}/>}/>}/>
      <Route path="/spaces/new" element={<AdminRoute element={<SpaceForm create={create}/>}/>}/>
      <Route path="/locations/new" element={<AdminRoute element={<LocationForm create={create}/>}/>}/>
      <Route path="/locations/:city/:neighborhood/edit" element={<AdminRoute element={<LocationEdit update={update} remove={remove}/>}/>}/>

      </Routes>
    );

};

export default MyRoutes;

