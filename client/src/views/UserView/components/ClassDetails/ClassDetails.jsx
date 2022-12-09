import { Avatar, Box, Collapse, IconButton, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material"
import { useParams } from "react-router-dom"
import { Uploader } from "./Uploader";
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector } from "react-redux";
import { FeatureContainer, HeaderText, HeaderWrapper } from "./ClassDetails.styles";
import { useState } from "react";
import ArrowDropDownCircleIcon from "@mui/icons-material/ArrowDropDownCircle";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import DownloadIcon from '@mui/icons-material/Download';
import { ViewClassFiles } from "../components/ViewClassFiles/ViewClassFiles";


export const ClassDetails = () => {
    const {id} = useParams();
    const classFiles = useSelector(state => {
        return state.classes?.data?.find(classEntry => classEntry._id == id)
    })?.documents;

    return (
        <Box sx={{display: "flex", flexDirection: "column"}}>
            <Box>
                Class {id}
            </Box>
            <Box>
                <ViewClassFiles files={classFiles} />
            </Box>
            <Box key={id}>
                <Uploader/>
            </Box>
        </Box>
    )
}