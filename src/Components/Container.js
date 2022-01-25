import { Container, Flex, Heading, List, Stack, ListItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import Batch from "./Batch";
import NewStudent from "./NewStudent";
import axios from "axios";

function AppContainer() {
  const [newStudent, setNewStudent] = useState([]);

  const [batch, setBatch] = useState([]);


  useEffect(() => {
    axios.get("http://localhost:4000/student/showall")
    .then(res => {
      setNewStudent(res.data.data)
      console.log(newStudent)
    })
    .catch(err =>{
      console.log(err)
    })

    axios.get("http://localhost:4000/batch/showall")
    .then(res => {
      setBatch(res.data.data)
      console.log(batch)
    })
    .catch(err =>{
      console.log(err)
    })

  }, []);



//   console.log(isOver);
//   const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
//     accept: "team",
//     collect: (monitor) => ({ isOver: !!monitor.isOver() }),
//   });

  const moveStudentToBatch = (item) => {
    console.log(item);
    const newtype = "student"
    axios.put("http://localhost:4000/updatestudent/" + item._id, {
        newtype
    })
    .then(response => {
        console.log(response.data)
    })
    .catch(error => console.log(error))
    
    setNewStudent((prev) => prev.filter((_, i) => item.index !== i));
    setBatch((prev) => [...prev, item]);
  };
//   const removePlayerFromTeam = (item) => {
//     setTeam((prev) => prev.filter((_, i) => item.index !== i));
//     setPlayer((prev) => [...prev, item]);
//   };

  return (
    <Container maxW="800px">
      <Heading p="2" align="center" color="GrayText">
        Student Details
      </Heading>

      <Flex justify="space-between" height="90vh" align="center">
        <Stack width="300px">
          <Heading fontSize="3xl" color="yellow.800" textAlign="center">
            NEW STUDENT
          </Heading>
          <List
            p="4"
            minH="70vh"
            background="#f1df92"
            boxShadow="xl"
            borderRadius="md"
          >
            {newStudent.filter((student)=>{
        if (student.type==="newstudent")
        return student
      }).map((ns, i) => (
              <NewStudent
                item={ns}
                key={i}
                Type="newstudent"
                onDrop={moveStudentToBatch}
                index={i}
              />
            ))}
          </List>
        </Stack>
        <Container
        width="300px"
        minH="70vh"
        boxShadow="xl"
        background="#468499"
        borderRadius="md"
        >
          <Heading fontSize="3xl" color="teal.800" textAlign="center">
            BATCH
          </Heading>
          <Stack>
          {batch.map((b, i) => (
                <Stack
                background="azure"
                p="2"
                borderRadius="md"
                boxShadow="md"
                color={"red"}
                key={b._id}
                mb="2"
                index={i}
                height="200px"
                textAlign="center"
              >
                <Batch
                item={b}
                key={i}
                Type="batch"
                index={i}
              />                  
                  {/* {b.student.map(id =>(
                    <h1 key={id._id}>{id.studentID}</h1>
                    ))} */}
              </Stack>
            ))}
          </Stack>
            
        </Container>
      </Flex>
    </Container>
  );
}

export default AppContainer;
