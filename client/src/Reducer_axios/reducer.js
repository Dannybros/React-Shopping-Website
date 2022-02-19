export const initialState={
    products:[],
    cart: [],
    user: null,
};

const reducer = (state, action)=>{
    switch (action.type) {
        case 'ADD_TO_BASKET':
            return{
                ...state,
                cart: [...state.cart, action.item],
            };
        
        case 'Clear_BASKET':
            localStorage.removeItem('basket');
            return{
                ...state,
                user:null,
                cart: [],
            };

        case 'DELETE_FROM_BASKET':
            const index = state.cart.findIndex(item=>item.id ===action.id);
            const newBasket=[...state.cart];

            if(index>=0){
                newBasket.splice(index, 1);
            };
            return{
                ...state, 
                cart: newBasket,
            };
        default:
            return state;
    }
}

export default reducer;