import './App.css';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './navigation/NavBar.js';
import UserContext from './context/UserContext.js';
import React, {useState, useEffect} from 'react';
import HappyHourApi from './api/backendApi.js';
import {jwtDecode} from "jwt-decode"
import MyRoutes from './navigation/MyRoutes.js';


function App() {
  const [currentUser, setCurrentUser] = useState(()=>{
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    try{
    return storedToken ? JSON.parse(storedToken) : null;
    }catch(error){
      console.error('Error parsing token:', error);
      return storedToken || null;
  }
  });

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(currentUser))
  }, [token, currentUser]);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        if (HappyHourApi.token && typeof token === 'string') {
          const decodedToken = jwtDecode(HappyHourApi.token);
          const username = decodedToken.username;
          const currentUser = await HappyHourApi.getCurrentUser(username);
  
          setCurrentUser(currentUser);
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
  
    fetchCurrentUser();
  }, [token, setCurrentUser]);
  

  const signup = async (userData) => {
    try {
      let newToken = await HappyHourApi.register(userData);
      setToken(newToken.token);
      localStorage.setItem('token', newToken.token);
      HappyHourApi.token = newToken.token;
      const decodedToken = jwtDecode(newToken.token);
      const loggedInUser = await HappyHourApi.getCurrentUser(decodedToken.username);
      setCurrentUser(loggedInUser);
    } catch(e) {
      console.error('Signup failed', e);
    }
  };

  const create = async (type, identifier = null, data) => {
    try {
      console.log('Creating', type, 'with data:', data);
      await HappyHourApi.create(type, identifier, data, token);
    } catch(e) {
      console.error(`${type} creation failed`, e.response || e);
      throw e;
    }
  };

  const update = async (type, identifier, data) => {
    try {
      await HappyHourApi.update(type, identifier, data, token);
    } catch(e) {
      console.error(`${type} update failed`, e);
      throw e;
    }
  };
  const remove = async (endpoint) => {
    try {
      await HappyHourApi.remove(endpoint, token);
      console.log(`${endpoint} deleted successfully`)
    } catch(e) {
      console.error(`${endpoint} delete failed`, e);
      throw e;
    }
  };

  const login = async (username, password) => {
    console.debug(`LOGIN METHOD`)
    try {
      const userToken = await HappyHourApi.authenticate(username, password);
      console.log(userToken.token)
      
      setToken(userToken.token);
      localStorage.setItem('token', userToken.token);
      HappyHourApi.token = userToken.token;

      const decodedToken = jwtDecode(userToken.token);
      if (decodedToken.username && decodedToken.isAdmin !== undefined) {
        setCurrentUser(decodedToken);
        return true;
      } else {
        console.error('Invalid user data received after login.');
        alert('Invalid credentials. Please try again.');
        return false;
      }
    } catch (e) {
      console.error('Login failed', e);
      alert('Invalid credentials. Please try again.');
      return false;
    }
  }


  const logout = ()=> {
    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem('token')
  }

  return (
    <div className="App">
      
      <BrowserRouter>
      <UserContext.Provider
      value={{currentUser, setCurrentUser}}>
      
      <NavBar logout={logout}>
      </NavBar>
      
      <MyRoutes 
      login={login} 
      signup={signup} 
      update={update}
      remove={remove}
      create={create}
      />
      </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;


