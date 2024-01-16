import {Link, navigate} from 'react-router-dom';
import styles from './styles.module.css';
import { useState } from 'react';
import { Axios } from 'axios';

const Signup=()=>{
    const [data,setData]=useState({
        firstName:"",
        lastName:"",
        email:"",
        passowrd:"",
    })
    const handleChange=({target})=>{
        setData({
                ...data,
                [target.name]:target.value
        })
    }
    const handleSubmit=async(e)=>{
        e.preveventDefault();
        try{
            const url="/api/users";
            const {data:res}=await Axios .post(url,data);
            navigate('/login')
            console.log(res.message);
        }
        catch(error){
            if(error.response &&
               error.response.status>=400 &&    
               error.message.status<=500                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
        ){
              setError(error.response.data.message)
        }
        }
    }
    return(
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.left}>
                    <h1>Welcome to our Sign in page</h1>
                    <Link to='/login'>
                        <button type='button' className={styles.white_btn}>
                            Sign in
                        </button>
                    </Link>
                </div>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Create Account</h1>
                        <input
                            type='text'
                            placeholder='First Name'
                            name='firstName'
                            onChange={handleChange}
                            value={data.firstName}
                            required
                            className={styles.input}
                        />

                        <input
                            type='text'
                            placeholder='Last Name'
                            name='lastName'
                            onChange={handleChange}
                            value={data.lastName}
                            required
                            className={styles.input}
                        />

                        <input
                            type='text'
                            placeholder='Email'
                            name='email'
                            onChange={handleChange}
                            value={data.email}
                            required
                            className={styles.input}
                        />

                        <input
                            type='text'
                            placeholder='Password'
                            name='passowrd'
                            onChange={handleChange}
                            value={data.passowrd}
                            required
                            className={styles.input}
                        />

                        {error &&   <div className={styles.error_msg}>{error}</div>}
                        <button type='submit' className={styles.green_btn}>
                            Sign In    
                        </button>                        
                    </form>
                </div>
            </div>
        </div>
    )
};

export default Signup;