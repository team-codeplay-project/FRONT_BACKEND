import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const MyTicket = ({ tickets }) => {
  return (
    <Container className="mt-3">
      <Card>
        <Card.Body>
          <Row>
            <Col className="text-center">
              <strong>My Tickets:</strong> {tickets}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MyTicket;
