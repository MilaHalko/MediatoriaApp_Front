import {useEffect} from 'react';
import {useAuth} from "../../context/AuthProvider";
import {router} from "expo-router";

const AuthorisedRoute = ({children}) => {
    const {user} = useAuth()

    useEffect(() => {
        if (!user) {
            router.replace('/')
        }
    }, [user]);

    if (!user) {
        return null
    }

    return children
};

export default AuthorisedRoute;
