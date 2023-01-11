import React, { useContext, useState } from 'react';
import 'animate.css';
import { useEffect } from 'react';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom'


const TaskTracker = () => {
    const location = useLocation()
    const { fajrAthan, shuruq, dhurAthan, asrAthan, changeableMaghribAthan, ishaAthan } = location.state
    const [countDownTimerFast, setCountDownTimerFast] = useState('')
    const [untilFast, setUntilFast] = useState()
    const [countDownTimer, setCountDownTimer] = useState('')
    const [until, setUntil] = useState()

    let fajr = moment(fajrAthan + ':00 AM', 'HH:mm:ss a')
    let dhuhr = moment(dhurAthan + ':00 PM', 'HH:mm:ss a')
    let asr = moment(asrAthan + ':00 PM', 'HH:mm:ss a')
    let maghrib = moment(changeableMaghribAthan + ':00 PM', 'HH:mm:ss a')
    let isha = moment(ishaAthan + ':00 PM', 'HH:mm:ss a')
    let currentTime = moment()

    const [task1, setTask1] = useState(false)
    const [task2, setTask2] = useState(false)
    const [task3, setTask3] = useState(false)
    const [task4, setTask4] = useState(false)
    const [task5, setTask5] = useState(false)
    const [task6, setTask6] = useState(false)
    const [task7, setTask7] = useState(false)
    const [task8, setTask8] = useState(false)

    useEffect(() => {
        const countDown = setInterval(() => {

            if (moment().isBefore(fajr)) {
                var duration = moment.duration(fajr.diff(moment(currentTime, 'HH:mm:ss a')))
                var hours = parseInt(duration.asHours());
                var minutes = parseInt(duration.asMinutes()) % 60;
                var seconds = parseInt(duration.asSeconds()) % 60;
                var difference = '-' + hours + ':' + minutes + ':' + seconds
                setCountDownTimerFast(difference)
                setUntilFast('الفجر')
            } else if (moment().isBefore(maghrib) && moment().isAfter(fajr)) {
                var duration = moment.duration(maghrib.diff(moment(currentTime, 'HH:mm:ss a')))
                var hours = parseInt(duration.asHours());
                var minutes = parseInt(duration.asMinutes()) % 60;
                var seconds = parseInt(duration.asSeconds()) % 60;
                var difference = '-' + hours + ':' + minutes + ':' + seconds
                setCountDownTimerFast(difference)
                setUntilFast('المغرب')
            }
        }, 1000)
        return () => {
            clearInterval(countDown)
        }
    }, [countDownTimerFast])

    useEffect(() => {
        const countDown = setInterval(() => {

            if (moment().isBefore(fajr)) {
                var duration = moment.duration(fajr.diff(moment(currentTime, 'HH:mm:ss a')))
                var hours = parseInt(duration.asHours());
                var minutes = parseInt(duration.asMinutes()) % 60;
                var seconds = parseInt(duration.asSeconds()) % 60;
                var difference = '-' + hours + ':' + minutes + ':' + seconds
                setCountDownTimer(difference)
                setUntil('الفجر')
            }
            if (moment().isBefore(dhuhr) && moment().isAfter(fajr)) {
                var duration = moment.duration(dhuhr.diff(moment(currentTime, 'HH:mm:ss a')))
                var hours = parseInt(duration.asHours());
                var minutes = parseInt(duration.asMinutes()) % 60;
                var seconds = parseInt(duration.asSeconds()) % 60;
                var difference = '-' + hours + ':' + minutes + ':' + seconds
                setCountDownTimer(difference)
                setUntil('الظهر')
            } else if (moment().isBefore(asr) && moment().isAfter(dhuhr)) {
                var duration = moment.duration(asr.diff(moment(currentTime, 'HH:mm:ss a')))
                var hours = parseInt(duration.asHours());
                var minutes = parseInt(duration.asMinutes()) % 60;
                var seconds = parseInt(duration.asSeconds()) % 60;
                setCountDownTimer(difference = '-' + hours + ':' + minutes + ':' + seconds)
                setUntil('العصر')
            } else if (moment().isBefore(maghrib) && moment().isAfter(asr)) {
                var duration = moment.duration(maghrib.diff(moment(currentTime, 'HH:mm:ss a')))
                var hours = parseInt(duration.asHours());
                var minutes = parseInt(duration.asMinutes()) % 60;
                var seconds = parseInt(duration.asSeconds()) % 60;
                var difference = '-' + hours + ':' + minutes + ':' + seconds
                setCountDownTimer(difference)
                setUntil('المغرب')
            } else if (moment().isBefore(isha) && moment().isAfter(maghrib)) {
                var duration = moment.duration(isha.diff(moment(currentTime, 'HH:mm:ss a')))
                var hours = parseInt(duration.asHours());
                var minutes = parseInt(duration.asMinutes()) % 60;
                var seconds = parseInt(duration.asSeconds()) % 60;
                var difference = '-' + hours + ':' + minutes + ':' + seconds
                setCountDownTimer(difference)
                setUntil('العشاء')
            } else if (moment().isAfter(isha)) {
                setCountDownTimer('')
                setUntil('')
            }
        }, 1000)
        return () => {
            clearInterval(countDown)
        }
    }, [countDownTimer])



    useEffect(() => {
        const task1Done = JSON.parse(localStorage.getItem('task1'));
        if (task1Done !== null) {
            setTask1(task1Done);
        }
        const task2Done = JSON.parse(localStorage.getItem('task2'));
        if (task2Done !== null) {
            setTask2(task2Done);
        }
        const task3Done = JSON.parse(localStorage.getItem('task3'));
        if (task3Done !== null) {
            setTask3(task3Done);
        }
        const task4Done = JSON.parse(localStorage.getItem('task4'));
        if (task4Done !== null) {
            setTask4(task4Done);
        }
        const task5Done = JSON.parse(localStorage.getItem('task5'));
        if (task5Done !== null) {
            setTask5(task5Done);
        }
        const task6Done = JSON.parse(localStorage.getItem('task6'));
        if (task6Done !== null) {
            setTask6(task6Done);
        }
        const task7Done = JSON.parse(localStorage.getItem('task7'));
        if (task7Done !== null) {
            setTask7(task7Done);
        }
        const task8Done = JSON.parse(localStorage.getItem('task8'));
        if (task8Done !== null) {
            setTask8(task8Done);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('task1', task1);
        localStorage.setItem('task2', task2);
        localStorage.setItem('task3', task3);
        localStorage.setItem('task4', task4);
        localStorage.setItem('task5', task5);
        localStorage.setItem('task6', task6);
        localStorage.setItem('task7', task7);
        localStorage.setItem('task8', task8);
    }, [task1, task2, task3, task4, task5, task6, task7, task8])
    return (
        <>
            <div>
                <div>{countDownTimer} until {until}</div>
                <div>{countDownTimerFast} until {untilFast}</div>
            </div>

            <div>
                Today's Tasks:
                <div>Morning Adhkar <input type="checkbox" checked={task1} onClick={() => { setTask1(!task1) }} /></div>
                <div>Evening Adhkar <input type="checkbox" checked={task2} onClick={() => { setTask2(!task2) }} /></div>
                <div>Istighfar at least 100 times <input type="checkbox" checked={task3} onClick={() => { setTask3(!task3) }} /></div>
                <div>Remember to say Alhamdulilah <input type="checkbox" checked={task4} onClick={() => { setTask4(!task4) }} /></div>
                <div>Give Charity <input type="checkbox" checked={task5} onClick={() => { setTask5(!task5) }} /></div>
                <div>A random act of kindness <input type="checkbox" checked={task6} onClick={() => { setTask6(!task6) }} /></div>
                <div>Recite Qur'an <input type="checkbox" checked={task7} onClick={() => { setTask7(!task7) }} /></div>
                <div>Adkhar before sleeping <input type="checkbox" checked={task8} onClick={() => { setTask1(!task8) }} /></div>
            </div>

            <div>
                <a href="https://quran.com/en"><button>Read/Listen to Quran</button></a>
                <Link><button>Recite your Daily Adhkar</button></Link>
                <Link to={{ pathname: "/dhikrCounter", state: { fajrAthan, shuruq, dhurAthan, asrAthan, changeableMaghribAthan, ishaAthan } }}><button>Dhikr Counter</button></Link>
                <Link to={{ pathname: "/taskTracker", state: { fajrAthan, shuruq, dhurAthan, asrAthan, changeableMaghribAthan, ishaAthan } }}><button>Daily Ramadan Tasks</button></Link>
            </div>


        </>

    );
}
export default TaskTracker;





