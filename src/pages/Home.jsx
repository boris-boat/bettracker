import React, { useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useLoginUserMutation, useAddEventMutation } from "../store/betUserApi";
import { useSelector } from "react-redux";
import "./Home.styles.css";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  const { register, handleSubmit, watch } = useForm();
  const [addEvent, result] = useAddEventMutation();
  const [login, response] = useLoginUserMutation();
  const onSubmit = (data) => {
    addEvent(data);
  };
  useEffect(() => {
    login({ username: "Noske" }).unwrap();
  }, []);

  return (
    <Container>
      <Row>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex justify-content-center"
        >
          <input placeholder="match" {...register("match")} />
          <input placeholder="event" {...register("event")} />
          <input placeholder="odds" {...register("odds")} />
          <input placeholder="time" {...register("time")} />
          <input type="submit" />
        </form>
      </Row>
      <Row>
        <Col>
          <table className="table">
            <thead>
              <tr>
                {/* <th scope="col">#</th> */}
                <th scope="col">Match</th>
                <th scope="col">Event</th>
                <th scope="col">Odds</th>
                <th scope="col">Time</th>
                <th scope="col">Slip</th>
              </tr>
            </thead>
            <tbody>
              {user &&
                user.events.map((event) => {
                  return (
                    <tr>
                      <td>{event.match}</td>
                      <td>{event.event}</td>
                      <td>{event.odds}</td>
                      <td>{event.time}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Col>
        <Col className="overflow-auto">
          {user?.slips.map((slip) => {
            return (
              <div className="slip" key={slip._id}>
                {slip.title}
              </div>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
