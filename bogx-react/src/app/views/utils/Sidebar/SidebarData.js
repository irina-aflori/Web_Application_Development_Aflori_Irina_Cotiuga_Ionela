import HomeIcon from '@mui/icons-material/Home';
import PinDropIcon from '@mui/icons-material/PinDrop';
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
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
        title: "Botanical Info",
        icon: <ListAltIcon/>,
        iconClosed: <KeyboardArrowDownIcon/>,
        iconOpened: <KeyboardArrowUpIcon/>,
        subNav: [
            {
                title: "Plants",
                path: "/plants",
                icon: <LocalFloristIcon/>
            },
            {
                title: "Fauna",
                path: "/",
                icon: <EmojiNatureIcon/>
            }
        ]
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