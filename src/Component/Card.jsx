import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Card() {
    const [data, setData] = useState('');
    const [filterData, setFilterData] = useState([]);
    const [checkList, setCheckList] = useState([]);

    useEffect(() => {
        // Retrieve data from localStorage when component mounts
        const storedData = localStorage.getItem('data');
        if (storedData) {
            setFilterData(JSON.parse(storedData));
        }
    }, []);

    useEffect(() => {
        // Update localStorage whenever filterData changes
        localStorage.setItem('data', JSON.stringify(filterData));
    }, [filterData]);

    const search = (e) => {
        setData(e.target.value);
    };

    const click = () => {
        if (data.trim() === '') {
            toast.error('Please provide a value', { position: 'top-center' });
        } else {
            setFilterData([...filterData, data]);
            setData('');
            toast.success('Item added to the list', { position: 'top-center' });
        }
    };

    const deleteBtn = (elem, index) => {
        const newFilterData = filterData.filter((e, idx) => idx !== index);
        setFilterData(newFilterData);
        toast.success('Item deleted', { position: 'top-center' });
    };

    const toggleCheck = (index) => {
        const newCheckList = [...checkList];
        newCheckList[index] = !newCheckList[index];
        setCheckList(newCheckList);
    };

    return (
        <div className='box'>
            <h2>Grocery Bud</h2>
            <div className='input-MainBox'>
                <div className='input-box'>
                    <input type='text' onChange={search} value={data} />
                    <button className='additem' onClick={click}>Add item</button>
                    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
                </div>
                {filterData.map((elem, index) => (
                    <div className='text-box' key={index}>
                        <div className='check-box'>
                            <input type='checkbox' checked={checkList[index] || false} onChange={() => toggleCheck(index)} />
                            <p className='para' style={{ textDecoration: checkList[index] ? 'line-through' : 'none' }}>{elem}</p>
                        </div>
                        <button className='deleteBtn' onClick={() => deleteBtn(elem, index)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Card;
