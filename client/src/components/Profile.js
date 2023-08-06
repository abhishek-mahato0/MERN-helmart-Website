import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaCamera } from 'react-icons/fa';
import './profile.css';
import { useState } from 'react';
import Loading from './Loading';
import toast from 'react-hot-toast';
import axios from 'axios';
import { loginuserinfo, logout } from '../redux/actions/userAction';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
function Profile({ setProfile }) {
  const { user } = useSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const Logout = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post('http://localhost:4000/api/v1/logout');
      if (data) {
        toast.success(data.message);
        setLoading(false);
        setProfile(false);
        localStorage.removeItem('userInfo');
        dispatch(logout({}));
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changeProfile = async (img) => {
    if (img) {
      try {
        setLoading(true);
        const form = new FormData();
        form.append('avatar', img);
        const { data } = await axios.put(
          'http://localhost:4000/api/v1/user/update/avatar',
          form,
          { withCredentials: true }
        );
        if (data) {
          toast.success('Profile updated successfilly');
          dispatch(loginuserinfo(data));
          setProfile(false);
          setImage('');
          setLoading(false);
        } else {
          setImage('');
        }
      } catch (error) {
        setLoading(false);
        setImage('');
        toast.error(error.response.data.message);
      }
    } else {
      toast.error('Please select an image');
    }
  };
  useEffect(() => {
    image && changeProfile(image);
  }, [image, changeProfile, dispatch]);
  return (
    <>
      {user._id ? (
        <div className={`user-profile-container ${loading ? 'blur' : ''}`}>
          <div className="flex-center profile-img">
            <img src={user?.avatar?.url} alt="profile"></img>
            <label htmlfor="image-upload" className="pr-icon">
              <FaCamera />
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                style={{ display: 'none' }}
              />
            </label>
          </div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
          <Link to="/myorders" className="orderlink">
            My Orders
          </Link>
          {loading && <div className="logout-btn-lod"></div>}

          <div className="logout-btn">
            <button onClick={(e) => Logout(e)}>Logout</button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}

export default Profile;
