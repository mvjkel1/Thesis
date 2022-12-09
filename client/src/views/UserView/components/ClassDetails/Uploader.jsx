
import { Box } from '@mui/material'
import React, {useCallback} from 'react'

import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getClasses } from '../../../../redux/actions/classes'
import { FeatureContainer } from './ClassDetails.styles'



export const Uploader = () => {
const {id} = useParams();
const dispatch = useDispatch();
const token = useSelector(state => state.auth.user.token);
const getUploadParams = ({ meta }) => { return { url: `http://localhost:3001/api/v1/classes/${id}`, headers: { Authorization: `Bearer ${token}` } } }
  const handleChangeStatus = ({ meta, file }, status) => { 
  console.log(status, meta, file) 
}
const handleSubmit = (files, allFiles) => {
  // send chat notification about user successfully adding files... (tbd)
  // Remove them from dropzone
  allFiles.map(f => f.remove())
  // Dispatch action to refetch class data (to show new files)
  dispatch(getClasses(id, token));
}
return (
  <FeatureContainer>
  <Dropzone
    getUploadParams={getUploadParams}
    onChangeStatus={handleChangeStatus}
    onSubmit={handleSubmit}
    accept="image/*,audio/*,video/*,.pdf"
  />
  </FeatureContainer>
)
}


