import React, { Fragment, useContext, useEffect, useState } from 'react'
import Box from '../components/Box/Box'
import Card from '../components/Card/Card'
import SearchInput from '../components/SearchInput/Search'
import { UserContext } from '../context/UserContext'
import PaginationHandler from '../components/Pagination/Pagination'
import Loading from '../components/Loading/Loading'

const Home = () => {

    const userContext = useContext(UserContext)

    const [data, setData] = useState(userContext.AllUsers)
    const [searchInput, setSearchInput] = useState('')
    const lastIndex = userContext.currentPage * 5
    const firstIndex = lastIndex - 5
    const records = data?.slice(firstIndex, lastIndex)

    useEffect(() => {
        setData(userContext.AllUsers)
    }, [userContext.AllUsers])


    useEffect(() => {
        if (searchInput.length > 0) {
            userContext.filteredUsersHandler(searchInput)
        } else {
            if (userContext.VisitedUsers.length > 0) {
                const newContacts = userContext.AllUsers.filter(item => {
                    return !userContext.VisitedUsers.some(item2 => item2.id === item.id)
                })
                setData(newContacts)
            }
        }
    }, [searchInput, userContext])

    return (
        <Loading condition={records}>
            <div className='w-full h-screen flex items-start'>
                <Box className={'flex flex-col mt-8 md:mt-16 mx-5 md:mx-10 lg:mx-32'}>
                    <div className='w-full mb-3'>
                        <SearchInput value={searchInput} setValue={(e) => setSearchInput(e.target.value)} />
                    </div>
                    <Fragment>
                        {!searchInput ? (
                            <div className='self-center my-3'>
                                <PaginationHandler currentPage={userContext.currentPage} setCurrentPage={userContext.setCurrentPage} recordsPerPage={5} data={data} />
                            </div>
                        ) : ''}
                        {userContext.VisitedUsers.length && !searchInput > 0 ? <h1 className='text-lg border-b border-gray-4 w-max pr-5 pb-3'>Frequently seen</h1> : ''}
                        <div>
                            {!searchInput ? userContext.VisitedUsers.map(item => {
                                return <Card className={'bg-black/40 block'} key={item.id} firstName={item.first_name} lastName={item.last_name} phoneNumber={item.phone} image={item.avatar} id={item.id} />
                            }) : ''}
                            {searchInput ? userContext.filteredUsers.map(item => {
                                return <Card key={item.id} firstName={item.first_name} lastName={item.last_name} phoneNumber={item.phone} image={item.avatar} id={item.id} />
                            }) : records?.map(item => {
                                return <Card key={item.id} firstName={item.first_name} lastName={item.last_name} phoneNumber={item.phone} image={item.avatar} id={item.id} />
                            })}
                        </div>
                    </Fragment>
                </Box>
            </div >
        </Loading>
    )
}

export default Home