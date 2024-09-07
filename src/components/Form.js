import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Country, State, City }  from 'country-state-city';

function Form() {

    const [form,setForm]=useState({})
    const [error,setError]=useState({username:'',email:'',message:'',phone:'',dob:'',password:'',door_no:'',street_name:'',country:'',state:'',city:'',gender:''})
    const navigate=useNavigate()

    
    useEffect(()=>{ 
        const storedData = localStorage.getItem('editData');
        const editData = storedData 
            ? JSON.parse(storedData) 
            : {  
                id:'',
                username: '', 
                email: '', 
                message: '', 
                phone: '', 
                dob: '',
                password: '', 
                door_no: '', 
                street_name: '',
                country:'',
                state:'',
                city:'', 
                gender: ''
            };

        setForm(editData)
    },[])
    const handleChange=(e)=>{
        const {name,value}=e.target
        if(name=='phone')
        {
            if(isNaN(value))
            {
                return
            }
        }
        if (name === 'door_no') {
            if (value.length > 10) {
                setError((prev) => ({ ...prev, door_no: "Door No should be less than 10 characters" }));
                return;
            }
        }
        setForm({
        ...form,
        [name]:value
        })
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formKeys=Object.keys(form)
        const formValues=Object.values(form)
        
        formValues.forEach((value,index)=>{
            if(value==''&&formKeys[index]!='id')
            {   
                setError((prev)=>({...prev,[formKeys[index]]:`Please fill the ${formKeys[index]}`}))
                console.log(formKeys[index]);
            }
            console.log(formKeys[index]);
        })
        console.log(form);

        if(form.email!='')
        {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(emailRegex.test(form.email)==false)
            {
                setError((prev=>({...prev,email:"Invalid Email"})))
                form.email=''
            }
        }
        

        if(form.username.length<3&&form.username!='')
        {
            setError((prev)=>({...prev,username:"Name should be atleast 3 characters"}))
            form.username=''

        }
        
        if(form.username.length>20)
        {
            setError((prev)=>({...prev,username:"username should be less than 20 characters"}))
            form.username=''
        }
        
        if(form.dob!='')
        {
            const dob=new Date(form.dob)
            const current=new Date()
            if(dob>current)
            {
                setError((prev)=>({...prev,dob:"Date of Birth should be less than current date"}))
                form.dob=''
            }
        }
        
        if(form.password!='')
        {
            const hasCapital = /[A-Z]/.test(form.password);
            const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.password);
            const hasNumber = /\d/.test(form.password);

            if(form.password.length<8)
            {
                    setError((prev)=>({...prev,password:"Password should be atleast 8 characters"}))
                    form.password=''
            }
            else
            {
                if(!hasCapital)
                    {
                        setError((prev)=>({...prev,password:"Password should contain atleast one Capital letter"}))
                        form.password=''
        
                    }
                    if(!hasSymbol)
                    {
                        setError((prev)=>({...prev,password:"Password should contain atleast one Special character"}))
                        form.password=''
        
                    }
                    if(!hasNumber)
                    {
                        setError((prev)=>({...prev,password:"Password should contain atleast one Number"}))
                        form.password=''
        
                    }
                    if(!hasCapital&&!hasSymbol)
                    {
                        setError((prev)=>({...prev,password:"Password should contain atleast one Capital letter and Special character"}))
                        form.password=''
        
                    }
                    if(!hasCapital&&!hasNumber)
                    {
                        setError((prev)=>({...prev,password:"Password should contain atleast one Capital letter and Number"}))
                        form.password=''
        
                    }
                    if(!hasNumber&&!hasSymbol)
                    {
                        setError((prev)=>({...prev,password:"Password should contain atleast one Number and Special character"}))
                        form.password=''
        
                    }
            }
            
        }
        console.log(form);
        if(form.email==''||form.message==''||form.phone==''||form.dob==''||form.password==''||form.door_no==''||form.street_name==''||form.country==''||form.state==''||form.city==''||form.username=='')
        {
            console.log(form);
            return
        } 
        console.log(form); 
        if(localStorage.getItem('editData')!=undefined) 
        {
            const id=JSON.parse(localStorage.getItem('editData')).id
            const data=JSON.parse(localStorage.getItem('formData'))
            data.splice(id,1,form)
            localStorage.setItem('formData',JSON.stringify(data))
            localStorage.removeItem('editData')
        }
        else
        {
            const usersData=JSON.parse(localStorage.getItem('formData')||"[]")
            usersData.push(form)
            localStorage.setItem('formData',JSON.stringify(usersData))   
        }
        navigate('/details')
    }
    return (
        <div className="max-w-lg bg-slate-100 shadow-lg rounded-md mx-auto m-10 p-4">
    <h1 className="font-bold text-2xl mb-4">User Forms</h1>

    <form onSubmit={handleSubmit}>
        <div className=" mb-4">
            <label htmlFor='username' className="block mb-1 text-gray-700">User Name</label>
            <input 
                type="text" 
                onChange={handleChange} className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${error.username!=''? 'ring-2 ring-red-500' : ' focus:ring-blue-500'}`} 
                onFocus={()=>{setError((prev)=>({...prev,username:''}))}}
                placeholder="Enter your User Name" 
                name='username' 
                value={form.username}></input>
            {error.username!=''?<p className="visible text-red-500">{error.username}</p>:null}
        </div>

        <div className="mb-4">
            <label htmlFor='email' className="block mb-1 text-gray-700">Email</label>
            <input type="text" name="email" 
            onFocus={()=>{setError((prev)=>({...prev,email:''}))}}
            placeholder='Enter your Mail Address' onChange={handleChange} value={form.email}  className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${error.email!=''? ' ring-2 ring-red-500' : ' focus:ring-blue-500'}`}></input>
            {error.email!=''?<p className="visible text-red-500">{error.email}</p>:null}
        </div>

        <div className='mb-4'>
        <label  htmlFor="message"className="block mb-1 text-gray-700">Message</label>
        <textarea 
            name="message" 
            cols="1" 
            rows="3" onChange={handleChange} className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${error.message!=''? 'ring-2 ring-red-500' : ' focus:ring-blue-500'}`}
             placeholder='Add Messages'
             onFocus={()=>{setError((prev)=>({...prev,message:''}))}}
             value={form.message}
             ></textarea>
        {error.message!=''?<p className="visible text-red-500">{error.message}</p>:null}
        </div>

        <div className='mb-4'>
        <label htmlFor="phone" className='mb-1 block'>Phone Number</label>
        <input 
            type="text" 
            name="phone" 
            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${error.phone!=''? 'ring-2 ring-red-500' : ' focus:ring-blue-500'}`} 
            placeholder='Enter your Phone Number'
            onFocus={()=>{setError((prev)=>({...prev,phone:''}))}}
            value={form.phone}
            maxLength={10}
            onChange={handleChange}  />
        {error.phone!=''?<p className="visible text-red-500">{error.phone}</p>:null}
        </div>

        <div className="mb-4">
            <label  className="block mb-1 text-gray-700">Date of Birth</label>
            <input 
            type="date" 
            name='dob' 
            className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${error.dob!=''? 'ring-2 ring-red-500' : ' focus:ring-blue-500'}`}
            onChange={handleChange}
            onFocus={()=>{setError((prev)=>({...prev,dob:''}))}}
            value={form.dob}
            ></input>
            {error.dob!=''?<p className=" text-red-500">{error.dob}</p>:null}
        </div>

        <div className="mb-4">
            <label htmlFor='password' className="block mb-1 text-gray-700"  >Password</label>
            <input 
                type="password"
                name="password"
                placeholder='Enter your Password'
                onChange={handleChange}
                className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${error.password!=''? 'ring-2 ring-red-500' : ' focus:ring-blue-500'}`}
                onFocus={()=>{setError((prev)=>({...prev,password:''}))}}
                value={form.password}
            ></input>
            {error.password!=''?<p className="visible text-red-500">{error.password}</p>:null}
        </div>

        <div className="mb-4">
            <label htmlFor='gender' className=" text-gray-700 mb-1 block">Gender</label>
            <select 
                name="gender"  
                onChange={handleChange} 
                value={form.gender}
                className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${error.gender!=''? 'ring-2 ring-red-500' : ' focus:ring-blue-500'}`}
                onFocus={()=>{setError((prev)=>({...prev,gender:''}))}} 
            
            >
                <option value="">Select the Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            {error.gender!=''?<p className=" text-red-500">{error.gender}</p>:null}
        </div>

        <div className="mb-4">
            <h2 className='text-gray-700 mb-1 block text-xl font-semibold' >Address</h2>
            <div className='flex mb-4'>
                <div>
                    <label htmlFor="door_no" className='className=" text-gray-700 mb-1'>Door No</label>
                    <input 
                        type="text" 
                        name='door_no'
                        className={`w-24 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${error.door_no!=''? 'ring-2 ring-red-500' : ' focus:ring-blue-500'}`}
                        onFocus={()=>{setError((prev)=>({...prev,door_no:''}))}}
                        onChange={handleChange}
                        value={form.door_no}
                     />
                    {error.door_no!=''?<p className=" text-red-500">{error.door_no}</p>:null}
                </div>

                <div className='w-full'>
                    <label htmlFor="street_name" className='text-gray-700 mb-1 '>Steet Name</label>
                    <input type="text"
                        name="street_name" 
                        className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${error.street_name!=''? 'ring-2 ring-red-500' : ' focus:ring-blue-500'}`}
                        onFocus={()=>{setError((prev)=>({...prev,street_name:''}))}}
                        onChange={handleChange}
                        value={form.street_name}
                    />
                    {error.street_name!=''?<p className=" text-red-500">{error.street_name}</p>:null}
                </div>
            </div>

            <div className='mb-4'>
                <label htmlFor="country"  className='text-gray-700 mb-1 block'>Country</label>
                <select 
                    name="country" 
                    onFocus={()=>{setError((prev)=>({...prev,country:''}))}} onChange={handleChange} 
                    value={form.country} 
                    className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${error.country!=''? 'ring-2 ring-red-500' : ' focus:ring-blue-500'}`}>
                    <option value="">Select Your Country</option>
                    {
                        Country.getAllCountries().map((country)=>(
                            <option value={country.isoCode}>{country.name}</option>
                        ))
                    }
                </select>
                {error.country!=''?<p className=" text-red-500">{error.country}</p>:null}
            </div>

            <div>
                <label htmlFor="state" className='text-gray-700 mb-1 block'>State</label>
                <select
                    name="state" 
                    onChange={handleChange}
                    className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${error.state!=''? 'ring-2 ring-red-500' : ' focus:ring-blue-500'}`}
                    value={form.state}
                    onFocus={()=>{setError((prev)=>({...prev,state:''}))}}
                     >
                    <option value="">Select Your State</option>
                    {
                        State.getStatesOfCountry(form.country,form.state).map((state)=>(
                            <option value={state.isoCode}>{state.name}</option>
                        ))
                    }
                </select>
                {error.state!=''?<p className=" text-red-500">{error.state}</p>:null}
            </div>

            <div>
                <label htmlFor="city" className='text-gray-700 mb-1 block'>City</label>
                <select
                    name="city"
                    className={`w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${error.city!=''? 'ring-2 ring-red-500' : ' focus:ring-blue-500'}`}
                    onFocus={()=>{setError((prev)=>({...prev,city:''}))}}
                    onChange={handleChange}
                    value={form.city}
                >
                    <option value="">Select Your City</option>
                    {
                        City.getCitiesOfState(form.country,form.state).map((city)=>(
                            <option value={city.id}>{city.name}</option>
                        ))
                    }
                </select>
                {error.city!=''?<p className=" text-red-500">{error.city}</p>:null}
            </div>

        </div>

        <div>
            <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-2 mb-4">Submit</button>
        </div>

    </form>
            <div>
                <button onClick={()=>{navigate('/details')}} className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-2"> View Submissions</button>
            </div>
    </div>
  );
}

export default Form;
