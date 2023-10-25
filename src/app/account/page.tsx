'use client'
import { useState, useEffect } from "react";
import Icons from "../components/Icons";
import "../styles/account.css";
import axios from "axios"
import User from "./userInterface"
import Button from "../components/Button"
import Nav from "../components/nav"

export default function Account() {
  const [displayGifts, setDisplayGifts] = useState(false);
  const [user, setUser] = useState<null | {
    id: number,
    userName: string,
    password: string,
    email: string,
    favoritBike: number,
    imgUrl: string,
    money: number,
    points: number,
    kilometers: number,
    rides: number,
    carbon: number,
  }>(null)

  const backupImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjH9ymD5drOzVeQ9qNi-AKLnf_HO6NCG8jyQ&usqp=CAU"

  useEffect(() => {
    populateUser()
  }, [])

  const populateUser = async () => {
    let responce = await axios.get("http://localhost:3001/user");
    let user: User = responce.data;
    setUser(user);
  };

  function handleExploreGift() {
    console.log("handleExploreGift")
    // setDisplayGifts(!displayGifts);
  }

  const circleImg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_P2155vWFW_GvoIDyogabAwkcs7N1suKA0g&usqp=CAU";

  const giftsList = ["Package", "Backpack", "Tour1", "Tour2", "Tour3"];

  return (
    <div className="main-account-conatiner">
      {displayGifts && (
        <div className="main-gifts-display-container">
          <div className="gifts-circle-container">
            <div style={{ height: '200px', width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img src={circleImg} alt="circle" style={{ maxHeight: '100%', maxWidth: '100%' }} />
            </div>
          </div>
          <button className="open-gift-button">Open up a gift</button>
          <div className="gifts-list-container">
            <span>Available Gifts</span>
            <div className="gifts-list">
              {giftsList.map((el) => {
                return (
                  <div className="gift-container">
                    <span>{el}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {user &&
        <div className="account-header-stats-container">
          <div className="account-header-conatiner">
            <span>Hi, {user.userName}!</span>
            <div className="account-header-img-conatiner">
              <img
                src={user ? user.imgUrl : backupImg}
                alt="profile"
              />
            </div>
          </div>

          <div className="account-stats-container">
            <div className="account-outer-stat-container">
              <div className="account-stats-icon-container">
                <Icons type={"map"} color={"black"} />
              </div>
              <div className="account-inner-stat-container">
                <span>{user.kilometers}</span>
                <p>km</p>
              </div>
            </div>
            <div className="account-outer-stat-container">
              <div className="account-stats-icon-container">
                <Icons type={"bike"} color={"black"} />
              </div>
              <div className="account-inner-stat-container">
                <span>{user.rides}</span>
                <p>rides</p>
              </div>
            </div>
            <div className="account-outer-stat-container">
              <div className="account-stats-icon-container">
                <Icons type={"star"} color={"black"} />
              </div>
              <div className="account-inner-stat-container">
                <span>{user.carbon}</span>
                <p>carbon</p>
              </div>
            </div>
          </div>
        </div>}

      <div className="explore-button">
        <Button type={"primary"} color={"primary"} text={"Explore gifts"} handleClick={() => handleExploreGift()} />
      </div>
      <div className="account-activity-container">
        <span>Activity</span>
        <div className="account-activity-diagram-container">
          <div className="account-activity-hrv">
            <span>HVR</span>
            <div className="account-activity-hrv-img">
              <img src="/wout 1.png" alt="" />
            </div>
          </div>
          <div className="account-activity-rhr">
            <span>Resting HR</span>
            <div className="account-activity-rhr-img">
              <img src="/HR 1.png" alt="" />
            </div>
          </div>
        </div>
      </div>
      <Nav />
    </div>
  );
}
