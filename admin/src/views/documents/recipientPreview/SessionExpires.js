import React from 'react';
import { Container } from 'reactstrap';

export default function SessionExpires() {
  return (
    <Container fluid className="text-center">
      <h4>Your session is expired.</h4>
      <p>Please open the link from your email again!</p>
    </Container>
  );
}
