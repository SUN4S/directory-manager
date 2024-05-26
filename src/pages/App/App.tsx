import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import * as S from "@pages/App/App.styled.ts";
import Sidebar from "@layout/Sidebar/Sidebar.tsx";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const App = () => {
    return (
        <ThemeProvider theme={darkTheme}>
            <S.AppContainer>
                <CssBaseline />
                <Sidebar />
                <S.ContentContainer>
                    <Outlet />
                </S.ContentContainer>
            </S.AppContainer>
        </ThemeProvider>
    );
};

export default App;

// const [files, setFiles] = useState<Array<any>>();
//
// const count = useSelector((state: RootState) => state.counter.value);
// const dispatch = useDispatch();
//
// const insertData = () => {
//     console.log("insertData");
//     const data = window.electron.store.push("item", `data${i}`);
//     console.log(data);
// };
//
// let i = 0;
// const fetchData = () => {
//     console.log("fetchData");
//     const item = window.electron.store.get("item");
//     setFiles(item);
//     i++;
// };
//
// const deleteDate = () => {
//     console.log("deleteDate");
//     window.electron.store.delete("item");
// };
