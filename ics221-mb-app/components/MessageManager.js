import NewMessageForm from "./NewMessageForm";
import MessageListTable from "./MessageListTable";
import { useState, useRef } from 'react';
import axios from 'axios';
import LoginForm from "./LoginForm";
import jwt_decode from 'jwt-decode';

const MessageManager = ({jsonData}) =>{
    const usernameRef = useRef(null);
    const [messages, setMessages] = useState(jsonData);
    const [userAuth, setUserAuth] = useState(false);

    //function called by Formik to pass data from the Form
    const addNewMessage = async (values) => {
        values.name = usernameRef.current;
        //values.id = messages.length;
        //console.log(values);
        //messages.unshift(values);
        const axiosReqConfig = {
            url: `${process.env.NEXT_PUBLIC_HOST}/api/messages`,
            method: 'post',
            headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}`
            },
            data: values
        }
        try{
            //const { data } =  await axios.post('http://10.21.75.20:3004/api/messages', values);
            //const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/messages`, values);
            const { data } = await axios(axiosReqConfig);
            setMessages([data, ...messages]);
        }catch(err){
            console.log('API Error: ' + err); 
        }
        
        console.log(messages);
    }

    const logInUser = async (values) => {
        
        try{
            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_HOST}/api/login`, values);
            setUserAuth(true);
            const decodedToken = jwt_decode(data.token);
            usernameRef.current = decodedToken.username;
            sessionStorage.setItem('token', data.token);
        }catch(err){
            console.log('API Error: ' + err); 
        }
        }

    return (
        <>
            {userAuth ? 
                  <NewMessageForm addNewMessage={addNewMessage}/>
                : <LoginForm logInUser={logInUser}/>}
            <MessageListTable messages={messages}/>
        </>
    );
}

export default MessageManager;