import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { Country, State}  from 'country-state-city';

const Data=()=>{

    const [details,setDetails]=useState([])
    const navigate=useNavigate()
    
    useEffect(()=>{
        const data=JSON.parse(localStorage.getItem('formData'))
        setDetails(data)
    },[])

    const handleDelete=(id)=>{
        const data=JSON.parse(localStorage.getItem('formData'))
        data.splice(id,1)
        localStorage.setItem('formData',JSON.stringify(data))
        setDetails(data)
    }

    const handleEdit=(id)=>{
        const data=JSON.parse(localStorage.getItem('formData'))
        const editData={...data[id],id}
        localStorage.setItem('editData',JSON.stringify(editData))
        navigate('/')
    }
    return(
        <div>
                <div className="flex justify-center my-2 border-b-2 h-14 shadow-md items-center">
                    <div className="w-20 flex justify-end">
                    <button onClick={()=>{navigate('/')}} className="bg-blue-500 w-fit h-fit px-2 py-1 text-white text-lg rounded-md ">Back</button>
                    </div>
                    <div className="flex justify-center w-full">
                        <h1 className="text-3xl text-center font-bold">Submitted User Details</h1>
                    </div>
                </div>

                <div className="flex justify-start flex-wrap">
                    {details.length > 0 ? (details.map((item,index)=>(
                        <div className="max-w-lg bg-slate-100 my-5 mx-auto p-4 rounded-md shadow-md"> 

                        <div className="mb-2 flex justify-center">
                            <pre className="font-bold text-lg">ID </pre>
                            <h2 className="text-lg">{index+1}</h2>
                        </div>

                        <div className=" mb-2 flex justify-center items-center">
                            <pre className="font-bold text-lg">Name </pre>
                            <h2 className="text-lg">{item.username}</h2>
                        </div>

                        <div className="mb-2 flex justify-center items-center">
                            <pre className="font-bold text-lg">Date Of Birth </pre>
                            <h2 className="text-lg">{item.dob}</h2>
                        </div>
                        
                        <div className=" mb-2 flex justify-center items-center">
                            <pre className="font-bold text-lg">Email </pre>
                            <h2 className="text-lg">{item.email}</h2>
                        </div>

                        <div className="mb-2 flex justify-center">
                        <pre className="font-bold text-lg">Message </pre>
                            <h2 className="text-lg">{item.message}</h2>
                        </div>
                        
                        <div className="mb-2 flex justify-center items-center">
                        <pre className="font-bold text-lg">Phone Number </pre>
                            <h2>{item.phone}</h2>
                        </div>

                        <div className="mb-2 flex justify-center items-center">
                        <pre className="font-bold text-lg ">Address </pre>
                            <h2 className="text-lg w-full">{item.door_no+","+item.street_name+","+item.city+","+State.getStateByCodeAndCountry(item.state,item.country).name+","+Country.getCountryByCode(item.country).name}</h2>
                        </div>
                        

                        <div className="flex w-full justify-center gap-x-5 mb-2">
                            <button className="bg-blue-500 rounded-md text-white px-2 py-1  hover:bg-blue-600" onClick={()=>{handleEdit(index)}}>Edit</button>
                        <button onClick={()=>{handleDelete(index)}} className="bg-blue-500 rounded-md text-white px-2 py-1 hover:bg-blue-600">Delete</button>
                        </div>
                </div>))):<h1 className="text-center text-2xl mx-auto m-5 font-semibold text-blue-500 ">No Data Found</h1>}
            </div>
        </div>
    )
}

export default Data;