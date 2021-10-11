import React, { useEffect } from 'react'
//import faker from "faker";
import {Avatar,TablePagination,Button,Table,TableBody ,TableCell,TableContainer ,TableHead ,TableRow,Paper, makeStyles, Grid, Typography, IconButton, TableFooter, CircularProgress } from '@material-ui/core';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { userlist_get, user_delete, user_entry, user_update } from '../actions/userActions';
import { Link } from 'react-router-dom';

const useStyles=makeStyles((theme)=>({
    table:{
        minWidth:650,
    },
    tableContainer:{
        borderRadius:15,
        margin:'10px 10px',
        
    },
    tableHeaderCell:{
        fontWeight:'bold',
        backgroundColor:theme.palette.primary.dark,
        color:theme.palette.getContrastText(theme.palette.primary.dark)
    },
    avatar:{
        backgroundColor:theme.palette.primary.light,
        color:theme.palette.getContrastText(theme.palette.primary.light)
    },
    name:{
        fontWeight:"bold",
        color:theme.palette.secondary.dark
    }
}))
/*
let USERS=[];
for(let i=0;i<14;i++){
    USERS[i]={
        name:faker.name.findName(),
        email:faker.internet.email(),
        phone:faker.phone.phoneNumber(),
        address:faker.address.secondaryAddress()   
    }
}
console.log(USERS);
*/

function UserRecordTable() {
const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(4);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const userDelete=useSelector(state=>state.userDelete);
  const {user_delete_payload} =userDelete;
  const userList=useSelector(state=>state.userList);
  const {userlist_get_loading,userlist_get_payload,userlist_get_error}=userList;
  const userEntry=useSelector(state=>state.userEntry);
  const {user_entry_payload}=userEntry;
  const userUpdate=useSelector(state=>state.userUpdate);
  const {user_update_payload}=userUpdate;
  const dispatch=useDispatch();

  useEffect(() => {
    dispatch(userlist_get);
  }, [user_entry_payload,user_delete_payload,user_update_payload])

    const classes=useStyles();
    return (
        <div>
        { userlist_get_loading && <div><center><CircularProgress color="secondary"/></center></div>}
        { userlist_get_error && <div><center><b><u>Not Available</u></b></center></div>}
        {userlist_get_payload &&     <TableContainer component={Paper} className={classes.tableContainer}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell className={classes.tableHeaderCell}><Typography>User Info</Typography></TableCell>
                      <TableCell className={classes.tableHeaderCell} align="right"><Typography>Address</Typography></TableCell>
                      <TableCell className={classes.tableHeaderCell} align="right">
                              Edit/Delete
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {userlist_get_payload.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => (
                      <TableRow
                        key={row.name}
                      >
                        <TableCell>
                            <Grid container>
                              <Grid item lg={3}>
                                  <Avatar className={classes.avatar} alt={row.name} src="."/>
                              </Grid>
                              <Grid item lg={9}>
                                  <Typography className={classes.name}>{row.name}</Typography>
                                  <Typography color="textSecondary" variant="body2">{row.email}</Typography>
                                  <Typography color="textSecondary" variant="body2">{row.phoneno}</Typography>
                              </Grid>
                            </Grid>
                        </TableCell>
                        <TableCell align="right"><Typography color="primary" variant="subtitle2">{row.address}</Typography></TableCell>
                          <TableCell align="right">
                              <IconButton onClick={()=>window.confirm("Are you Sure") && dispatch(user_delete(row._id))}>
                                  <DeleteIcon/>
                              </IconButton>
                              <Link
                                    to={{
                                        pathname: "/update_page",
                                        data: row // your data array of objects
                                    }}>

                                    <IconButton>
                                        <ModeEditIcon/>
                                    </IconButton>
                            </Link>
                          </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                <TableFooter>
                <TablePagination
                  rowsPerPageOptions={[5,10,15]}
                  component="div"
                  count={userlist_get_payload.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
                </TableFooter>
                </Table>
                
              </TableContainer>          
            }
            
        </div>
    )
}

export default UserRecordTable
