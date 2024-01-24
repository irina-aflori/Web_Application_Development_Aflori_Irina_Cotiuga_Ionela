import HomeIcon from '@mui/icons-material/Home';
import PinDropIcon from '@mui/icons-material/PinDrop';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import MoneyIcon from '@mui/icons-material/Money';

export const SidebarData = [
    {
        title: "MainPage",
        path: "/",
        icon: <HomeIcon/>
    },
    {
        title: "Map",
        path: "/map",
        icon: <PinDropIcon/>
    },
    {
        // title: "Botanical Info",
        // icon: <ListAltIcon/>,
        // iconClosed: <KeyboardArrowDownIcon/>,
        // iconOpened: <KeyboardArrowUpIcon/>,
        // subNav: [
        //     {
                title: "Botanical Info Plants",
                path: "/plants-species",
                icon: <LocalFloristIcon/>
            // }
        // ]
    },
    {
        title: "Events",
        path: "/events",
        icon: <InsertInvitationIcon/>
    },
    {
        title: "Taxes & services",
        path: "/taxes",
        icon: <MoneyIcon/>
    }
]