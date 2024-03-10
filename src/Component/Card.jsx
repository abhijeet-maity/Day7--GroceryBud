import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Card() {
    let [data,setData]=useState('');
    let [filterData,setFilterData]=useState([])
 useEffect(()=>{
      let item=JSON.parse(localStorage.getItem('data'));
      if(item){
        setData(item)
      }
    },[])
   
    const search = (e) => {
        setData(e.target.value);
      };

    
    const click = () => {
      if(data===''){
        toast.error('Please Provide Value', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
          });

      }else{
        setFilterData([...filterData, data]);
        setData('')
        toast.success('Item Added To The List', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
          });
      }
      
        
       
    };

    const deleteBtn = (elem,index) => {
        let a=filterData.filter((e,idx)=>{
           return idx!=index;
        })
        setFilterData(a)
        toast.success('Item Deleted', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
          });
        
        
    };
   

    useEffect(()=>{
      localStorage.setItem('data', JSON.stringify(filterData))
    },[filterData])
 

   const [checkList, setCheckList] = useState(Array(filterData.length).fill(false));

   const fun = (index) => {
       const newCheckList = [...checkList];
       newCheckList[index] = !newCheckList[index];
       setCheckList(newCheckList);
   }
   

   return (
    <div className='box'>
   
    
    <h2>Grocery Bud</h2>
    <div className='input-MainBox'>
        <div className='input-box'>
        <input type='text' onChange={search} value={data}/>
        <button className='additem' onClick={click}>Add item</button>
        <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"/>
        </div>
        {
            filterData.map((elem,index)=>(
            <div className='text-box'>
                <div className='check-box'>
                <input type='checkbox' checked={checkList[index]} onChange={() => fun(index)} />
                 <p className='para' style={{ textDecoration: checkList[index] ? 'line-through' : 'none' }}>{elem}</p>

                </div>
                   <button className='deleteBtn' onClick={()=>deleteBtn(elem,index)}>delete</button> 
                  
            </div>
            ))
        }
      
    </div>
      
    </div>
  )
}

export default Card
