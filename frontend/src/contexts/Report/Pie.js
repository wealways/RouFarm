import React,{createContext,useState} from 'react';



const PieContext = createContext({
  Pie:{click:''},
  clickDispatch: () => {},
});


const PieProvider = ({children}) => {
  const [click,setClick] = useState('')
  

  const value = {
    Pie:{click},
    clickDispatch:setClick,
  };


  return (
    <PieContext.Provider value={value}>{children}</PieContext.Provider>
  );
};

const PieConsumer = PieContext.Consumer;

export {PieProvider,PieConsumer};
export default PieContext;