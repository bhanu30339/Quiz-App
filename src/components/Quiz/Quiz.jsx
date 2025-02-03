import React, { useRef, useState } from "react";

import {data} from '../../Assets/data';
import "./Quiz.css"
const Quiz = () =>{
    var [index,setindex] = useState(0); 
    let [question,setquestion] = useState(data[index])
    let [Lock,setLock] = useState(false)
    let [score,setscore] = useState(0)
    let [result,setResult] = useState(false)
    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);
    let option_array = [Option1,Option2,Option3,Option4]
    const checkAns =(e,ans) => {
        if(Lock === false){
            if(question.ans===ans){
                e.target.classList.add("correct");
                setLock(true);
                setscore(prev=>prev+1)
            }
            else{
                e.target.classList.add("wrong");
                setLock(true);
            }
        }
        
    }
    const reset = () =>{
        setindex(0);
        setquestion(data[index]);
        setscore(0);
        setLock(false);
        setResult(false);
    }
    const Next = ()=>{
        if(Lock === true){
            if(index === data.length-1){
                setResult(true);
                return 0;
            }
            setindex(++index);
            setquestion(data[index]);
            setLock(false);
            option_array.map((option)=>{
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            })
        }
    }
    return(
        
        <div className="Container">
           <h1>Quiz App</h1> 
           <hr/>
           {result? <></>:<>
            <h2>{index+1}. {question.question}</h2>
           <ul>
            <li ref={Option1} onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
            <li ref={Option2} onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
            <li ref={Option3} onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
            <li ref={Option4} onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
           </ul>
           <button onClick={Next}>Next</button>
           <div className="index" >{index+1} of {data.length} questions</div>
           </>}
           {result?<>
            <h2>You Scored {score} out of {data.length} </h2>
            <button onClick={reset}>Reset</button>
           </>:<></>} 
        </div>
    )
}
export default Quiz;