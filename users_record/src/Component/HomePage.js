import React from 'react'
import UserRecordForm from './UserRecordForm'
import UserRecordTable from './UserRecordTable'
import { Grid } from '@material-ui/core';
function HomePage() {
    return (
        <Grid container spacing={2}>
          <Grid item lg={7} xs={12}>
            <UserRecordTable/>
          </Grid>
          <Grid item lg={5} xs={12}>
            <UserRecordForm/>
          </Grid>
        </Grid>
    )
}

export default HomePage
