import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink, useHistory } from 'react-router-dom';
import Loading from '../components/Loading';
import { loginuserinfo } from '../redux/actions/userAction';
import './css/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const submit = async (e) => {
    try {
      if (username && password) {
        setLoading(true);
        const { data } = await axios.post(
          'http://localhost:4000/api/v1/login',
          { email: username, password },
          {
            withCredentials: true,
          }
        );
        if (data) {
          dispatch(loginuserinfo(data));
          toast.success('Logged in successfully');
          setLoading(false);
          navigate(-1);
        }
      } else {
        setLoading(false);
        toast.error('Please provide all the credentials');
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="log-container">
      <div className="login">
        <h1>Login To Join Our Community.</h1>
        <div className="username">
          <label>Username: </label>
          <input
            type="email"
            placeholder="username"
            required
            onChange={(e) => setUsername(e.target.value)}
          ></input>
        </div>
        <div className="password">
          <label>Password: </label>
          <input
            type="password"
            placeholder="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!loading ? (
          <div className="log-btn">
            <button onClick={(e) => submit(e)}>Login</button>
          </div>
        ) : (
          <div className="log-btn">
            <Loading />
          </div>
        )}
      </div>
      <div className="login-info-container">
        <h1>New Here?</h1>
        <p>
          We are an exclusive center for selling authentic and premium helmets
          all over Nepal.
        </p>
        <NavLink
          to="/register"
          exact
          className="decoration-none text-white navlink"
        >
          Register
        </NavLink>
      </div>
    </div>
  );
};

export default Login;
