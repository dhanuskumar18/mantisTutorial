import PropTypes from 'prop-types';
import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import { jwtDecode } from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';

// project import
import Loader from 'components/Loader';
import axios from 'utils/axios';

const chance = new Chance();

// constant
const initialState = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  console.log("check");
  
  const decoded = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken, checked) => {
  if (serviceToken && checked) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else if (serviceToken) {
    sessionStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        const serviceToken2 = window.sessionStorage.getItem('serviceToken');
        if ((serviceToken && verifyToken(serviceToken)) || (serviceToken2 && verifyToken(serviceToken2))) {
          console.log('hello');
if(serviceToken)
{

  setSession(serviceToken,true);
}
else {
  setSession(serviceToken2,false);

}
          const config = {
            headers: {
              Authorization: `Bearer ${serviceToken || serviceToken2 }`
            }
          };
          const response = await axios.get('/api/students/me', config);
          console.log(response.data);
          const { user } = response.data;
          console.log(user);
          
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  const login = async (email, otp, checked) => {
    const response = await axios.post('/api/auth/verify-otp', { email, otp });
    const { serviceToken, user } = response.data;
    setSession(serviceToken, checked);
    dispatch({
      type: LOGIN,
      payload: {
        isLoggedIn: true,
        user
      }
    });
  };

  const sendOtp = async (email) => {
    const response = await axios.post('api/auth/send-otp', { email });
    console.log(response);
  };

  const register = async (values) => {
    // todo: this flow need to be recode as it not verified
    console.log('verify');

    const response = await axios.post('/api/students/register', values, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    let users = response.data;
    console.log(users);

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      console.log(localUsers);

      users = [
        ...[JSON.parse(localUsers)],
        {
          values
        }
      ];
    }
    console.log(users);

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async (email) => {
    console.log('email - ', email);
  };

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return (
    <JWTContext.Provider value={{ ...state, sendOtp, login, logout, register, resetPassword, updateProfile,dispatch }}>
      {children}
    </JWTContext.Provider>
  );
};

JWTProvider.propTypes = {
  children: PropTypes.node
};

export default JWTContext;
