import { LOAD_ADMIN_PRODUCTS_FAILED, LOAD_ADMIN_PRODUCTS_REQUEST, LOAD_ADMIN_PRODUCTS_SUCCESS, VIEW_ADMIN_ORDERS_FAILED, VIEW_ADMIN_ORDERS_REQUEST, VIEW_ADMIN_ORDERS_SUCCESS } from "../constants/adminConstants";

export const loadadminproductreducer=(state={adminProd:[]},action)=>{
    switch (action.type) {
        case LOAD_ADMIN_PRODUCTS_REQUEST:
            return{
                loading:true
            }
        case LOAD_ADMIN_PRODUCTS_SUCCESS:
            return{
                loading:false,
                adminProd:action.payload,
                message:"success"
            }
        case LOAD_ADMIN_PRODUCTS_FAILED:
            return{
                loading:true,
                error:action.payload,
                message:"failed"
            }
    
        default:
            return state;
    }
}

export const loadadminordersreducer=(state={adminorders:[]},action)=>{
    switch (action.type) {
        case VIEW_ADMIN_ORDERS_REQUEST:
            return{
                loading:true
            }
        case VIEW_ADMIN_ORDERS_SUCCESS:
            return{
                loading:false,
                adminorders:action.payload
            }
        case VIEW_ADMIN_ORDERS_FAILED:
            return{
                loading:true,
                error:action.payload,
                message:"failed"
            }
    
        default:
            return state;
    }
}