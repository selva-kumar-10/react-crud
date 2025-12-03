import React,{useEffect, useState} from "react";
import API from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

function EditUser(){
    const {id}=useParams();
    const nav = useNavigate();
    const[form, setForm] = useState({name:"", email:""});
    const [loading, setLoading]= useState(true);

    useEffect(()=>{
        const load = async()=>{
            try{
                const res = await API.get(`/users/${id}`);
                setForm({name: res.data.name, email: res.data.email});
            }
            catch(err){
                console.error("Loading Failed", err);
                alert("Failed to Load user")
            }
            finally{
                setLoading(false);
            }
        };
        load();
    }, [id])
    
    const handleChange =(e)=>setForm({...form, [e.target.name]: e.target.value});

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(!form.name.trim() || !form.email.trim()){
            alert("Please enter name and email")
            return;
        }

        try{
            await API.put(`/users/${id}`, {...form, id: Number(id)});
            nav("/")
        }
        catch(err){
            console.error("Update failed", err);
            alert("Failed to update user")
        }
    }

    if(loading){
        return <p>Loading User...</p>
    }
    return(
        <div>
            <h2>Edit User</h2>
            <form onSubmit={handleSubmit}>

                <div className="from-row">
                    <label>Name</label>
                    <input name="name" value={form.name} onChange={handleChange} type="text"/>
                </div>

                <div className="from-row">
                    <label>Email</label>
                    <input name="email" value={form.email} onChange={handleChange} type="email"/>
                </div>

                <div className="form-actions">
                    <button type="submit">Update</button>
                </div>
            </form>
        </div>
    );
}

export default EditUser;