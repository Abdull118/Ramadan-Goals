import React, { useContext, useState } from 'react';
import 'animate.css';
import { useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

const Main = () => {

    useEffect(() => {
        // On page load, check the value of `isTrue` in local storage
        const userCity = JSON.parse(localStorage.getItem('city'));
        if (userCity !== null) {
            setCity(userCity);
        }

        const userCountry = JSON.parse(localStorage.getItem('country'));
        if (userCountry !== null) {
            setCountry(userCountry);
        }

    }, []);

    const [fajrAthan, setFajrAthan] = useState()
    const [dhurAthan, setDhurAthan] = useState()
    const [asrAthan, setAsrAthan] = useState()
    const [maghribAthan, setMaghribAthan] = useState()
    const [changeableMaghribAthan, setChangeableMaghribAthan] = useState()
    const [ishaAthan, setIshaAthan] = useState()
    const [shuruq, setShuruq] = useState()
    const [currentHijriDay, setCurrentHijriDay] = useState()
    const [currentHijriMonth, setCurrentHijriMonth] = useState()
    const [currentHijriYear, setCurrentHijriYear] = useState()
    const [currentDate, setCurrentDate] = useState()
    const [currentCustomDate, setCurrentCustomDate] = useState()
    const [countDownTimerFast, setCountDownTimerFast] = useState()
    const [untilFast, setUntilFast] = useState()
    const [countDownTimer, setCountDownTimer] = useState()
    const [until, setUntil] = useState()
    const [city, setCity] = useState()
    const [country, setCountry] = useState()
    const [fajrPrayed, setFajrPrayed] = useState(false)
    const [shuruqPrayed, setShuruqPrayed] = useState(false)
    const [dhuhrPrayed, setDhuhrPrayed] = useState(false)
    const [asrPrayed, setAsrPrayed] = useState(false)
    const [maghribPrayed, setMaghribPrayed] = useState(false)
    const [ishaPrayed, setIshaPrayed] = useState(false)

    useEffect(() => {
        const fajrPrayed = JSON.parse(localStorage.getItem('fajrPrayed'));
        if (fajrPrayed !== null) {
            setFajrPrayed(fajrPrayed);
        }
        const shuruqPrayed = JSON.parse(localStorage.getItem('shuruqPrayed'));
        if (shuruqPrayed !== null) {
            setShuruqPrayed(shuruqPrayed);
        }
        const dhuhrPrayed = JSON.parse(localStorage.getItem('dhuhrPrayed'));
        if (dhuhrPrayed !== null) {
            setDhuhrPrayed(dhuhrPrayed);
        }
        const asrPrayed = JSON.parse(localStorage.getItem('asrPrayed'));
        if (asrPrayed !== null) {
            setAsrPrayed(asrPrayed);
        }
        const maghribPrayed = JSON.parse(localStorage.getItem('maghribPrayed'));
        if (maghribPrayed !== null) {
            setMaghribPrayed(maghribPrayed);
        }
        const ishaPrayed = JSON.parse(localStorage.getItem('ishaPrayed'));
        if (ishaPrayed !== null) {
            setIshaPrayed(ishaPrayed);
        }

    }, [])

    useEffect(() => {
        localStorage.setItem('fajrPrayed', fajrPrayed);
        localStorage.setItem('shuruqPrayed', shuruqPrayed);
        localStorage.setItem('dhuhrPrayed', dhuhrPrayed);
        localStorage.setItem('asrPrayed', asrPrayed);
        localStorage.setItem('maghribPrayed', maghribPrayed);
        localStorage.setItem('ishaPrayed', ishaPrayed);
    }, [fajrPrayed, shuruqPrayed, dhuhrPrayed, asrPrayed, maghribPrayed, ishaPrayed])


    const getAthan = async () => {
        try {
            const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`);
            const json = await response.json();
            setFajrAthan(convertTo12Hour(json.data.timings.Fajr))
            setDhurAthan(convertTo12Hour(json.data.timings.Dhuhr))
            setAsrAthan(convertTo12Hour(json.data.timings.Asr))
            setMaghribAthan(convertTo12Hour(json.data.timings.Maghrib))
            setChangeableMaghribAthan(json.data.timings.Maghrib)
            setIshaAthan(convertTo12Hour(json.data.timings.Isha))
            convertTo12Hour2(json.data.timings.Sunrise)
        } catch (error) {
            console.log(error);
        }
    }

    const getDate = () => {
        var today = new Date(),
            date = (today.getMonth() + 1) + '-' + today.getDate() + '-' + today.getFullYear();
        setCurrentCustomDate(date)
        setCurrentDate(date)
    };

    const getHijriDate = async () => {
        try {
            const response = await fetch(`https://api.aladhan.com/v1/gToH?=${currentDate}`);
            const json = await response.json();
            setCurrentHijriDay(json.data.hijri.day)
            setCurrentHijriMonth(json.data.hijri.month.ar)
            setCurrentHijriYear(json.data.hijri.year)
        } catch (error) {
            console.log(error)
        }
    }

    function convertTo12Hour(oldFormatTime) {
        console.log("oldFormatTime: " + oldFormatTime);
        var oldFormatTimeArray = oldFormatTime.split(":");

        var HH = parseInt(oldFormatTimeArray[0]);
        var min = oldFormatTimeArray[1];

        var AMPM = HH >= 12 ? "PM" : "AM";
        var hours;
        if (HH == 0) {
            hours = HH + 12;
        } else if (HH > 12) {
            hours = HH - 12;
        } else {
            hours = HH;
        }
        var newFormatTime = hours + ":" + min + " " + AMPM;
        return newFormatTime
    }

    function convertTo12Hour2(oldFormatTime) {

        var oldFormatTimeArray = oldFormatTime.split(":");

        var HH = parseInt(oldFormatTimeArray[0]);
        var min = oldFormatTimeArray[1];

        var AMPM = HH >= 12 ? "PM" : "AM";
        var hours;
        if (HH == 0) {
            hours = HH + 12;
        } else if (HH > 12) {
            hours = HH - 12;
        } else {
            hours = HH;
        }
        var newFormatTime = hours + ":" + min + " " + AMPM;
        setShuruq(newFormatTime)
    }

    useEffect(() => {
        getDate()
        getHijriDate()
        getAthan()
    }, []);


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

            } else if (moment().isAfter(fajr)) {
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

    return (
        <>
            <div className='backgroundMain'>
                <div>
                    <div>Fajr: {fajrAthan} <input type="checkbox" checked={fajrPrayed} onClick={() => { setFajrPrayed(!fajrPrayed) }} /></div>
                    <div>Shuruq: {shuruq} <input type="checkbox" checked={shuruqPrayed} onClick={() => { setShuruqPrayed(!shuruqPrayed) }} /></div>
                    <div>Dhuhr: {dhurAthan} <input type="checkbox" checked={dhuhrPrayed} onClick={() => { setDhuhrPrayed(!dhuhrPrayed) }} /></div>
                    <div>Asr: {asrAthan} <input type="checkbox" checked={asrPrayed} onClick={() => { setAsrPrayed(!asrPrayed) }} /></div>
                    <div>Maghrib: {maghribAthan} <input type="checkbox" checked={maghribPrayed} onClick={() => { setMaghribPrayed(!maghribPrayed) }} /></div>
                    <div>Isha: {ishaAthan} <input type="checkbox" checked={ishaPrayed} onClick={() => { setIshaPrayed(!ishaPrayed) }} /></div>
                </div>

                <div>{countDownTimer} until {until}</div>
            </div>



            <div>
                <div>{currentHijriDay} {currentHijriMonth}</div> <div> {currentHijriYear}H</div>
            </div>

            <div style={{ color: 'red' }}>{countDownTimerFast} until {untilFast}</div>

            <div>
                <a href="https://quran.com/en"><button>Read/Listen to Quran</button></a>

                <Link to={{ pathname: "/dhikrCounter", state: { fajrAthan, shuruq, dhurAthan, asrAthan, changeableMaghribAthan, ishaAthan } }}><button>Dhikr Counter</button></Link>
                <Link to={{ pathname: "/taskTracker", state: { fajrAthan, shuruq, dhurAthan, asrAthan, changeableMaghribAthan, ishaAthan } }}><button>Daily Ramadan Tasks</button></Link>
            </div>
        </>
    )
};

export default Main;





