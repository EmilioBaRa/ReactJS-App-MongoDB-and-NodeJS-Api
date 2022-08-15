import MessageRow from '../components/MessageRow';
import Table from 'react-bootstrap/Table';

const MessageListTable = ({messages}) =>{
    //const { Table } = ReactBootstrap;

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Message</th>
                </tr>
            </thead>
            <tbody>
                {messages.map( (message, index) =>
                    <MessageRow key={message.id} {...message} msgNum={index + 1}/>
                )}
            </tbody>
        </Table>
    );
}

export default MessageListTable;