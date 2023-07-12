import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const MyToken = ({ tokens }) => {
  return (
    <Container className="mt-3">
      <Card>
        <Card.Body>
          <Row>
            <Col className="text-center">
              <strong>My Tokens:</strong> {tokens}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MyToken;
