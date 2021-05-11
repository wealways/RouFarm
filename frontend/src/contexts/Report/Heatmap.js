import React,{createContext,useState} from 'react';



const HeatmapContext = createContext({
  heatmap:{date:'',rate:'',pieClick:''},
  dateDispatch: () => {},
  rateDispatch: () => {},
  pieClickDispatch: () => {},
});


const HeatmapProvider = ({children}) => {

  const nowdate = new Date()
  const nowyear = nowdate.getFullYear()
  let nowmonth = nowdate.getMonth() + 1
  nowmonth = nowmonth >= 10 ? nowmonth : '0'+nowmonth;
  const [date, setDate] = useState(`${nowyear}-${nowmonth}`);
  const [rate, setRate] = useState(0);
  const [pieClick,setpieClick] = useState('')
  

  const value = {
    heatmap:{date,rate,pieClick},
    dateDispatch:setDate,
    rateDispatch:setRate,
    pieClickDispatch:setpieClick,
  };


  return (
    <HeatmapContext.Provider value={value}>{children}</HeatmapContext.Provider>
  );
};

const HeatmapConsumer = HeatmapContext.Consumer;

export {HeatmapProvider,HeatmapConsumer};
export default HeatmapContext;