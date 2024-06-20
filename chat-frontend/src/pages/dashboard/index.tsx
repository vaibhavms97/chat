import Grid from "@mui/material/Grid"
import GroupList from "./components/groupList"
import Chats from "./components/chats"
import { useState } from "react"

interface groupListInterface {
  _id: string,
  name: string,
  users: string[]
}
const Dashboard = () => {

  const [selectedGroup, setSelectedGroup] = useState<groupListInterface | null>(null)

  return (
    <Grid container height='100%'>
      <Grid item xs={4}>
        <GroupList selectedGroup={selectedGroup} setSelectedGroup={setSelectedGroup}/>
      </Grid>
      <Grid item xs={8} display='flex' flexDirection='column' justifyContent='flex-end' sx={{backgroundColor: '#f9fafc'}}>
        <Chats selectedGroup={selectedGroup} />
      </Grid>
    </Grid>
  )
}

export default Dashboard