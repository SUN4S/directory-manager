import { Box, Tab, Tabs } from "@mui/material";

interface NavbarProps {
    tabs: TabData[];
}

interface TabData {
    label: string;
}

const Navbar = ({ tabs }: NavbarProps) => {
    return (
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs aria-label="basic tabs example">
                {tabs && tabs.map(({ label }) => <Tab label={label} />)}
            </Tabs>
        </Box>
    );
};

export default Navbar;
