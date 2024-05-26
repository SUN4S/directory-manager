import styled from "@emotion/styled";

interface SidebarContainerInterface {
    width: number;
}

export const SidebarContainer = styled.div<SidebarContainerInterface>`
    width: ${(props) => props.width}px;
    display: flex;
    flex-direction: row;
`;

export const SidebarContentContainer = styled.div`
    width: 100%;
    padding: 0.5rem;
`;

export const ResizeHandle = styled.div`
    width: 0.4rem;
    padding: 0 0.125rem;
    background-clip: content-box;
    background-color: #9e9e9e;
    cursor: col-resize;
    z-index: 1;
`;
