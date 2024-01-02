import { getUserByEmail, getUserById } from '@/lib/services/mongodb';
import { useAppDispatch, useAppSelector } from '@/lib/services/redux/hooks'
import { setEmail, setPassword, setToken, setUser} from '@/lib/services/redux/reducers/authReducer';
import { login } from '@/lib/services/redux/reducers/homeReducer';
import { getConnections, getUser, sendEmail } from '@/lib/utils/authUtil';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react'

const LoginPage = () => {
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const router = useRouter();

    const initialState = {
        email: auth.email,
        password: ""
    };

    const [loginState, setLoginState] = useState(initialState);
    const [errorState, setErrorState] = useState(initialState);
    
    useEffect(() => {
        dispatch(setEmail(loginState.email));
    }, [loginState.email])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginState({...loginState, [e.target.name]: e.target.value});
        setErrorState({...errorState, [e.target.name]: e.target.value});
    }

    const handleClick = async () => {
        const res: any = await checks();
        if (!res) {
            return;
        }
        const user = getUser(res);
        if (user.verification) {
            const token = Math.floor(Math.random() * 1000000).toString();
            dispatch(setToken(token));
            sendEmail('service_7owseuq', 'template_c7w8k8a', '1VWYv7LY3mOtygs-p', {token: token});
            dispatch(setUser(user));
            router.push('/auth/verification');
        } else {
            dispatch(login({user: user, connections: getConnections(res.connectionsIds , res.id)}));
            router.push('/home');
        }
    }

    const checks = async () => {
        // email wrong type
        // password length < 8
        // password wrong type
        
        const user = await getUserByEmail(loginState.email);

        // user wrong email
        // user wrong password
        
        return user;
    }

    return (
        <div>
            <input name='email' type='text' value={loginState.email} onChange={handleChange}/>
            <input name='password' type='password' value={loginState.password} onChange={handleChange}/>
            <button onClick={handleClick}>LOGIN</button>
        </div>
    )
}

export default LoginPage