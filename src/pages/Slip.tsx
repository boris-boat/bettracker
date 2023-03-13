import React from "react";
import { SlipProps } from "../models/interfaces";
import { Accordion } from "react-bootstrap";
import { Card, Col, Container, Form, Row } from "react-bootstrap";
import {
  useDeleteItemMutation,
  useEditSlipMutation,
} from "../store/betUserApi";
import "./Slip.styles.css";

const SingleSlip = (props: any) => {
  const [deleteItem] = useDeleteItemMutation();
  const [editSlip] = useEditSlipMutation();
  const handleEditSlip = (slipId: any, eventId: any) => {
    editSlip({ slipId, eventId });
  };
  const totalOdds = () => {
    let total = props.data.events.reduce((acc: any, curr: any) => {
      return acc * curr.odds;
    }, 1);
    return total;
  };
  return (
    <Accordion defaultActiveKey="1" className="w-75 mt-5">
      <Accordion.Item eventKey="0">
        <Accordion.Header>{props.data.title}</Accordion.Header>
        <Accordion.Body>
          <Row className="flex-column">
            {props.data.events.map((event: any) => {
              return (
                <Col className="slip-data mb-3 w-75">
                  <div>{event.match}</div>
                  <div>{event.event}</div>
                  <div>{event.odds}</div>
                  <div>{event.time}</div>
                  <div>{props.updateResult(event._id)}</div>
                  <div
                    onClick={() => handleEditSlip(props.data._id, event._id)}
                  >
                    remove event
                  </div>
                </Col>
              );
            })}
          </Row>
          <Row>
            {props.data.events.length > 0 ? (
              <div>
                <h6>Total odds : {totalOdds().toFixed(2)}</h6>
              </div>
            ) : null}
          </Row>
          <Row className="d-flex justify-content-end pe-5">
            <Col sm={1}>
              <button
                onClick={() =>
                  deleteItem({ itemId: props.data._id, type: "slip" })
                }
              >
                Delete
              </button>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

export default SingleSlip;
