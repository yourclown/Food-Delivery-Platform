import React, { createContext, useContext, useReducer, useState } from 'react'

const CartStateContext = createContext();
const CartDispatcheContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, qty: action.qty, size: action.size }];
        case "REMOVE":
            return state.filter((_, index) => index !== action.index);
        case "UPDATE":
            return state.map((food, index) => {
                if (food.id === action.id) {
                    return { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price };
                }
                return food;
            });
        case "DROP":
            return [];
        default:
            console.log("Error in Reducer");
            return state;
    }
};

export const CartProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, []);


    return (
        <CartDispatcheContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}

            </CartStateContext.Provider>
        </CartDispatcheContext.Provider>



    )
}
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatcheContext);

