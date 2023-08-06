import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import Loading from '../components/Loading';
import { loginuserinfo } from '../redux/actions/userAction';
import './css/login.css';

const Register = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const navigate = useNavigate();

  const submit = async () => {
    try {
      function isValidEmail(username) {
        return /\S+@\S+\.\S+/.test(username);
      }
      if (!isValidEmail(username)) {
        setLoading(false);
        toast.error('Invalid email address');
      } else if (password.length < 8) {
        setLoading(false);
        toast.error('Password should be greater than 8 characters');
      } else if (!username || !password || !name || !avatar) {
        setLoading(false);
        toast.error('Please provide all the credentials');
      } else {
        setLoading(true);
        const form = new FormData();
        form.append('name', name);
        form.append('email', username);
        form.append('password', password);
        form.append('avatar', avatar);
        const { data } = await axios.post(
          'https://mern-helmart-website.vercel.app/api/v1/register',
          form,
          {
            withCredentials: true,
          }
        );
        if (data) {
          dispatch(loginuserinfo(data));
          toast.success('Registration successfull');
          setLoading(false);
          navigate('/');
        } else {
          setLoading(false);
          toast.error('Error occured please try again.');
        }
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="log-container">
      <div className="login">
        <h1>Join Our Community.</h1>
        <div className="username">
          <label>Full Name: </label>
          <input
            type="name"
            placeholder="name"
            required
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
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
        <div className="password">
          <label>Profile: </label>
          <input
            type="file"
            required
            onChange={(e) => setAvatar(e.target.files[0])}
          />
        </div>
        {!loading ? (
          <div className="log-btn">
            <button onClick={() => submit()}>Register</button>
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
          to="/login"
          exact
          className="decoration-none text-white navlink"
        >
          Login
        </NavLink>
      </div>
    </div>
  );
};

export default Register;
