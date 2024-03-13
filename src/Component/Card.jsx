import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Card() {
    const [data, setData] = useState(''); //changes in the search data.
    const [localStoragedData, setLocalStorage] = useState([]);//changes in the list data to filter localStorage.
    const [checkList, setCheckList] = useState([]);//changes in the checklist data.

    // Retrieve previos data from localStorage when component loads in UI.
    useEffect(() => {
        const storedData = localStorage.getItem('data');
        if (storedData) {
            setLocalStorage(JSON.parse(storedData));
        }
    }, []);


    // Update localStorage whenever we delete something from the list.
    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(localStoragedData));
    }, [localStoragedData]);


    //get the data from the search bar.
    const search = (e) => {
        setData(e.target.value);
    };

    const addItemToList = () => {
        if (data.trim() === '') {
            toast.error('Please provide a value', { position: 'top-center' });
        } else {
            setLocalStorage([...localStoragedData, data]);
            setData('');
            toast.success('Item added to the list', { position: 'top-center' });
        }
    };

    const deleteItem = (elem, index) => {
        const newFilterData = localStoragedData.filter((e, idx) => idx !== index);
        setLocalStorage(newFilterData);
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
                    <button className='additem' onClick={addItemToList}>Add item</button>
                    <ToastContainer position="top-center" autoClose={5000} hideProgressBar={false} />
                </div>
                {localStoragedData.map((elem, index) => (
                    <div className='text-box' key={index}>
                        <div className='check-box'>
                            <input type='checkbox' checked={checkList[index] || false} onChange={() => toggleCheck(index)} />
                            <p className='para' style={{ textDecoration: checkList[index] ? 'line-through' : 'none' }}>{elem}</p>
                        </div>
                        <button className='deleteItem' onClick={() => deleteItem(elem, index)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Card;
