import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles, createStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TablePagination from '@material-ui/core/TablePagination'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Alert from './Alert'
import Form from './Form'
import {
  Post,
  Posts,
  Order,
  HeadCell
} from '../../utils/interfaces'
import {
  getComparator,
  stableSort
} from '../../utils/functions'

const useStyles = makeStyles(() =>
  createStyles({
    table: {
      minWidth: 650,
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    nowrap: {
      whiteSpace: 'nowrap',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    }
  })
)

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>
  numSelected: number
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Post) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

const Manage = ({
  post,
  posts,
  selected,
  setSelected,
  handleOpen,
  handleClose,
  handleModalContent
}: any) => {
  return (
    <div className="table-manage">
      <Button
        variant="contained"
        color="secondary"
        disabled={(selected.length === 0)}
        startIcon={<DeleteIcon />}
        onClick={() => {
            handleOpen()
            handleModalContent(<Alert
                ids={posts.map((p: Post) => selected.find((s: string) => s === p._id))}
                handleSelect={setSelected}
                handleClose={handleClose}
              />)
          }
        }
      >
        Delete
      </Button>
      <Button 
        variant="contained"
        color="primary"
        disabled={!post}
        startIcon={<EditIcon />}
        onClick={() => {
          handleOpen()
          if (post) handleModalContent(<Form
              post={post}
              handleSelect={setSelected}
              handleClose={handleClose}
            />)
        }}
      >
        Edit
      </Button >
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => {
          handleOpen()
          handleModalContent(<Form
              handleSelect={setSelected}
              handleClose={handleClose}
            />)
        }}
      >
        Add
      </Button>
    </div>
  )
}

const headCells: HeadCell[] = [
  { id: 'trackId', numeric: false, disablePadding: true, label: 'Track ID' },
  { id: 'companyName', numeric: false, disablePadding: true, label: 'Company Name' },
  { id: 'carrierName', numeric: false, disablePadding: true, label: 'Carrier Name' },
  { id: 'carrierPhone', numeric: false, disablePadding: true, label: 'Carrier Phone' },
  { id: 'comments', numeric: false, disablePadding: true, label: 'Comments' },
  { id: 'code', numeric: false, disablePadding: true, label: 'Code' }
]

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props

  const createSortHandler = (property: keyof Post) => (event: React.MouseEvent<unknown>) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            className={classes.nowrap}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell padding="checkbox"></TableCell>
      </TableRow>
    </TableHead>
  )
}

export default ({ posts }: Posts) => {
  const [modalContent, setModalContent] = useState(null)
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] = React.useState<keyof Post>('companyName')
  const [selected, setSelected] = useState<string[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [open, setOpen] = useState(false)

  const classes = useStyles()

  const handleModalContent = (content: any) => {
    setModalContent(content)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Post) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = posts.map((n) => n._id)
      setSelected(newSelecteds)
      return
    }
    setSelected([])
  }

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected: string[] = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (id: string) => selected.indexOf(id) !== -1

  return (
    <React.Fragment>
      <Manage
        post={(selected.length === 1) && (posts.find(post => post._id === selected[0]))}
        posts={posts}
        selected={selected}
        setSelected={setSelected}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleModalContent={handleModalContent}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="posts table">
          <EnhancedTableHead
            classes={classes}
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={posts.length}
          />
          <TableBody>
            {stableSort(posts, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((post: Post, index: number) => {
                const isItemSelected = isSelected(post._id)
                const labelId = `enhanced-table-checkbox-${index}`

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    key={post._id}
                    selected={isItemSelected}
                    aria-checked={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onClick={(event) => handleClick(event, post._id)}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>

                    <TableCell className={classes.nowrap}>{post.trackId}</TableCell>
                    <TableCell className={classes.nowrap} component="th" scope="row">
                      {post.companyName}
                    </TableCell>
                    <TableCell className={classes.nowrap}>{post.carrierName}</TableCell>
                    <TableCell className={classes.nowrap}>{post.carrierPhone}</TableCell>
                    <TableCell>{post.comments}</TableCell>
                    <TableCell className={classes.nowrap}>{post.code}</TableCell>
                    <TableCell padding="checkbox">
                      <IconButton aria-label="open">
                        <NavLink to={`/${post._id}/info`}>
                          <VisibilityIcon />
                        </NavLink>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={posts.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="modal-content">
            {modalContent}
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  )
}