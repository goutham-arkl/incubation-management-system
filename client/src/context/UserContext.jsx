import {createContext , useState} from 'react'
import {useCookies} from 'react-cookie'


export const UserContext= createContext(null)

function User({children})
{
    const user = JSON.parse(localStorage.getItem('user'));
    const [userDetails, setUserDetails]=useState(user)
    const [cookies,setCookie,removeCookie] = useCookies([]);


    return(
        <UserContext.Provider value={{userDetails, setUserDetails,cookies,setCookie,removeCookie}}>
            {children}
        </UserContext.Provider>
    )
}

export default User;