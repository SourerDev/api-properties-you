const initialState = {
    allProperties : [],
    properties : [],
    detail:[]
}




export default function rootReducer(state = initialState,action){
    switch(action.type){

        case "GET_ALL_PROPERTIES":
            return{
                ...state,
                allProperties: action.payload,
                properties: [...action.payload]
                
            }
        // case "GET_ID_PROPERTIES":
        //     return{
        //         ...state,
        //         detail: action.payload

        //     }



        default: 
        return state
    }
}