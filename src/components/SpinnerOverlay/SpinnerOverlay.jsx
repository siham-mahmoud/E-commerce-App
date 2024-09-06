import React, { useEffect, useState } from 'react'
import styles from "./SpinnerOverlay.module.css"
import {PropagateLoader} from'react-spinners';
export default function SpinnerOverlay() {

  return (
    <div className="  fixed inset-0 bg-black bg-opacity-25 flex items-center justify-center z-10">
    <PropagateLoader color="green" />
  </div>
  )
}
