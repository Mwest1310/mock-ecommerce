import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useSignupMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const Login = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [signup, { isLoading }] = useSignupMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if(userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await signup({ username, password }).unwrap();
            dispatch(setCredentials({...res}));
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
  return (
    <form onSubmit={handleSubmit} className="form">
        <div className="form-container">
            <h3>Sign up</h3>
            <div className="form-div">
                <label for="email">Username:</label>
                <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-div">
                <label for="password">Password:</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-div">
                <input className="submit" type="submit" value="Sign up" />
                <p>Already have an account? <a href="/login">Log in</a></p>
            </div>
            
        </div>
        
        
    </form>
  );
};

export default Login;