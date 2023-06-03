import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import DescriptionIcon from '@mui/icons-material/Description';
import StorageIcon from '@mui/icons-material/Storage';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import CampaignIcon from '@mui/icons-material/Campaign';
import menu from '@/constant/backendMenu';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import BookmarkIcon from '@mui/icons-material/Bookmark';


export const MainListItems = ({ setCurrent }) => {
  return (
    <>
      <React.Fragment>
        {/*<ListItemButton onClick={(e) => setCurrent(menu.DASHBOARD)}>*/}
        {/*  <ListItemIcon>*/}
        {/*    <DashboardIcon/>*/}
        {/*  </ListItemIcon>*/}
        {/*  <ListItemText primary="仪表盘主页"/>*/}
        {/*</ListItemButton>*/}
        <ListItemButton onClick={(e) => setCurrent(menu.USERMANAGE)}>
          <ListItemIcon>
            <PeopleIcon/>
          </ListItemIcon>
          <ListItemText primary="用户管理"/>
        </ListItemButton>
        <ListItemButton onClick={(e) => setCurrent(menu.QUESTIONBANKMANAGE)}>
          <ListItemIcon>
            <BookmarkIcon/>
          </ListItemIcon>
          <ListItemText primary="题库管理"/>
        </ListItemButton>
        <ListItemButton onClick={(e) => setCurrent(menu.REPOSITORY)}>
          <ListItemIcon>
            <StorageIcon/>
          </ListItemIcon>
          <ListItemText primary="试题管理"/>
        </ListItemButton>
        <ListItemButton onClick={(e) => setCurrent(menu.EXAMRELEASE)}>
          <ListItemIcon>
            <DescriptionIcon/>
          </ListItemIcon>
          <ListItemText primary="考试发布"/>
        </ListItemButton>
        <ListItemButton onClick={(e) => setCurrent(menu.COURSEMANAGE)}>
          <ListItemIcon>
            <LocalLibraryIcon/>
          </ListItemIcon>
          <ListItemText primary="课程管理"/>
        </ListItemButton>
        <ListItemButton onClick={(e) => setCurrent(menu.ENTERMANAGE)}>
          <ListItemIcon>
            <DoneAllIcon/>
          </ListItemIcon>
          <ListItemText primary="准入管理"/>
        </ListItemButton>
        <ListItemButton onClick={(e) => setCurrent(menu.NOTICEMANAGE)}>
          <ListItemIcon>
            <CampaignIcon/>
          </ListItemIcon>
          <ListItemText primary="通知公告&规章制度"/>
        </ListItemButton>
      </React.Fragment>
    </>);
};
