import React, { useContext, useState } from 'react';
import 'animate.css';
import { useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom'
import './dhikrCounter.css'
import { Motion, spring } from 'react-motion';

const DhikrCounter = () => {
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

    const [count, setCount] = useState(0);
    const [beadsPos, setBeadsPos] = useState(Array.from({ length: 33 }, (_, i) => ({ x: 0, y: 0 })));
    const radius = 120;

    const incrementCount = () => {
        setCount(count + 1);
        const angle = (count / 33) * 2 * Math.PI;
        setBeadsPos(
            beadsPos.map((pos, i) => {
                return {
                    x: radius * Math.cos(angle + i * 2 * Math.PI / 33),
                    y: radius * Math.sin(angle + i * 2 * Math.PI / 33)
                };
            })
        );
    };

    return (
        <div>
            <div className='title'>
                <div>Welcome to the Dhikr Counter</div>
                <div>May Allah SWT accept you adkhar</div>
                <div>
                    <div>{countDownTimer} until {until}</div>
                    <div>{countDownTimerFast} until {untilFast}</div>
                </div>
            </div>
            <div className="tasbih-container">
                <div>
                    <button onClick={incrementCount} className='tasbihButton'>{count}</button>
                    <div className="select-container">
                        <select onClick={() => setCount(0)} className='select'>
                            <option>سبحان الله</option>
                            <option>الحمد لله</option>
                            <option>الله أكبر</option>
                            <option>أستغفر الله</option>
                            <option>أستغفر الله وأتوبو الإله</option>
                        </select>
                    </div></div>
                {beadsPos.map((pos, i) => (
                    <Motion key={i} defaultStyle={pos} style={{ x: spring(pos.x), y: spring(pos.y) }}>
                        {({ x, y }) => (
                            <div
                                className="bead"
                                style={{
                                    transform: `translate(${x}px, ${y}px)`,
                                    backgroundColor: (i === count % 33) ? 'red' : '#FFC107'
                                }}
                            />
                        )}
                    </Motion>
                ))}
            </div>

            <div>

            </div>
        </div >
    );
}
export default DhikrCounter;





