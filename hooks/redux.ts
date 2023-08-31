import { cartActions } from "@/store/reducers/cartSlice"
import { bindActionCreators } from "@reduxjs/toolkit"
import { useDispatch } from "react-redux"


const allActions = {
    ...cartActions
}

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(allActions, dispatch)
}