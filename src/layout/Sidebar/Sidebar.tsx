import * as S from "@layout/Sidebar/Sidebar.styles.ts";
import {
    MouseEvent,
    RefObject,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import FileInput from "@components/FileInput/FileInput.tsx";

export const defaultDrawerWidth = 240;
export const minDrawerWidth = 100;

const Sidebar = () => {
    const sidebarRef: RefObject<HTMLDivElement> = useRef(null);
    const [isResizing, setIsResizing] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(defaultDrawerWidth);

    const startResizing = useCallback(() => {
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback(
        (e: { clientX: number }) => {
            if (isResizing && sidebarRef.current != null) {
                setSidebarWidth(
                    e.clientX - sidebarRef.current.getBoundingClientRect().left
                );
            }
        },
        [isResizing]
    );

    const handleOpenDialog = async () => {
        console.log("Opening Dialog");
        const file = await window.electron.file.getFilepath();
        window.electron.store.set("parentDirectory", file);
        window.electron.file.buildFileTree();
    };

    useEffect(() => {
        window.addEventListener("mousemove", resize, true);
        window.addEventListener("mouseup", stopResizing, true);
        return () => {
            window.removeEventListener("mousemove", resize, true);
            window.removeEventListener("mouseup", stopResizing, true);
        };
    }, [resize, stopResizing]);

    return (
        <S.SidebarContainer
            ref={sidebarRef}
            onMouseDown={(e: TouchEvent | MouseEvent) => e.preventDefault()}
            width={sidebarWidth}
        >
            <S.SidebarContentContainer>
                <FileInput
                    text="Select Parent"
                    clickHandle={handleOpenDialog}
                />
            </S.SidebarContentContainer>
            <S.ResizeHandle onMouseDown={startResizing} />
        </S.SidebarContainer>
    );
};

export default Sidebar;
