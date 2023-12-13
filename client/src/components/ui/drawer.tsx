import AccountTreeIcon from "@mui/icons-material/AccountTree";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import NotesIcon from "@mui/icons-material/Notes";
import { Box, Drawer, IconButton, List, ListItem, Stack } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

type MenuButtonProps = {
  handleMenuDrawer: () => void;
};

type MenuDrawerProps = {
  open: boolean;
  handleMenuDrawer: () => void;
};

type ListItemFactoryProps = {
  url: string;
  name: string;
  icon: React.ReactNode;
  handleMenuDrawer: () => void;
};

const navItems = [
  {
    url: "/",
    name: "Home",
    isProtected: false,
    icon: <HomeIcon />,
  },
  {
    url: "/projects",
    name: "Projects",
    isProtected: true,
    icon: <AccountTreeIcon />,
  },
  {
    url: "/logs",
    name: "Logs",
    isProtected: true,
    icon: <NotesIcon />,
  },
];

export const MenuButton = ({ handleMenuDrawer }: MenuButtonProps) => {
  return (
    <IconButton
      size="large"
      edge="start"
      aria-label="menu"
      sx={{
        mr: 1,
        color: "white",
      }}
      onClick={handleMenuDrawer}
    >
      <MenuIcon />
    </IconButton>
  );
};

export const MenuDrawer = ({ open, handleMenuDrawer }: MenuDrawerProps) => {
  const { token } = useAuth();
  return (
    <Drawer anchor="left" open={open} onClose={handleMenuDrawer}>
      <Stack
        sx={{
          flexGrow: 1,
          width: {
            xs: "100vw",
            sm: "25vw",
            lg: "15vw",
          },
          bgcolor: "primary.main",
          color: "white",
        }}
      >
        <Box display="inline-flex" width="100%" paddingTop={1} paddingLeft={3}>
          <MenuButton handleMenuDrawer={handleMenuDrawer} />
        </Box>
        <List>
          {navItems
            .filter((item) => {
              if (token === "") return !item.isProtected;
              return item;
            })
            .map((navItem) => (
              <ListItemFactory
                url={navItem.url}
                name={navItem.name}
                icon={navItem.icon}
                handleMenuDrawer={handleMenuDrawer}
                key={navItem.name}
              />
            ))}
        </List>
      </Stack>
    </Drawer>
  );
};

const ListItemFactory = ({
  url,
  name,
  icon,
  handleMenuDrawer,
}: ListItemFactoryProps) => {
  // const {} = useAut
  return (
    <ListItem
      sx={{
        paddingX: 2,
        paddingY: 1,
        display: "inline-flex",
        justifyContent: {
          xs: "center",
          sm: "left",
        },
        gap: 1,
        width: "100%",
        "&:hover": {
          backgroundColor: "primary.dark",
        },
      }}
      onClick={handleMenuDrawer}
      to={url}
      component={RouterLink}
    >
      {icon}
      {name}
    </ListItem>
  );
};
