'use client'
import "../styles/card.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";
import Nav from "../components/nav"

export default function Card() {
  // const location = useLocation()
  let price = 0
  let ls: string | null = localStorage.getItem("bike")
  if(ls) {
    price = JSON.parse(ls).priceRange
  }

  const [user, setUser] = useState<null | {imgUrl: string}>(null);
  const [displayConfimation, setDisplayConfimation] = useState(false);
  const [cal, setCal] = useState(new Date().toLocaleDateString());

  useEffect(() => {
    populateUser();
  }, []);

  const populateUser = async () => {
    let responce = await axios.get("http://localhost:3001/user");
    let user = responce.data;
    setUser(user);
  };

  function changeCal(val: any) {
    setCal(val.target.value);
  }

  function handleRefill() {
    console.log("refill")
  }

  function handleDisplayConfimation() {
    setDisplayConfimation(!displayConfimation)
    window.location.assign("http://localhost:3000/account")
  }

  return (
    <div className="main-card-conatiner">
      {displayConfimation ? (
        <div className="confirmaion-container center">
          <img src="/Bike 1.jpg" alt="sorry :("/>
          <div className="confirmation-box">
            <span onClick={() => handleDisplayConfimation()}>x</span>
            <p>Yore bike is now booked!</p>
          </div>
        </div>
      ):null}
      <div className="card-header">
        <div className="card-inner-header">
          <span>Payment</span>
          <div>{user && <img src={user.imgUrl} alt="profile" />}</div>
        </div>
        <div className="dummy-card-img-container center">
          <img src="/BikeCard.png" alt="sorry :(" />
        </div>
      </div>
      <div className="refill-button-container">
        <Button type={"primary"} text={"Refill"} color={"black"} handleClick={() => handleRefill()} />
      </div>
      <div className="card-bottom-container">
        <span className="card-cal-title">Choose a date</span>
        <div className="card-calender-container">
          <input type="date" onChange={changeCal} />
          <span>Rent untill: {cal}</span>
        </div>
        <div className="card-price-container">
          <span>Total</span>
          <span>{price}</span>
        </div>
        <div className="card-buttons-container">
          <div className="card-button-container">
            <Button type={"primary"} text={"Cancel"} color={"white"} handleClick={() => window.location.assign("http://localhost:3000/bikes")} />
          </div>          
          <div className="card-button-container">
            <Button type={"primary"} text={"pay"} color={"black"} handleClick={() => setDisplayConfimation(!displayConfimation)} />
          </div>          
        </div>
      </div>
      <Nav/>
    </div>
  );
}

