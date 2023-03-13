import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  useLoginUserMutation,
  useAddEventMutation,
  useAddSlipMutation,
  useEditSlipMutation,
  useDeleteItemMutation,
  useAddToSlipMutation,
  useEditEventMutation,
  useGetFilteredDataMutation,
} from "../store/betUserApi";
import { useSelector } from "react-redux";
import SingleSlip from "./Slip";
import resultOptions from "../extras/resultOptions";
import "./Home.styles.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar, utils } from "react-modern-calendar-datepicker";
const Home = () => {
  const user = useSelector((state) => state.user.user);
  const { register, handleSubmit, reset } = useForm();
  const {
    register: register1,
    handleSubmit: handleSubmit1,
    reset: reset1,
  } = useForm();
  const [getFilteredDataFromDb, { isLoading }] = useGetFilteredDataMutation();
  const [addEvent] = useAddEventMutation();
  const [login] = useLoginUserMutation();
  const [addSlip] = useAddSlipMutation();
  const [addToSlip] = useAddToSlipMutation();
  const [deleteItem] = useDeleteItemMutation();
  const [editEvent] = useEditEventMutation();
  const [date, setDate] = useState(utils().getToday());

  const onAddEvent = async (data) => {
    data.result = "open";
    data.date = date;
    let result = await addEvent(data);
    if (result) getFilteredDataFromDb({ date });
    reset();
  };
  const onAddSlip = (data) => {
    data.date = date;
    data.events = [];
    addSlip(data);
    reset1();
  };
  const handleAddEventToSlip = (slipToFocus, event) => {
    let data = { slipToFocus, event };
    addToSlip(data);
  };
  const inSlip = (currEvent) => {
    let slips = "";
    user.slips.forEach((slip) =>
      slip.events.forEach((event) => {
        if (event._id === currEvent._id) slips += ` ${slip.title},`;
      })
    );
    return slips;
  };
  const handleDelete = (itemId, type) => {
    deleteItem({ itemId, type }).then(() => getFilteredDataFromDb({ date }));
  };
  const handleEditEvent = (event, value) => {
    let editedEvent = { ...event };
    editedEvent.result = value;
    editEvent({ editedEvent });
  };
  const updateResult = (id) => {
    let result = "";
    for (let event of user.events) {
      if (event._id === id) result = event.result;
    }
    return result;
  };
  const handleDateChange = (e) => {
    setDate(e);
    getFilteredDataFromDb({ date: e });
  };
  const transformDate = ({ day, month, year }) => {
    return { day, month, year };
  };
  useEffect(() => {
    login({ username: "Noske" }).then(() =>
      getFilteredDataFromDb({ date: transformDate(utils("en").getToday()) })
    );
  }, []);

  useEffect(() => {
    getFilteredDataFromDb({ date });
  }, [date]);

  return (
    <Container fluid className="main-wrapper">
      <Row className="w-100 h-75 d-flex justify-content-center align-items-center">
        <Col className="col-lg-6 h-100">
          <Row>
            <Row className="w-100 h-75 d-flex justify-content-center align-items-center">
              <Col className="col-6">
                <Calendar
                  value={date}
                  onChange={handleDateChange}
                  shouldHighlightWeekends
                  locale="en"
                />
              </Col>
            </Row>
            <form
              key={1}
              onSubmit={handleSubmit(onAddEvent)}
              className="d-flex justify-content-center"
            >
              <input
                placeholder="match"
                {...register("match", { required: true })}
              />
              <input
                placeholder="event"
                {...register("event", { required: true })}
              />
              <input
                placeholder="odds"
                {...register("odds", { required: true })}
              />
              <input
                placeholder="time"
                {...register("time", { required: true })}
              />
              <input type="submit" value="Add Event" />
            </form>
          </Row>
          {isLoading && <div className="loader"></div>}
          {(user?.events?.length > 0) & !isLoading ? (
            <Row className="mt-5">
              <table className="table ">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Match</th>
                    <th scope="col">Event</th>
                    <th scope="col">Odds</th>
                    <th scope="col">Time</th>
                    <th scope="col">Slip</th>
                    <th scope="col">Result</th>
                    <th scope="col">In Slips</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody className="table-hover">
                  {user.events.length > 0 &&
                    user.events.map((event) => {
                      return (
                        <tr>
                          <td>{event.match}</td>
                          <td>{event.event}</td>
                          <td>{event.odds}</td>
                          <td>{event.time}</td>
                          <td>
                            <Form.Select
                              aria-label="Default select example"
                              onChange={(e) =>
                                handleAddEventToSlip(e.target.value, event)
                              }
                            >
                              <option value={"none"}>None</option>
                              {user?.slips.map((slip) => {
                                return (
                                  <option value={slip._id}>{slip.title}</option>
                                );
                              })}
                            </Form.Select>
                          </td>
                          <td>
                            <Form.Select
                              onChange={(e) =>
                                handleEditEvent(event, e.target.value)
                              }
                              defaultValue={event.result}
                            >
                              {resultOptions.map((option) => {
                                return <option value={option}>{option}</option>;
                              })}
                            </Form.Select>
                          </td>
                          <td>{inSlip(event)}</td>
                          <td>
                            <button>Edit</button>{" "}
                            <button
                              onClick={() => handleDelete(event._id, "event")}
                            >
                              Delete
                            </button>{" "}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </Row>
          ) : null}
        </Col>
        <Col className="overflow-auto h-75 d-flex align-items-center flex-column">
          <form key={2} onSubmit={handleSubmit1(onAddSlip)}>
            <input
              placeholder="Slip Title"
              {...register1("title", { required: true })}
            />

            <button>Add slip</button>
          </form>
          {user?.slips?.length === 0 ? (
            <h3 className="text-center mt-5">No slips yet,add some</h3>
          ) : null}
          {user?.slips?.map((slip) => {
            return (
              <SingleSlip data={slip} updateResult={updateResult}></SingleSlip>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
