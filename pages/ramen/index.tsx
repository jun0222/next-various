import type { NextPage } from 'next'
import { useEffect, useState } from 'react';

const Home: NextPage = () => {
    const [nowFullTime, setNowFullTime] = useState("")

    function zeroPadding(num: number,length: number){
        return ('0' + num).slice(-length);
    }

    async function showClock(){
        const nowTime = new Date();
        const nowHour = nowTime.getHours();
        const nowMin  = nowTime.getMinutes();
        const nowSec  = nowTime.getSeconds();
        const msg =  zeroPadding(nowHour, 2) + ":" + zeroPadding(nowMin, 2) + ":" + zeroPadding(nowSec, 2);
        setNowFullTime(msg);
    }

    useEffect(()=>{
        setInterval(()=>{
            showClock()
        },1000);
    },[]);
    
    
    // var array = []
    // function setTime(){
    //     let com = document.getElementById('comment-field').value;
    //     localStorage.setItem('comment', com)
    //     localStorage.setItem('time', document.getElementById('RealtimeClockArea').textContent)
    // };
    
    // function showTimes(){
    //     document.getElementById('show-comment-field').textContent = localStorage.getItem('comment');
    //     document.getElementById('show-time-field').textContent = localStorage.getItem('time');
    // };
    // setInterval('showTimes()',1000);
  return (
    <>
        <title>カップラーメンTimer</title>
        <div className="container">
        <div className="clock" id="RealtimeClockArea">{nowFullTime}</div>
        <div style={{textAlign: "center"}}>
            <input type="text" id="comment-field" value="調理開始" placeholder="コメントを入力してください"></input>
            <input type="button" value="ボタン"></input>
        </div>
            <div style={{textAlign: "center"}}>
                <span id="show-comment-field"></span>
                <span id="show-time-field"></span>
            </div>
        </div>
    </>
  )
}

export default Home