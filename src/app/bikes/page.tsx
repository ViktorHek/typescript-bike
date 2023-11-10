'use client'
import React, { useState, useEffect } from "react";
import "../styles/bike.css";
import Chip from "../components/Chip";
import Card from "../components/Card";
import BikePreView from "../components/BikePreView";
import axios from "axios";
import Bike from "./bikeInterface"
import Nav from '../components/nav'

export default function Bikes() {
  const [bikePreView, setBikePreView] = useState(null);
  const [bikes, setBikes] = useState<any[]>([]);
  const [allBikes, setAllBikes] = useState<any[]>([]);
  const [categorys, setCategorys] = useState<string[]>([]);
  const [filter, setFilter] = useState<string>("");

  const global = {
    testUser: {
      name: "Anna Andersson",
      kilometers: 1337,
      rides: 5,
      carbon: 80,
      favoritBike: 2,
      imgUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80"
    }
  }

  useEffect(() => {
    populateBikes();
  }, []);

  const populateBikes = async () => {
    let responce = await axios.get("http://localhost:3001/bikes/all");
    let bikes = responce.data;
    setAllBikes(bikes)
    console.log({allBikes})
    setBikes(bikes);
    let categorys = bikes.map((el: Bike) => {
      return el.category;
    });

    let uniqueCategorys = categorys.filter((value: string, index: number, array: [string]) => array.indexOf(value) === index);
    setCategorys(uniqueCategorys);
  };

  function handleCardClick(id: string) {
    let selectedBike = bikes.filter((el: Bike) => el.id === id);
    setBikePreView(selectedBike[0]);
  }

  function handlePreviewClick(bike: Bike) {
    setBikePreView(null);
    localStorage.setItem("bike", JSON.stringify(bike))
    window.location.assign("http://localhost:3000/card")
  }

  function handleChipClick(text: string) {
    if(filter === text) {
      setBikes(allBikes)
      setFilter("")
    } else {
      let bikes = allBikes.filter((el) => el.category === text)
      setBikes(bikes)
      setFilter(text)
    }
  }

  return (
    <div className="main-bike-container">
      {bikePreView ? <div className="bike-preview-exit-button" onClick={() => setBikePreView(null)}><span>X</span></div>:null}
      <div className="header-container">
        <div className="header-text-container">
          <p>Hello {localStorage.getItem("user") ? localStorage.getItem("user") : "Dear Customer"}</p>
          <h1>Choose your bike</h1>
        </div>
        <div className="header-img-container">
          <img src={global.testUser.imgUrl} alt="profilePic" />
        </div>
        <div className="type-selector-container">
          <div className="inner-type-selector-container">
            {categorys.length &&
              categorys.map((el: string, index: number) => {
                return <Chip text={el} key={index} handleClick={(text: string) => handleChipClick(text)} />;
              })}
          </div>
        </div>
      </div>
      <div className="bike-card-container">
        <div className="inner-bike-card-container">
          {bikes.length &&
            bikes.map((el: Bike, index: number) => {
              return <Card bike={el} key={index} handleClick={handleCardClick} />;
            })}
        </div>
      </div>
      {bikePreView ? <BikePreView bike={bikePreView} handleClick={handlePreviewClick} /> : null}
      <Nav/>
    </div>
  )
}
