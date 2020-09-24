import React from 'react'
import { useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputMask from 'react-input-mask'
import { useForm } from 'react-hook-form'
import { editPost } from '../../redux/actions'
import { Post } from '../../utils/interfaces'
import '../../assets/styles/Edit.css'

export default ({ post, handleSelect, handleClose }: {
    post: Post,
    handleSelect: any,
    handleClose: any
}) => {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const onSubmit = (data: any) => {
        const edited: Post = {
            _id: post._id,
            trackId: data.trackId,
            companyName: data.companyName,
            carrierName: data.carrierName,
            carrierPhone: data.carrierPhone,
            comments: data.comments,
            code: data.code
        }
        dispatch(editPost(edited))
        handleSelect([])
        handleClose()
    }

    return (
        <form
            className="edit"
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <TextField
                type="number"
                inputRef={register()}
                defaultValue={post.trackId}
                name="trackId"
                id="track-id"
                label="Track ID"
            />
            <TextField
                inputRef={register()}
                defaultValue={post.companyName}
                name="companyName"
                id="company-name"
                label="Company Name"
            />
            <TextField
                inputRef={register()}
                defaultValue={post.carrierName}
                name="carrierName"
                id="carrier-name"
                label="Carrier Name"
            />
            
            <InputMask
                id="carrier-phone"
                defaultValue={post.carrierPhone}
                mask="+(9) 999 999 99 99"
                maskChar=" "
            >
                {() => <TextField
                    name="carrierPhone"
                    inputRef={register({
                        required: 'Carrier Phone is require'
                    })}
                    label="Carrier Phone"
                />}
            </InputMask>

            <TextField
                inputRef={register()}
                defaultValue={post.comments}
                name="comments"
                id="comments"
                label="Comments"
                multiline
                rows={5}
                rowsMax={5}
            />
            <TextField
                type="number"
                inputRef={register()}
                defaultValue={post.code}
                name="code"
                id="code"
                label="Code ATI"
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                Save Changes
            </Button>
        </form>
    )
}