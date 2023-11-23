import { Center,Button,Heading, VStack } from '@chakra-ui/react'
import { collection,doc,getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebaseUtils';
import CreateQuizDisplayer from './CreateQuizDisplayer';
const PlayQuiz = () => {
  const [show,setShow]=useState(false);
  const [quizContent,setQuizContent] = useState([]);
  const quizCollection = collection(db,'mcq-arrays');
  const handleDisplayComponent=()=>{
setShow(!show);
  }

  useEffect(()=>{
    const fetchData = async () => {
      try {
        const data = await getDocs(quizCollection);
        const questionsAnswers = data.docs.map(docs=>docs.data()['createdquiz']['questionsToDb']);
        setQuizContent(questionsAnswers);
      } catch (error) {
        console.log("error!" + error);
      }
    };
  
    fetchData();
  },[show]);

  return (
    <VStack>
    <Center>
      <Button mb={4} onClick={handleDisplayComponent} >
        PlayQuiz
      </Button>
    </Center>
    {
      show && <div>
         <center><Heading size="md" mb={3}>Select a Quiz</Heading></center>
        {
          
 quizContent&&<CreateQuizDisplayer quizData={quizContent}/>
        }
      </div>
    }
    </VStack>
  )
}

export default PlayQuiz