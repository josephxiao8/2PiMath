import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router";
import axios from "axios";

const Submissions = (props) => {
  const { username } = useParams();
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_KEY}/api/users/${username}`)
      .then((res) => {
        if (res.data.userFound.submissions.length !== 0) {
          setSubmissions(res.data.userFound.submissions);
        } else setSubmissions([]);
        // console.log("rerender-submissions");
      });
  }, [props.show]);

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>Past Submissions</Modal.Header>
      <Modal.Body>
        {submissions.map(({ query, verdict, index }) => {
          if (verdict === true) {
            return (
              <div key={index} className="flex my-2">
                <div className="mr-10">{query}</div>
                <div className="text-green-500">AC</div>
              </div>
            );
          } else {
            return (
              <div key={index} className="flex my-2">
                <div className="mr-10">{query}</div>
                <div className="text-red-500">WA</div>
              </div>
            );
          }
        })}
      </Modal.Body>
    </Modal>
  );
};

export default Submissions;
