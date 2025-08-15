import {TailSpin} from "react-loader-spinner";
import React from "react";
import {useTheme} from "@mui/material/styles";


interface LoadingWheelProps{
    color?: string
}

export default function LoadingWheel(props: LoadingWheelProps){
    const theme = useTheme();
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
            <TailSpin
                visible={true}
                height="40"
                width="40"
                color={props.color ?? theme.palette.primary.main}
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{ position: 'relative' }}
                wrapperClass=""
            />
        </div>
    );
}