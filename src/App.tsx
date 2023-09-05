import { useState, useEffect } from "react";
import Confetti from 'react-confetti'
import useWindowSize from 'react-use/lib/useWindowSize' 
import { fillReels } from "./utils/fillReels";
import { isWin } from "./utils/isWin";

const symbols = ['🍇', '🍆', '🍎', '🥝', '🍓', '🍒', '🍑', '🫐', '🌶'];


function App() {
  const [slotMachine, setSlotMachine]= useState<string[][] | null>(null)
  const [credit, setCredit]= useState(100)
  const [amount, setAmount]= useState<number>(1)
  const { width, height } = useWindowSize()
  const [run, setRun] = useState(false)
  useEffect(() => { 
    setSlotMachine(()=>fillReels(symbols))
  }, [])

  //handle spin
  function onSpin(e:React.FormEvent<HTMLButtonElement>){
    e.preventDefault()
    //if do credit toastify credit is done
    const creditBalance= credit-amount;
    if(creditBalance<0){
     //toastify
      
     return;
    }
    //randomize the slot machine
    setSlotMachine(()=>fillReels(symbols))
    setCredit(()=>creditBalance)
  }
  
  function decreaseAmount(e:React.FormEvent<HTMLButtonElement>){
    e.preventDefault()
    if(amount===0) return;
    setAmount(prev=>{
      const newAmount =prev-1;
      return newAmount;
    })
  }

  function increaseAmount(e:React.FormEvent<HTMLButtonElement>){
    e.preventDefault()
    if(amount>credit) return;
    setAmount(prev=>{
      const newAmount =prev+1;
      return newAmount;
    })
  } 

  function handleWin(){
    if(!slotMachine) return;
    const passed = isWin(slotMachine as string[][])
    console.log(slotMachine, passed,credit)
    if(!passed) return;
    setRun(()=>true)
    const winAmount= amount*2;
    setCredit(prevCredit=>prevCredit+winAmount) 
    setTimeout(()=>{
      setRun(()=>false) 
    },5000)
  }

  useEffect(()=>{
    handleWin()
},[slotMachine]) 


  if(!slotMachine){
    return <>
    <h4>loading...</h4>
    </>
  }

  return (
     <main className="flex items-center justify-center w-screen h-screen text-purple-950 ">
       
       {/* shot card */}
        <div className="p-1 my-2 rounded-sm shadow-1">
           {/* credit section */}
          <div className="flex justify-between">
          <h4>Credit:</h4>
          <span>{credit}</span>  
          </div>    
        {/* slot machine section */}
         <div>
           {
            slotMachine.map((reel, id)=>(
              <div key={id} className="flex">
                     {
                      reel.map((row, idx)=>(
                        <div key={idx} className="flex items-center justify-center w-12 h-12 border">
                          {row}
                        </div>
                      ))
                     }
              </div>
            ))
           }
          </div>  
        {/* action buttons and stake */}
         <div className="flex items-center justify-between mt-2">
          {/* stake section */}
          <div className="flex items-center space-x-1 border border-purple-400 rounded-sm">
            <button onClick={decreaseAmount} >-</button>
            <span className="">{amount}</span>
            <button  onClick={increaseAmount}>+</button>
          </div>
          {/* spin button */}
          <button onClick={onSpin} disabled={(amount<=0 || amount >credit)}>Spin</button>
         </div>
        </div>
        {
          run?(<Confetti width={width} run={run} height={height}/>):null
        }
        
     </main>
  )
}

export default App
