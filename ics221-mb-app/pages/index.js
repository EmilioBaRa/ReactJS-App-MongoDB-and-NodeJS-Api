import Header from '../components/Header';
import Footer from '../components/Footer';
import MessageManager from '../components/MessageManager';

import { Container, Row, Col } from 'react-bootstrap';

import axios from 'axios';

export async function getStaticProps() { 
 
  let jsonData; 
 
  try { 
    //const { data } = await axios.get('http://localhost:3004/api/messages'); 
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_HOST}/api/messages`);
    jsonData = data; 
  } catch (error) { 
    console.log('API Error: ' + error); 
  } 
  return { 
    props: { 
      jsonData 
    } 
  } 
} 

export default function App({jsonData}) {


  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Header />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={8}>
          <MessageManager jsonData={jsonData}/>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Footer />
        </Col>
      </Row>
    </Container>
  )
}
