import {PanelResizeHandle} from "react-resizable-panels";
import {Box, useTheme} from "@mui/material";

export default function ResizeHandle({orientation = "vertical"}) {
    const theme = useTheme();

    const isVertical = orientation === "vertical";

    return (
        <PanelResizeHandle
            style={
                {
                    margin: isVertical ? "0 4px" : "4px 0",
                    width:
                        isVertical ? "8px" : "100%",
                    height:
                        isVertical ? "100%" : "8px",
                    cursor:
                        isVertical ? "col-resize" : "row-resize",
                    transition:
                        "background 0.2s ease",
                    flexShrink:
                        0,
                }
            }
        >
            <Box
                sx={
                    {
                        width: "100%",
                        height:
                            "100%",
                        display:
                            "flex",
                        alignItems:
                            "center",
                        justifyContent:
                            "center",
                    }
                }
            >
                <Box
                    sx={
                        {
                            width: isVertical ? "8px" : "60px",
                            height:
                                isVertical ? "60px" : "8px",
                            borderRadius:
                                "8px",
                            backgroundColor:
                            theme.palette.primary.main,
                            transition:
                                "all 0.2s ease",
                            "&:hover":
                                {
                                    height: isVertical ? "50vh" : "8px",
                                    width:
                                        isVertical ? "8px" : "50vw",
                                }
                            ,
                        }
                    }
                />
            </Box>
        </PanelResizeHandle>
    );
}