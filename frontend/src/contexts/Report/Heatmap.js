import React,{createContext,useState} from 'react';

const HeatmapContext = createContext({
  heatmap:{date:'',weekDate:'',rate:'',pieClick:''},
  dateDispatch: () => {},
  weekDateDispatch: () => {},
  rateDispatch: () => {},
  pieClickDispatch: () => {},
});


const HeatmapProvider = ({children}) => {

  const nowdate = new Date()
  const nowyear = nowdate.getFullYear()
  let nowmonth = nowdate.getMonth() + 1
  nowmonth = nowmonth >= 10 ? nowmonth : '0'+nowmonth;
  const [date, setDate] = useState(`${nowyear}-${nowmonth}`);
  
  const standard =new Date(`${nowyear}-${nowmonth}`)
  const week = Math.ceil((nowdate.getDate()+standard.getDay()-1)/7)
  const [weekDate,setWeekDate] = useState(`${nowyear}-${nowmonth}-w${week}`);

  const [rate, setRate] = useState(0);
  const [pieClick,setpieClick] = useState('')
  

  const value = {
    heatmap:{date,weekDate,rate,pieClick},
    dateDispatch:setDate,
    weekDateDispatch:setWeekDate,
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