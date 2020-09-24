import React from 'react'
import { useSelector } from 'react-redux'
import Table from '../ui/Table'

export default () => {
    const state: any = useSelector(state => state)

    return (
        <div className="home">
            <Table posts={state.posts} />
        </div>
    )
}