import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import GroupsIcon from '@mui/icons-material/Groups';

export const HOME = "Home";
export const CHAT = "Chat";
export const CLASSES = "Classes";
export const MANAGE_GROUPS = "Manage groups"

export const PAGES = [HOME, CHAT, CLASSES]; // main pages
export const PAGES_SECONDARY = [MANAGE_GROUPS]

export const PAGE_ROUTES = {
  [HOME]: "/",
  [CHAT]: "/chat",
  [CLASSES]: "/classes",
  [MANAGE_GROUPS]: "/manage-groups"
};

export const PAGE_ICONS = {
  [HOME]: <HomeIcon fontSize="small" />,
  [CHAT]: <ChatIcon fontSize="small" />,
  [CLASSES]: <LibraryBooksIcon fontSize="small" />,
  [MANAGE_GROUPS]: <GroupsIcon fontSize="small" />
};

export const usePageStatus = (page) => {
  const route = PAGE_ROUTES[page];
  const icon = PAGE_ICONS[page];
  const label = page;

  return { route, icon, label };
};
