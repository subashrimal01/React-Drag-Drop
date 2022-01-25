import axios from "axios";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#app");

const Window = ({ show, onClose, data }) => {

    const [batchData, setBatchData] = useState([])

    useEffect(() => {
    
        axios.get("http://localhost:4000/batch/showone/61ee779e8c6a32b59c24f75d")
        .then(res => {
          setBatchData(res.data.data)
          console.log(batchData)
        })
        .catch(err =>{
          console.log(err)
        })
    
      }, []);


    return (
        <Modal
            isOpen={show}
            onRequestClose={onClose}
            className={"modal"}
            overlayClassName={"overlay"}
        >
            <div className={"close-btn-ctn"}>
                <h1 style={{ flex: "1 90%" }}>{data.batchName}</h1>
                <button className="close-btn" onClick={onClose}>X</button>
            </div>
            <div>
                <h2>Student Details</h2>
                <div>
                {/* {batchData.map(batch =>(
                <div key={batch._id}>
                    <p>{batch.batchName}</p>
                    <div className="drop-target">
                    </div>
                    <div>{batch.student.map(id =>(
                    <li key={id._id}>{id.studentID}</li>
                ))}</div>
                </div>
                ))} */}
                </div>
                
            </div>
        </Modal>
    );
};

export default Window;