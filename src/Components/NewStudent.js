import { ListItem } from "@chakra-ui/react";
import axios from "axios";
import React from "react";
import { useDrag } from "react-dnd";

const NewStudent = ({ item, Type, onDrop, index }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: Type,
    item: () => ({ ...item, index }),
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
        // axios.put("http://localhost:4000/updatebatch/61ee779e8c6a32b59c24f75d",{
        //     student
        //   })
        //   .then(response => console.log(response.data))
        //   .catch(error => console.log(error))
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <ListItem
      p="2"
      borderRadius="md"
      boxShadow="md"
      mb="2"
      textAlign="center"
      ref={dragRef}
      bg={
        isDragging
          ? Type === "newstudent"
            ? "yellow.600"
            : "teal.400"
          : "white"
      }
      color={isDragging ? "white" : "black"}
    >
      {item.full_name}
    </ListItem>
  );
};

export default NewStudent;
