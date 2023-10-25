'use client'
import "../styles/components.css";
import Button from "./Button";
import Bike from "../bikes/bikeInterface"

interface props {
  bike: Bike
  handleClick: (bike: Bike) => void
}

export default function BikePreView(props: props) {
  const {bike, handleClick} = props
  const {
    availableForSale,
    category,
    description,
    id,
    imgUrl,
    priceRange,
    title,
    totalInventory,
    vendor,
  } = bike;

  function selectBike() {
    return handleClick(bike);
  }

  let km = Math.floor(Math.random() * 1000);
  let co = Math.floor(Math.random() * 100);
  let battery = Math.floor(Math.random() * 100);

  return (
    <div className="main-preview-container">
      <div className="inner-preview-container">
        <div className="preview-bike-img-container">
          <img src={imgUrl} alt="pic" />
          <div className="preview-bike-img-info-container">
            <div className="battery-container">
              <span style={{ height: `${battery}%` }} />
              <p>{battery}%</p>
              <p>Charge</p>
            </div>
            <div className="km-co-container">
              <div className="km-co-box">
                <div>
                  <span>Km</span>
                  <span>Driven</span>
                </div>
                <span>{km}</span>
              </div>
              <div className="km-co-box">
                <div>
                  <span>CO</span>
                  <span>Emission</span>
                </div>
                <span>{co}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="preview-data-container">
          <span>{title}</span>
          {/* <div className="preview-description-text-container">
            <p>{description}</p>
          </div> */}
          <div className="preview-button-container">
            <Button text={"Rent Now"} handleClick={selectBike} color="" type=""/>
          </div>
        </div>
      </div>
    </div>
  );
}
