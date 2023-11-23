import React, { useState } from 'react';
import { Box, Button, RadioGroup, Stack, Radio, Heading,VStack } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter,useDisclosure } from '@chakra-ui/react';

//all quizes :
const CreateQuizDisplayer = ({ quizData }) => {
  return (
    <VStack spacing={8} wrap="wrap">
      {quizData.map((data, index) => (
        <QuizNames key={index} datatoDisplay={data} />
      ))}
    </VStack>
  );
};

//each quiz :
const QuizNames = ({ datatoDisplay }) => {
  const [popup, setPopup] = useState(false);
  const questionsArray = [...datatoDisplay].slice(0, datatoDisplay.length - 1);
  const quizTitle = datatoDisplay.slice(datatoDisplay.length - 1);
  const initialState = questionsArray.reduce((acc, quest) => ({...acc, [quest.id]: 1}), {});
  const [quizState, setQuizState] = useState(initialState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [result,setResult]=useState('');
  const handlePopup = () => {
    setPopup(!popup);
  };

  const handleQuizSubmit = () => {
    let correctCount = 0;
    questionsArray.forEach(question => {
      if (quizState[question.id] === +question.correctOption) {
        correctCount++;
      }
    });
    questionsArray.forEach(question => {
    });
    setResult(`Your result is ${(correctCount/questionsArray.length)*100}%`);
    onOpen();
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setQuizState(prevState => ({ ...prevState, [questionId]: selectedOption }));
  };

  return (
    <VStack p={5} shadow="md" borderWidth="1px" minW={'50vw'}>
      <Button onClick={handlePopup} color={'green.600'}>{quizTitle}</Button>
      {popup && (
        <VStack spacing={5} mt={5}>
          {questionsArray.map((item, index) => (
            <DisplayCards key={index} question={item.question} id={item.id} options={item.options} onOptionsChange={handleOptionChange}/>
          ))}
           <Button onClick={handleQuizSubmit} color={'blue.600'}>Submit Quiz</Button>
           <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
            <ModalHeader>Result</ModalHeader>
             <ModalCloseButton />
            <ModalBody>
               {result}
            </ModalBody>
            <ModalFooter>
          <Button onClick={onClose}>Close</Button>
          </ModalFooter>
          </ModalContent>
        </Modal>
        </VStack>
      )}
    </VStack>
  );
};



const DisplayCards = ({ question, id, options, onOptionsChange }) => {

  const [value, setValue] = useState(options[0]);
const dict=options.reduce((acc, quest,index) => ({...acc, [quest]: index+1}), {})
  const handleChange = (value) => {
    setValue(value);
    onOptionsChange(id, dict[value]);
  };

  return (
    <Box id={id} p={5} shadow="md" borderWidth="1px" minW={'80vw'}>
      <Heading size="md">{question}</Heading>
      <RadioGroup onChange={handleChange} value={value}>
        <Stack spacing={3} mt={3}>
          {options.map((option, index) => (
            <Radio key={index} value={option}>{option}</Radio>
          ))}
        </Stack>
      </RadioGroup>
    </Box>
  );
};


export default CreateQuizDisplayer;
