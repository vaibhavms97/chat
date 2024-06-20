import { Box, Button, Divider, Tab, Tabs, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { getGroupList } from "service/groupService";
import { Avatar } from "@mui/material";
import JoinGroupDialog from "./joinGroupDialog";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface GroupListInterface {
  _id: string,
  name: string,
  users: string[]
}

interface GroupListProps {
  selectedGroup: GroupListInterface | null,
  setSelectedGroup: (value: GroupListInterface) => void
}
const GroupList = ({selectedGroup,setSelectedGroup}: GroupListProps) => {

  const [groupList, setGroupList] = useState<GroupListInterface[]>([])
  const [showDialog, setShowDialog] = useState<boolean>(false)

  useEffect(() => {
    getGroupListData()
  },[])

  useEffect(() => {
    if(showDialog === false) {
      getGroupListData()
    }
  }, [showDialog])

  const getGroupListData = () => {
    getGroupList()
    .then((res) => {
      setGroupList(res.data.groups)
      if(selectedGroup === null) {
        setSelectedGroup(res.data.groups[0])
      }
    })
  }

  const handleShowDialog = () => {
    setShowDialog((prev) => !prev)
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box>{children}</Box>}
      </div>
    );
  }

  return(
    <Box className='groupList' position='relative' height='100%'>
      <Typography variant='h5' fontWeight='600' p={2}>Chat App</Typography>
      <Tabs value={0}>
        <Tab label='Groups' /> 
      </Tabs>
      <Divider />
      <CustomTabPanel value={0} index={0}>
        {groupList.map((group) => (
          <Box key={group._id} sx={{cursor:'pointer'}} onClick={() => setSelectedGroup(group)}>
            <Box display='flex' alignItems='center' p={2}>
              <Avatar />
              <Typography pl={1}>{group.name}</Typography>
            </Box>
            <Divider />
          </Box>
        ))} 
      </CustomTabPanel>
      <JoinGroupDialog open={showDialog} onClose={setShowDialog} />
      <Button variant='contained' sx={{backgroundColor: '#6366f1', position: 'absolute', bottom: 8, right: 8, borderRadius: '50%', height: '4rem', width: '4rem'}} onClick={handleShowDialog}>
        <AddIcon color="primary"/>
      </Button>
    </Box>
  )
}

export default GroupList