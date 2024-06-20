import { Box, Button, Tab, Tabs, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import { useState } from 'react';
import { createGroup, joinGroup } from 'service/groupService';

interface JoinGroupDialogInterface {
  open: boolean,
  onClose: (value: boolean) => void;
}

const JoinGroupDialog = ({open, onClose}: JoinGroupDialogInterface) => {

  const [activeTab, setActiveTab] = useState<number>(0)
  const [groupName, setGroupName] = useState<string>('')

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleCreateGroup = () => {
    const userId = localStorage.getItem('id') || ''
    createGroup({name: groupName, id: userId})
    .then((res) => {
      console.log('Group created successfully')
      handleClose()
    })
    .catch((err) => console.error(err))
    handleClose()
  }

  const handleJoinGroup = () => {
    const userId = localStorage.getItem('id') || ''
    joinGroup({name: groupName, id: userId})
    .then((res) => {
      console.log('Group joined successfully')
      handleClose()
    })
    .catch((err) => console.error(err))
  }

  const handleClose = () => {
    onClose(false)
  }

  return(
    <Dialog open={open} PaperProps={{sx:{width: '500px', height: '200px'}}} className='joinGroup' onClose={handleClose}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224 }}>
        <Tabs 
          orientation='vertical'
          value={activeTab}
          onChange={handleChange}
          sx={{ borderRight: 1, borderColor: 'divider', width:'150px' }}
        >
          <Tab label="Create Group" />
          <Tab label="Join Group" />
        </Tabs>
        <Box>
          {activeTab === 0 && (
            <Box sx={{p: 3}}>
              <TextField label="Enter group name" onChange={(e) => setGroupName(e.target.value)}/>
              <Button variant='contained' sx={{mt: 2, backgroundColor: '#6366f1', color: '#FFF'}} onClick={handleCreateGroup}>Create Group</Button>
            </Box>
          )}
        </Box>
        <Box>
          {activeTab === 1 && (
            <Box sx={{p: 3}}>
              <TextField label="Enter group name" onChange={(e) => setGroupName(e.target.value)}/>
              <Button variant='contained' sx={{mt: 2, backgroundColor: '#6366f1', color: '#FFF'}} onClick={handleJoinGroup}>Join Group</Button>
            </Box>
          )}
        </Box>
      </Box>
    </Dialog>
  )
}

export default JoinGroupDialog