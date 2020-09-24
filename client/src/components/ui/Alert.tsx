import React from 'react'
import { useDispatch } from 'react-redux'
import Alert from '@material-ui/lab/Alert'
import Button from '@material-ui/core/Button'
import Row from './Row'
import { deletePosts } from '../../redux/actions'
import '../../assets/styles/Alert.css'

export default ({ ids, handleSelect, handleClose }: {
    ids: any,
    handleSelect: any,
    handleClose: any
}) => {
    const dispatch = useDispatch()
    
    return (
        <div className="alert">
            <Alert severity="error">Are you sure you want to delete?</Alert>
            <Row>
                <Button 
                    variant="contained"
                    color="primary"
                    onClick={() => handleClose()}
                >
                    No
                </Button >
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        dispatch(deletePosts(ids))
                        handleSelect([])
                        handleClose()
                    }}
                >
                    Yes
                </Button>
            </Row>
        </div>
    )
}