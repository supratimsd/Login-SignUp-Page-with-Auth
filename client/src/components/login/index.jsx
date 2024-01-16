import {Link} from 'react-router-dom';
import styles from './styles.module.css';
import { useState } from 'react';
import { Axios } from 'axios';

const Login=()=>{
    const [data,setData]=useState({
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
            const url="/api/auth";
            const {data:res}=await Axios .post(url,data);
            localStorage.setItem("token",res.data)
            window.location="/"
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
        <div className={styles.login_container}>
            <div className={styles.login_form_container}>
                <div className={styles.left}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>Login to your Account</h1>

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
                <div className={styles.right}>
                    <h1>New Here?</h1>
                        <Link to='/signup'>
                            <button type='button' className={styles.white_btn}>
                                Sign Up
                            </button>
                        </Link>
                    
                </div>
            </div>
        </div>
    )
};

export default Login;