import { Button } from "@mui/material";
import { ChangeEvent } from "react";

interface FileInputInterface {
    text: string;
    clickHandle: (e: ChangeEvent) => void;
}

const FileInput = ({ text, clickHandle }: FileInputInterface) => {
    return (
        <>
            <label htmlFor="raised-button-file">
                <Button
                    sx={{ width: "100%" }}
                    variant="outlined"
                    component="span"
                    onClick={clickHandle}
                >
                    {text}
                </Button>
            </label>
        </>
    );
};

export default FileInput;
