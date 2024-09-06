import { createContext, useState } from "react";





 export let counterContext = createContext(0);

  export default function CounterContextProvider({children}){

    let [counter,setcounter]=useState(10)
    let[username,setusername]=useState('slo');
     return <counterContext.Provider value={{counter}}>
        {children}
    </counterContext.Provider>
 }