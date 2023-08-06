import { LOAD_NEW_FAIL, LOAD_NEW_REQUEST, LOAD_NEW_SUCCESS, LOAD_PRO_FAIL, LOAD_PRO_REQUEST, LOAD_PRO_SUCCESS, LOAD_RELATED_FAIL, LOAD_RELATED_REQUEST, LOAD_RELATED_SUCCESS, LOAD_SINGLE_FAIL, LOAD_SINGLE_REQUEST, LOAD_SINGLE_SUCCESS, LOAD_TOP_FAIL, LOAD_TOP_REQUEST, LOAD_TOP_SUCCESS, LOAD_TRENDING_FAIL, LOAD_TRENDING_REQUEST, LOAD_TRENDING_SUCCESS } from "../constants/productConstants";

export const loadproductreducer=(state={prod:[]}, action)=>{
    switch (action.type) {
        case LOAD_PRO_REQUEST:
            return{
                loading:true
            }
        case LOAD_PRO_SUCCESS:
            return{
                loading:false,
                prod:action.payload
            }
        case LOAD_PRO_FAIL:
            return{
                loading:true,
                error:action.payload
            }
    
        default:
            return state;
    }
}


export const loadsingleproductreducer=(state={single:{}}, action)=>{
    switch (action.type) {
        case LOAD_SINGLE_REQUEST:
            return{
                loading:true
            }
        case LOAD_SINGLE_SUCCESS:
            return{
                loading:false,
                single:action.payload
            }
        case LOAD_SINGLE_FAIL:
            return{
                loading:true,
                error:action.payload
            }
        default:
            return state;
    }
}
export const loadrelatedproductreducer=(state={related:[]}, action)=>{
    switch (action.type) {
        case LOAD_RELATED_REQUEST:
            return{
                loading:true
            }
        case LOAD_RELATED_SUCCESS:
            return{
                loading:false,
                related:action.payload
            }
        case LOAD_RELATED_FAIL:
            return{
                loading:true,
                error:action.payload
            }
        default:
            return state;
    }
}
export const loadtopreducer=(state={top:[]}, action)=>{
    switch (action.type) {
        case LOAD_TOP_REQUEST:
            return{
                loading:true
            }
        case LOAD_TOP_SUCCESS:
            return{
                loading:false,
                prod:action.payload
            }
        case LOAD_TOP_FAIL:
            return{
                loading:true,
                error:action.payload
            }
    
        default:
            return state;
    }
}
export const loadtrendingreducer=(state={trending:[]}, action)=>{
    switch (action.type) {
        case LOAD_TRENDING_REQUEST:
            return{
                loading:true
            }
        case LOAD_TRENDING_SUCCESS:
            return{
                loading:false,
                prod:action.payload
            }
        case LOAD_TRENDING_FAIL:
            return{
                loading:true,
                error:action.payload
            }
    
        default:
            return state;
    }
}

export const loadnewreducer=(state={new:[]}, action)=>{
    switch (action.type) {
        case LOAD_NEW_REQUEST:
            return{
                loading:true
            }
        case LOAD_NEW_SUCCESS:
            return{
                loading:false,
                prod:action.payload
            }
        case LOAD_NEW_FAIL:
            return{
                loading:true,
                error:action.payload
            }
    
        default:
            return state;
    }
}