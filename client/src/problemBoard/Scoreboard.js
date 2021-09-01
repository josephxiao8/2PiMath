import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Scoreboard = (props) => {
  const [scoreboard, setScoreBoard] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/users/scoreboard`)
      .then((res) => {
        setScoreBoard(res.data.userFound);
        // console.log("rerender-scoreboard");
      });
  }, [props.show]);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable="true"
    >
      <Modal.Header>Scoreboard</Modal.Header>
      <Modal.Body>
        {scoreboard.map(({ username, submissions, solved }) => {
          if (solved === true) {
            return (
              <div className="flex my-2">
                <div className="mr-10">{username}</div>
                <div className="text-green-500">AC</div>
              </div>
            );
          } else if (submissions && submissions.length === 0) {
            return (
              <div className="flex my-2">
                <div className="mr-10">{username}</div>
                <div className="text-gray-500">--</div>
              </div>
            );
          } else {
            return (
              <div className="flex my-2">
                <div className="mr-10">{username}</div>
                <div className="text-red-500">WA</div>
              </div>
            );
          }
        })}
      </Modal.Body>
    </Modal>
  );
};

export default Scoreboard;
