import { createUser } from '@/other/services/mongo/actions/user';
import { useAppDispatch, useAppSelector } from '@/other/services/redux/hooks';
import { setToken, setUserId } from '@/other/services/redux/reducers/auth';
import { UserType } from '@/other/types';
import { sendEmail } from '@/other/utils';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const RegisterPage = () => {
    const auth = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    const router = useRouter();

    const initialState = {
        name: "",
        surname: "",
        email: "",
        reEmail: "",
        password: "",
        rePassword: ""
    }

    const [loginState, setLoginState] = useState({...initialState, name: auth.name.split(" ")[0], surname: auth.name.split(" ")[0], email: auth.email});
    const [errorState, setErrorState] = useState(initialState);

    const handleClick = () => {
        if (!checks()) {
            return;
        }
        gotoVerification();
    }

    const checkOne = () => {
        return true;
    }
    
    const checkTwo = () => {
        return true;
    }

    const checks = () => {
        if (!checkOne()) {
            return false;
        }
        return checkTwo();
    }

    const gotoVerification = async () => {
        const user: UserType = await createUser({
            id: '',
            name: '',
            email: '',
            password: '',
            connectionsIds: [],
            savedDocuments: [],
            logs: [],
            verification: false,
            firstTime: false,
            sessionId: '',
            logoutAfter: 0
        });
        const token = Math.floor(Math.random() * 1000000).toString();
        await sendEmail('', '', '', {emailTo: '', token: token});
        dispatch(setToken(token)); dispatch(setUserId(user.id));
        router.push('/auth/verification');
    }

    return (
        <div>
            
        </div>
    )
}

export default RegisterPage