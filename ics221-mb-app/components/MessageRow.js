const MessageRow = ({id, name, msgText, msgNum}) => (
    <tr>
        <td>{msgNum}</td>
        <td>{name}</td>
        <td>{msgText}</td>
    </tr>
    );
    
    export default MessageRow;