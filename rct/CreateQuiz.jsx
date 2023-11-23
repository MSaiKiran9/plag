import React, { useState } from 'react';
import {
  VStack,
  Box,
  Button,
  Input,
  Text,
  HStack,
  Select,
  Spacer,
  Center,
  IconButton,
  useToast
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';
import { motion, AnimatePresence } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { db } from '../utils/firebaseUtils';
import { collection, addDoc} from 'firebase/firestore';
import { Spinner } from '@chakra-ui/react';

const CreateQuiz = () => {
  const [show,setShow]=useState(false);
  const [questions, setQuestions] = useState([
    {id:uuidv4(), question: '', options: ['', '', '', ''], correctOption: '1' },
  ]);
  const [quizName,setQuizName] = useState('')
  const [loading,setLoading] = useState(false);
  const toast = useToast();

  const checkLastQuizItemIsValied =()=>{
    let isvalied=true;
    const prevQuestion =  questions[questions?.length-1];

    if(questions.length===0) {
      setQuestions([
        {id:uuidv4(),quizName, question: '', options: ['', '', '', ''], correctOption: '' },
      ]); 
      return;
    };

    if(prevQuestion?.question===""){
      toast({
        title: 'Question is empty',
        description: "Add the current question !",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });      
      isvalied=false;
    }
    for (let [index, element] of prevQuestion?.options?.entries()) {
      if (element === "") {
        toast({
          title: 'Option is empty',
          description: `option ${index+1} is empty`,
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
        isvalied=false;
      }
    }
    return isvalied;
  }

  const handleAddQuestion = () => {

   if (!checkLastQuizItemIsValied()){
return;
   }
    setQuestions([
      ...questions,
      {id:uuidv4(), question: '', options: ['', '', '', ''], correctOption: '1' },
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectOptionChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctOption = value;
    setQuestions(updatedQuestions);
  };

  const handleCreateQuiz = async (questions) => {
    if (quizName==="") {
      toast({
        title: 'Quiz name is empty !',
        description: 'Quiz name can\'t be empty',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    if(questions.length===0){
  toast({
    title: 'No questions',
    description: "Add some questions !",
    status: 'error',
    duration: 2000,
    isClosable: true,
    });     
    return;
    }
    if(!checkLastQuizItemIsValied()){
return;
    }
    try{
      const quizCollection = collection(db,'mcq-arrays');
      const questionsToDb = [...questions];
      questionsToDb[questionsToDb.length]=quizName;
      console.log(questionsToDb);
      setLoading(true);
     await addDoc(quizCollection,{
      createdquiz:{questionsToDb}
     });
    toast({
      title: 'Success',
      description: 'Your quiz has been added successfully',
      status: 'success',
      duration: 2000,
      isClosable: true,
    })
     setQuizName("");
     setQuestions([
      {id:uuidv4(), question: '', options: ['', '', '', ''], correctOption: '1' },
    ]);
    }
    catch(error){
      console.log("error"+error);
      toast({
        title: 'Failure',
        description: 'There is some error adding your question!',
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
    }
    finally{
      setLoading(false);
    }
  };

  const handleShowOrHideCreateQuiz=()=>{
setShow(!show);
  }

  const handleRemoveQuestion=(id)=>{
    const updatedQuestions = questions.filter(questions=>questions.id!=id);
    setQuestions(updatedQuestions);
  }

  const handleQuizIdentifierChange=(value)=>{
setQuizName(value);
  }

  return (<>
  <Box border={show && '2px solid #ADD8E6'} borderRadius={show && '2rem'} m={3}>
  <Center>
  <Button colorScheme='teal' mb={2} mt={2} onClick={handleShowOrHideCreateQuiz}>
        Create Quiz 
        </Button>
  </Center>
  {show && <VStack  mt={3} spacing={4} align="center" width="80%" m="auto">
      <AnimatePresence>
      <Input value={quizName} onChange={(e) => handleQuizIdentifierChange(e.target.value)}
       placeholder={`Give some name for your quiz! `}
                mb={2}
              />
        {questions.map((question, questionIndex) => (
          <motion.div
            key={question.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            width="100%"
          >
            <Box textAlign="right">
      <IconButton
        aria-label="Delete"
        icon={<CloseIcon />}
        onClick={()=>handleRemoveQuestion(question.id)}
      />
             </Box>
            <Box p={4} borderWidth="1px" borderRadius="md" width="100%">
              <Input
                value={question.question}
                onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                placeholder={`Enter question ${questionIndex + 1}`}
                mb={2}
              />

              {question.options.map((option, optionIndex) => (
    
                <Input
                  key={optionIndex}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(questionIndex, optionIndex, e.target.value)
                  }
                  placeholder={`Option ${optionIndex + 1}`}
                  mb={2}
                />
           ))}
              <HStack spacing={2}>
                <Text>Select Correct Option:</Text>
                <Select
                  value={question.correctOption}
                  onChange={(e) => handleCorrectOptionChange(questionIndex, e.target.value)}
                  width="30%"
                >
                  {[1, 2, 3, 4].map((optionIndex) => (
                    <option key={optionIndex} value={optionIndex}>
                      {`Option ${optionIndex}`}
                    </option>
                  ))}
                </Select>
                <Spacer />
              </HStack>
            </Box>
          </motion.div>
        ))}
      </AnimatePresence>
    
      <Button onClick={()=>handleAddQuestion()} colorScheme='orange' variant='outline'>
        Add Question
      </Button>

      {loading?<Spinner mb={3}/>:<Button mb={3} onClick={()=>handleCreateQuiz(questions)} colorScheme="purple" mt={1}>
        Finish setting up
      </Button>}
    </VStack>}
  </Box>
  </>
  );
};

export default CreateQuiz;
