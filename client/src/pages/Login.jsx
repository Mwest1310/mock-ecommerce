import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const Login = () => {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading }] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if(userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const res = await login({ username, password }).unwrap();
            dispatch(setCredentials({...res}));
            navigate('/');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        };
    };
  return (
    <form onSubmit={handleSubmit} className="form">
        <div className="form-container">
            <h3>Log in</h3>
            <div className="form-div">
                <label for="email">Username:</label>
                <input type="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-div">
                <label for="password">Password:</label>
                <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-div">
                <input className="submit" type="submit" value="Log in" />
                <p>Don't have an account? <a href="/signup">Sign up</a></p>
            </div>
        </div>
        
        
    </form>
  );
};

export default Login;