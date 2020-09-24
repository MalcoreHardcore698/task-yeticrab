import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Moment from 'react-moment'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import IconOpenInNew from '@material-ui/icons/OpenInNew'
import Loading from '../ui/Loading'
import { Post } from '../../utils/interfaces'

const useStyles = makeStyles({
  root: {
    width: 425,
  },
  title: {
    fontSize: 14,
    width: '100%',
    textAlign: 'left'
  },
  pos: {
    marginBottom: 12,
    width: '100%',
    textAlign: 'left'
  },
  stretch: {
    width: '100%',
    textAlign: 'left'
  },
  button: {
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 8,
    width: '100%',
    textAlign: 'left'
  }
});

export default () => {
    const state: any = useSelector(state => state)
    const params: any = useParams()
    const classes = useStyles()

    const post = useMemo(() => (state.posts
        .find((post: Post) => post._id === params.id)
    ), [state, params])

    if (!post)
        return <Loading />

    return (    
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <header>
                    <NavLink to="/">
                        <Button className={classes.pos} variant="outlined" color="default">
                            Back
                        </Button>
                    </NavLink>
                </header>

                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Track ID:{post.trackId}
                </Typography>
                <Typography className={classes.stretch} variant="h5" component="h2">
                    {post.carrierName}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    <Moment format="MMMM mm, HH:mm">{post.createdAt}</Moment>
                </Typography>
                <Typography className={classes.pos} variant="body2" component="p">
                    {post.companyName}
                </Typography>
                <TextField
                    disabled
                    className={classes.stretch}
                    id="filled-disabled"
                    label="Comments"
                    defaultValue={post.comments}
                    rows={3}
                    multiline
                    variant="outlined"
                />
            </CardContent>

            <CardActions>
                <Button
                    href={`https://ati.su/firms/${post.code}/info`}
                    className={classes.button}
                    variant="outlined"
                    color="primary"
                    endIcon={<IconOpenInNew fontSize="small" />}
                >
                    Visit ATI
                </Button>
            </CardActions>
        </Card>
    )
}