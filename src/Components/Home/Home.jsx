import React, {useEffect, useState} from 'react';
import data from '../data/questions.json';
import QuestionPanel from '../DisplayQuestions/DisplayQuestions';

const Home = () => {
  const [state,setState] = useState({ 
        questions : data,
        current_question:null,
        current_question_no : 1,
        total_question_no:data.length,
        progress:5,
        score:0,
        maxScore:0,
        currectAnswered:0,
        wrongAnswered:0,
 })

      useEffect(()=>{
        setState((prevState) => ({...prevState,current_question:state.questions[0]}))
      },[]);

     const nextQuestion = () =>{
        let current = state.current_question_no+1;
        if(current <= state.total_question_no){
            setState((prevState) => ({...prevState,current_question_no:current}))
            setState((prevState) => ({...prevState,current_question:state.questions[current-1]}))
            setState((prevState) => ({...prevState,progress:(current/state.total_question_no)* 100}));
        }
     }
     const checkUserAnswer = (userAns) =>{
        const {current_question,current_question_no ,currectAnswered,wrongAnswered , total_question_no} = state;
        if(decodeURIComponent(current_question['correct_answer'])===userAns){
            setState((prevState) => ({...prevState,currectAnswered:currectAnswered+1}));

            const _score =(((currectAnswered +1) / (current_question_no)) * 100).toFixed(2);
            setState((prevState) => ({...prevState,score:_score}));
        }
        else{
            setState((prevState) => ({...prevState,wrongAnswered:wrongAnswered+1}));

            const _score =(((currectAnswered) / (current_question_no)) * 100).toFixed(2);
            setState((prevState) => ({...prevState,score:_score}));
        }

        let _maxScore = (((current_question_no) / (total_question_no)) * 100).toFixed(2);
        setState((prevState) => ({...prevState,maxScore:_maxScore}))

        
     }
        return (

            <div className="question-panel-wrapper">
                {state.current_question !== null?
                    <QuestionPanel
                        question={state.current_question}
                        nextQuestion={nextQuestion}
                        total={state.total_question_no}
                        questionNo={state.current_question_no}
                        progress={state.progress}
                        checkUserAnswer={checkUserAnswer}
                        maxScore={state.maxScore}
                        score={state.score}
                    />
                :""
                }
                
            </div>
          );
    }
 
export default Home;
