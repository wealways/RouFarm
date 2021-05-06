import React,{createContext,useState} from 'react';



const FailListContext = createContext({
  failList:{date:''},
  dateDispatch: () => {},
});


const FailListProvider = ({children}) => {

  const nowdate = new Date()
  const nowyear = nowdate.getFullYear()
  let nowmonth = nowdate.getMonth() + 1
  nowmonth = nowmonth >= 10 ? nowmonth : '0'+nowmonth;
  let nowday = nowdate.getDate()
  nowday = nowday >= 10 ? nowday : '0'+nowday;
  const [date, setDate] = useState(`${nowyear}-${nowmonth}-${nowday}`);
  
  const value = {
    failList:{date},
    dateDispatch:setDate,
  };

  return (
    <FailListContext.Provider value={value}>{children}</FailListContext.Provider>
  );
};

const FailListConsumer = FailListContext.Consumer;

export {FailListProvider,FailListConsumer};
export default FailListContext;