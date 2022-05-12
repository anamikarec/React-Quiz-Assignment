import React,{useState} from 'react';
import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import StarFillIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarBorder';
import BorderLinearProgress from '@mui/material/LinearProgress'
import './DisplayQuestions.css';


const useStyles = makeStyles({
  root: {
    width: 700,
    minHeight:350,
    maxHeight:400,
    textAlign:'left',
    padding:50
  },
  question:{
    color:'black',
    fontSize: '1.5rem',
  },

  progressRoot: {
    height: 10,
    borderRadius: 20,

  },
  bar: {
    height: 16,
    borderRadius: 20,
  },
});

export default function QuestionPanel({question, nextQuestion, total, questionNo, progress, checkUserAnswer,maxScore, score}) {
  const [answered,setAnswered] = useState('');
  const [message,setMessage]=useState(''); 
  
  const handleAnswer = (ans) =>{
    setAnswered(ans);
    checkUserAnswer(ans);
    if(decodeURIComponent(question['correct_answer'])===ans){
      setMessage('Correct!')
    }
    else{
      setMessage('Sorry!')
    }

  }

  function difficultyLevelChecker(){
    if(question['difficulty'] === 'hard'){
      return (
        <>
       <StarFillIcon/>
       <StarFillIcon/>
       <StarFillIcon/>
       </>
      )
    }
    else if (question['difficulty'] === 'medium'){
      return (
        <>
       <StarFillIcon/>
       <StarFillIcon/>
       <StarOutlineIcon/>
       </>
      )
    }
    else if (question['difficulty'] === 'easy'){
      return (
        <>
       <StarFillIcon/>
       <StarOutlineIcon/>
       <StarOutlineIcon/>
       </>
      )
    } 
    else {
      return (
        <>
       <StarOutlineIcon/>
       <StarOutlineIcon/>
       <StarOutlineIcon/>
       </>
      )
    } 
   }
  const classes = useStyles();
  return (<>
        <div className={classes.progressRoot}>

          <BorderLinearProgress
              className={classes.bar}
              variant="determinate"
              color="secondary"
              value={progress}
            />
        </div>

        <Card className={classes.root}>
          <CardActionArea>  
            <CardContent>
              <Typography variant="h5" component="h4">
                Question {questionNo} of {total}
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                {decodeURIComponent(question.category)}
              </Typography>
              { difficultyLevelChecker()}
              <Divider/>
              <Typography  variant="body2" color="textSecondary" component="p" className={classes.question}>
                {decodeURIComponent(question['question'])}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            { question['incorrect_answers'].map(key =>
                <Button variant={answered === decodeURIComponent(key)? "contained" :"outlined"} 
                        color="primary" key={decodeURIComponent(key)} 
                        onClick={()=>handleAnswer(decodeURIComponent(key))}
                        disabled={answered!==''?true : false}
                >
                        {decodeURIComponent(key)}
                </Button>
              )
            }
            <Button variant={answered === decodeURIComponent(question['correct_answer'])? "contained" :"outlined"} 
                    color="primary" key={decodeURIComponent(question['correct_answer'])} 
                    onClick={()=>handleAnswer(decodeURIComponent(question['correct_answer']))}
                    disabled={answered!==''?true : false}
            >
                  {decodeURIComponent(question['correct_answer'])}
            </Button>
          </CardActions>
          <Typography variant="h5" component="h3" className="message">
              {answered && message}
          </Typography>
            
          {answered!=='' && progress !==100? 
            <Button variant="contained" 
              className="next-button" 
              color="secondary" key="next" onClick={()=>{nextQuestion(); setAnswered('');}} 
              >
                Next Question
          </Button>
          
          : ''}
            

        </Card>
        <div className="score-wrapper">
          <p>Score: {score} %</p>
          <p>MaxScore: {maxScore} %</p> 
        </div>


        <div className={classes.progressRoot} id="progress">
          <BorderLinearProgress
              className={classes.bar}
              variant="determinate"
              color="secondary"
              value={score}
            />
        </div>
    </>
  );
}