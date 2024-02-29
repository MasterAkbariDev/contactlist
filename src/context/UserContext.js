import React, { useEffect } from 'react'
import axios from 'axios'

export const UserContext = React.createContext({
    AllUsers: [],
    pushAllUsers: () => { },
    filteredUsers: [],
    filteredUsersHandler: () => { },
    VisitedUsers: [],
    pushVisitedUsers: () => { },
    currentPage: 1,
    setCurrentPage: () => { },
    specificUser: {},
    getSpecificUser: () => { },
})

const UserContextProvider = ({ children }) => {

    const SendData = async (path) => {
        try {
            return await axios(`http://localhost:1337/${path}`)
        }catch(err){
            console.log(err);
        }
    }

    const [users, setUsers] = React.useState([])
    const [user, setUser] = React.useState([])
    const [visitedUsers, setVisitedUsers] = React.useState([])
    const [searchedUsers, setSearchedUsers] = React.useState([])
    const [currentPage, setCurrentPage] = React.useState(1)

    const setVisitedUsersHandler = (userData) => {
        setVisitedUsers((state) => {
            const newState = state.filter((user) => user.id !== userData.id);
            if (!newState.includes(userData)) {
                newState.unshift(userData);
            }
            return newState;
        });
    }




    const debounce = (func, wait) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };


    const searchUsersHandler = debounce((searchParam) => {
        const data = {
            where: {
                first_name: { contains: searchParam },
                last_name: { contains: searchParam.toLocaleLowerCase() }
            }
        };

        SendData(`passenger/?where=${JSON.stringify(data.where)}`)
            .then(res => {
                setSearchedUsers(res.data.items)
            })
            .catch(err => console.log(err));
    }, 500)

    const getUser = (data) => {
        SendData(`passenger/${data}`).then(response => {
            setUser(response.data)
            setVisitedUsersHandler(response.data)
        }).catch(err => console.log(err))
    }

    const changePageHandler = (data) => {
        setCurrentPage(data)
    }

    useEffect(() => {
        SendData('passenger')
            .then(res => {
                setUsers(res.data.items)
            })
            .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        if (visitedUsers.length > 4) {
            setVisitedUsers((state) => [...state.slice(0, -1)]);
        }
    }, [visitedUsers])

    return (
        <UserContext.Provider value={{ AllUsers: users, VisitedUsers: visitedUsers, pushVisitedUsers: setVisitedUsersHandler, currentPage: currentPage, setCurrentPage: changePageHandler, specificUser: user, getSpecificUser: getUser, filteredUsersHandler: searchUsersHandler, filteredUsers: searchedUsers }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider