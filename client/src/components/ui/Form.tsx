import React from 'react'
import { useDispatch } from 'react-redux'
import Alert from '@material-ui/lab/Alert'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import InputMask from 'react-input-mask'
import { useForm } from 'react-hook-form'
import { addPost, editPost } from '../../redux/actions'
import { Post } from '../../utils/interfaces'
import '../../assets/styles/Form.css'

export default ({ post, handleSelect, handleClose }: {
    post?: Post,
    handleSelect: any,
    handleClose: any
}) => {
    const dispatch = useDispatch()
    const { register, handleSubmit, errors } = useForm()

    const onSubmit = (data: any) => {
        const action = (post) ? editPost : addPost
        const document: Post = {
            _id: post?._id || 'secret',
            trackId: data.trackId,
            companyName: data.companyName,
            carrierName: data.carrierName,
            carrierPhone: data.carrierPhone,
            comments: data.comments,
            code: data.code
        }

        dispatch(action(document))
        handleSelect([])
        handleClose()
    }

    return (
        <form
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            {(
                errors.trackId
                || errors.companyName
                || errors.carrierName
                || errors.carrierPhone
                || errors.comments
                || errors.code
            ) && (
                <Alert severity="error">
                    {(
                        errors.trackId?.message
                        || errors.companyName?.message
                        || errors.carrierName?.message
                        || errors.carrierPhone?.message
                        || errors.comments?.message
                        || errors.code?.message
                    )}
                </Alert>
            )}
            <TextField
                type="number"
                inputRef={register({
                    required: 'Track ID is require'
                })}
                defaultValue={post?.trackId || ''}
                name="trackId"
                id="track-id"
                label="Track ID"
            />
            <TextField
                inputRef={register({
                    required: 'Company Name is require'
                })}
                defaultValue={post?.companyName || ''}
                name="companyName"
                id="company-name"
                label="Company Name"
            />
            <TextField
                inputRef={register({
                    required: 'Carrier Name is require'
                })}
                defaultValue={post?.carrierName || ''}
                name="carrierName"
                id="carrier-name"
                label="Carrier Name"
            />
            
                <InputMask
                    id="carrier-phone"
                    defaultValue={post?.carrierPhone || ''}
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
                inputRef={register({
                    required: 'Comments is require'
                })}
                defaultValue={post?.comments || ''}
                name="comments"
                id="comments"
                label="Comments"
                multiline
                rows={5}
                rowsMax={5}
            />
            <TextField
                type="number"
                inputRef={register({
                    required: 'Code ATI is require'
                })}
                defaultValue={post?.code || ''}
                name="code"
                id="code"
                label="Code ATI"
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
            >
                {(post) ? 'Save Changes' : 'Add'}
            </Button>
        </form>
    )
}