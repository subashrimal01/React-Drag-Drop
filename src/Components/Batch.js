import { ListItem, Stack, useShortcut } from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "./Window";

const Batch = ({ item, Type, onDrop, index }) => {
    const ref = useRef(null);

    const [{ isOver }, addToBatchRef] = useDrop({
        accept: "newstudent",
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            console.log(dropResult)
      
            if (item && dropResult) {
              onDrop(item);
              console.log(item)
              const id = item._id
              const student=[{
                  "studentID": id
              }]
              axios.put("http://localhost:4000/updatebatch/" + item._id,{
                  student
                })
                .then(response => console.log(response.data))
                .catch(error => console.log(error))
            }
          },
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
      });

    const [show, setShow] = useState(false);

    const onOpen = () => setShow(true);

    const onClose = () => setShow(false);

  const [{ isDragging }, dragRef] = useDrag({
    type: Type,
    item: () => ({ ...item, index }),
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        onDrop(item);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });



  return (
    <Stack
      p="2"
      borderRadius="md"
      boxShadow="md"
      mb="2"
      height="100px"
      textAlign="center"
      onClick={onOpen}
      ref={dragRef}
      bg={
        isDragging
          ? Type === "batch"
            ? "yellow.600"
            : "teal.400"
          : "white"
      }
      color={isDragging ? "white" : "black"}
    >
      {item.batchName}
      <Window
        data={item}
        onClose={onClose}
        show={show}
        />
        <div className="droparea" ref={addToBatchRef} style={isOver
                ? "linear(to-b, teal.300, teal.500)"
                : "linear(to-b, teal.100, teal.200)",{background: "blue"}}>drop here</div>
    </Stack>
  );
};

export default Batch;
