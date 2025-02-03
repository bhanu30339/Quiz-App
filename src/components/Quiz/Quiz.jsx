import React, { useRef, useState } from "react";

import {data} from '../../Assets/data';
import "./Quiz.css"
const Quiz = () =>{
    var [index,setindex] = useState(0); //used to get question numers with index
    let [question,setquestion] = useState(data[index]) //to get the question (data) form yhe data file
    let [Lock,setLock] = useState(false) //to select the options - can't select multiple options -- 
    //locked for selected option - without selecting any option it can't move to next question
    let [score,setscore] = useState(0)//to get score
    let [result,setResult] = useState(false)//to get result
    let Option1 = useRef(null);//to map and unmap while selected option is correct or wrong
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);
    let option_array = [Option1,Option2,Option3,Option4] // array options to map
    const checkAns =(e,ans) => { //to check selection opt in correct or wrong
        if(Lock === false){ //select single option
            if(question.ans===ans){ //if selected ans is correct
                e.target.classList.add("correct"); //tagets correct fun
                setLock(true); //locks the option multiple opt can't be selected
                setscore(prev=>prev+1) // increase score
            }
            else{
                e.target.classList.add("wrong"); //if selected opt is wrong targets worng fun
                setLock(true); //locks opt
            }
        }
        
    }
    const reset = () =>{ //reset fun
        setindex(0);//sets index 0
        setquestion(data[index]);//sets que index to 0
        setscore(0);// sets score to 0
        setLock(false);//resets lock
        setResult(false);//resets result
    }
    const Next = ()=>{ //nxt fuc
        if(Lock === true){ //if opt get selested then next button works
            if(index === data.length-1){ // condition to show the result pr calculate it
                setResult(true);
                return 0;
            }
            setindex(++index);//changes index +1
            setquestion(data[index]);//changes ques
            setLock(false);//changes for nxt ques to lock opt
            option_array.map((option)=>{ //maps that after clicking nxt that previous selected opt should leave
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