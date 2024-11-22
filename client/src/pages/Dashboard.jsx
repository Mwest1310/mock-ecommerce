import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateProductForm from '../components/CreateProductForm';

const tabs = [
    { id: 'create', label: 'Create Product' },
    { id: 'products', label: 'Products' }
]

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('create');
    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        if(userInfo.role !== 'admin') {
            navigate('/');
        };
    }, [navigate, userInfo])
  return (
    <div id="dashboard">
        <div className="tabs">
            {tabs.map((tab) => (
                <button key={tab.key} onClick={() => setActiveTab(tab.id)} />
            ))}
        </div>
        {activeTab === 'create' && <CreateProductForm />}
    </div>
  );
};

export default Dashboard;