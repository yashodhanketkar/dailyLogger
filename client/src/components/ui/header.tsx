import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import NoteIcon from "@mui/icons-material/StickyNote2";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { MenuButton, MenuDrawer } from "./drawer";

export const Header = () => {
  const { logOut, token } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMenuDrawer = () => setMenuOpen((prev) => !prev);
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <MenuButton handleMenuDrawer={handleMenuDrawer} />
            <Box display="flex" flexDirection="row" flexGrow={1} gap={1}>
              <Button
                onClick={() => navigate("/")}
                endIcon={<NoteIcon sx={{ color: "white" }} />}
                sx={{ cursor: "default", padding: 0 }}
              >
                <Typography variant="body1" color="white">
                  WorkLogger
                </Typography>
              </Button>
            </Box>
            {token !== "" && (
              <IconButton onClick={logOut}>
                <LogoutOutlinedIcon sx={{ color: "white" }} />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <MenuDrawer open={menuOpen} handleMenuDrawer={handleMenuDrawer} />
    </>
  );
};
