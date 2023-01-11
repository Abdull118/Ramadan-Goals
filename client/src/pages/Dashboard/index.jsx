import React, { useContext, useState } from 'react';
import './dashboard.css'
import 'animate.css';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {

  const [classes1, setClasses1] = useState("animate__animated animate__fadeIn delay-1")
  const [classes2, setClasses2] = useState("animate__animated animate__fadeIn delay-2")
  const [classes3, setClasses3] = useState("animate__animated animate__fadeIn delay-3")
  const [classes4, setClasses4] = useState("animate__animated animate__fadeIn delay-4")
  const [city, setCity] = useState()
  const [country, setCountry] = useState()

  const [localStorageCity, setLocalStorageCity] = useState()

  const handleSubmit = (e) => {
    e.prevent.Default()

  }

  const handleClick = () => {
    localStorage.setItem('city', JSON.stringify(city));
    localStorage.setItem('country', JSON.stringify(country));
  }

  useEffect(() => {
    setTimeout(() => {
      setClasses1("animate__animated animate__fadeOut delay-1")
    }, 5000);
    setTimeout(() => {
      setClasses2("animate__animated animate__fadeOut delay-1")
    }, 11000);
    setTimeout(() => {
      setClasses3("animate__animated animate__fadeOut delay-1")
    }, 16000);

    const userCity = JSON.parse(localStorage.getItem('city'));
    if (userCity !== null) {
      setCity(userCity);
      setLocalStorageCity(userCity)
    }

    const userCountry = JSON.parse(localStorage.getItem('country'));
    if (userCountry !== null) {
      setCountry(userCountry);
    }
  })

  return (
    <div className='backgroundMain'>
      <div id="delayedText1" class={classes1} >Assalaamalikum!</div>
      <div id="delayedText1" class={classes2} >Welcome to Ramadan Goals!</div>


      {!localStorageCity ? <><div id="delayedText1" class={classes3} >Before we get started</div>
        <form id="delayedText1" class={classes4} >


          <div>Please tell us your location</div>
          <input type='text' placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} />
          <input type='text' placeholder='Country' value={country} onChange={(e) => setCountry(e.target.value)} />


        </form>
        <Link to="/main">
          <div class="animate__animated animate__fadeIn delay-05" onClick={handleClick}>Let's Go!</div>
        </Link></> : <Link to="/main" class="animate__animated animate__fadeIn delay-3">Let's Continue</Link>}




    </div>
  )
};

export default Dashboard;
