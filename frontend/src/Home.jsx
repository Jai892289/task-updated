import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllData } from './redux/action';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const items = useSelector(state => state.itemData.items);

    useEffect(() => {
        dispatch(getAllData());
    }, []);

    const handleBox = (id) => {
        navigate(`/detail/${id}`);
    }
      console.log("items", items)
    return (
        <div>

            {Array.isArray(items) && (
                <div className="items-container">
                    <button onClick={() => navigate("/new")} >New + </button>
                    <h2>Notes </h2>
                    {items.map((data) => (
                        <div key={data.id} className="item-box" onClick={()=> handleBox(data._id)} >
                            <h1>{data.title}</h1>
                            <p>{data.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;

