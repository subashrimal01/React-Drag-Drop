import './App.css';
import AppContainer from './Components/Container';
import { ChakraProvider } from "@chakra-ui/react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <ChakraProvider>
        <AppContainer />
      </ChakraProvider>
    </DndProvider>
  );
}

export default App;
