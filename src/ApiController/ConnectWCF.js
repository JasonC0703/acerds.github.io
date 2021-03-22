import React, { useState, useEffect } from 'react'
import ReactDom from 'react-dom'
import webSocket from 'socket.io-client'


export default function ConnectWCF () {
    const [ws,setWs] = useState(null)

    const connectWebSocket = () => {
        //開啟
        setWs(webSocket('http://localhost:8080'))
    }

    useEffect(()=>{
        if(ws){
            //連線成功在 console 中打印訊息
            console.log('success connect!')
            //設定監聽
            initWebSocket()
        }
    },[ws])

    const initWebSocket = () => {
        //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
        ws.on('getMessage', message => {
            console.log(message)
        })
    }


    return(
        <div>
            <input type='button' value='連線' onClick={connectWebSocket} />
        </div>
    )
}
