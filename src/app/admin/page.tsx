'use client'
import { useState, useEffect } from "react";
import Button from "../components/Button"
import Icons from "../components/Icons"
import Nav from "../components/nav"
import "../styles/admin.css"
import "../styles/account.css"
import "../styles/bike.css"
import Bike from "../bikes/bike"
import BikeInterface from "../bikes/bikeInterface"
import Card from "../components/Card";
import axios from "axios";

export default function Account() {
  const [add, setAdd] = useState(false)
  const [edit, setEdit] = useState(false)
  const [editBike, setEditBike] = useState(false)
  const [handle, setHandle] = useState("")
  const [productType, setProductType] = useState("")
  const [vendor, setVendor] = useState("")
  const [inventory, setInventory] = useState("0")
  const [available, setAvailable] = useState(true)
  const [price, setPrice] = useState("0")
  const [description, setDescription] = useState("")
  const [title, setTitle] = useState("")
  const imgUrl = "data:image/jpeg;base64,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"
  const [img, setImg] = useState("")
  const [category, setCategory] = useState("")
  const [bikes, setBikes] = useState([])

  let sales = 1337
  let rentedBikes = 5
  let users = 1704

  useEffect(() => {
    populateBikes();
  }, []);

  const populateBikes = async () => {
    let responce = await axios.get("http://localhost:3001/bikes/all");
    setBikes(responce.data)
  };

  const handleSubmit = async () => {
    if (!handle || !productType || !vendor || !inventory || !available || !price || !description || !title || !img || !category) {
      alert("something is missing")
      return
    }
    let payload = {
      handle: handle,
      productType: productType,
      created: "2022-10-08T19:53:43.831Z",
      createdAt: new Date(),
      vendor: vendor,
      updated: "2022-10-08T19:53:43.831Z",
      totalInventory: inventory,
      availableForSale: available,
      priceRange: price,
      description: description,
      id: JSON.stringify(Math.random()),
      title: title,
      imgUrl: img,
      category: category,
    }
    console.log({ payload })
    let responce = axios.post("http://localhost:3001/add", { payload })
    console.log({ responce })
  }

  function handleCardClick(val: any) {
    let bike: any = {}
    bikes.forEach((el: BikeInterface) => {
      if (el.id === val) bike = el
    })
    localStorage.setItem("bike", JSON.stringify(bike))
    setHandle(bike.handle)
    setProductType(bike.productType)
    setVendor(bike.vendor)
    setInventory(bike.inventory)
    setAvailable(bike.available)
    setPrice(bike.price)
    setDescription(bike.description)
    setTitle(bike.title)
    setImg(bike.imgUrl)
    setCategory(bike.category)
    console.log('card-click', bike)
    setEditBike(!editBike)

  }

  const handleEdit = async () => {
    let lsBike: any = localStorage.getItem("bike")
    console.log("lsBike: ", lsBike)
    if (lsBike) {
      lsBike = JSON.parse(lsBike)
    }
    let payload = {
      handle: handle,
      productType: productType,
      created: lsBike.created,
      createdAt: lsBike.createdAt,
      vendor: vendor,
      updated: new Date(),
      totalInventory: inventory,
      availableForSale: available,
      priceRange: price,
      description: description,
      id: lsBike.id,
      title: title,
      imgUrl: img,
      category: category,
    }
    console.log({ payload })
    let responce = axios.put("http://localhost:3001/edit", { payload })
    console.log({ responce })
    if (edit) setEdit(!edit)
    if (editBike) setEditBike(!editBike)
  }

  function handleInvantory(val: any) {
    console.log("eeee: ", val)
    // setInventory(JSON.parse(event.target.value) ? JSON.parse(event.target.value) : 1)
  }

  function handlePrice(val: any) {
    console.log("eeee: ", val)
    // setInventory(JSON.parse(event.target.value) ? JSON.parse(event.target.value) : 1)
  }

  const handleDelete = async () => {
    let lsBike: any = localStorage.getItem("bike")
    console.log("lsBike: ", lsBike)
    if (lsBike) {
      lsBike = JSON.parse(lsBike).id
    } else {
      alert("something wrong")
      return
    }
    let responce = axios.delete("http://localhost:3001/delete?id=" + lsBike)
    console.log({responce})
  }

  return (
    <div className="main-admin-conatiner">
      {add &&
        <div className="main-add-container">
          <div className="inner-add-container">
            <div className="add-list">
              <input type="text" name="handle" value={handle} placeholder="handle" onChange={(event) => setHandle(event.target.value)} />
              <input type="text" name="type" value={productType} placeholder="type" onChange={(event) => setProductType(event.target.value)} />
              <input type="text" name="vendor" value={vendor} placeholder="vendor" onChange={(event) => setVendor(event.target.value)} />
              <input type="number" name="inventory" value={inventory} placeholder="inventory" onChange={(event) => setInventory(event.target.value)} />
              {/* <input type="number" name="inventory" value={inventory === "0" ? "inventory" : inventory} placeholder="inventory" onChange={(event) => setInventory(event.target.value)} /> */}
              <div className="add-available-checkbox">
                <span>Available</span>
                <input type="checkbox" checked={available} name="available" onChange={() => setAvailable(!available)} />
              </div>
              <input type="number" name="price" value={price} placeholder="price" onChange={(event) => setPrice(event.target.value)} />
              <input type="text" name="description" value={description} placeholder="description" onChange={(event) => setDescription(event.target.value)} />
              <input type="text" name="title" value={title} placeholder="title" onChange={(event) => setTitle(event.target.value)} />
              <input type="text" name="category" value={category} placeholder="category" onChange={(event) => setCategory(event.target.value)} />
              <input type="text" name="img" value={img} placeholder="Img Url" onChange={(event) => setImg(event.target.value)} />
              <div className="add-button-container">
                <div>
                  <Button handleClick={() => setAdd(!add)} text="Cancle" type="primary" color="null" />
                </div>
                <div>
                  <Button handleClick={handleSubmit} text="Submit" type="primary" color="null" />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {edit &&
        <div className="main-edit-container">
          <span className="edit-cancle-button" onClick={() => setEdit(!edit)}>Cancle</span>
          <div className="bike-card-container" style={{ height: "80%" }}>
            <div className="inner-bike-card-container">
              {bikes.length &&
                bikes.map((el: Bike) => {
                  return <Card bike={el} key={el.id} handleClick={handleCardClick} />;
                })}
            </div>
          </div>
        </div>
      }
      {editBike &&
        <div className="main-edit-bike-container">
          <div className="inner-edit-bike-container">
            <div className="edit-bike-close-button" onClick={() => setEditBike(!editBike)}><span>X</span></div>
            <div className="add-list">
              <input type="text" name="handle" value={handle} placeholder="handle" onChange={(event) => setHandle(event.target.value)} />
              <input type="text" name="type" value={productType} placeholder="type" onChange={(event) => setProductType(event.target.value)} />
              <input type="text" name="vendor" value={vendor} placeholder="vendor" onChange={(event) => setVendor(event.target.value)} />
              <input type="number" name="inventory" value={inventory} placeholder="inventory" onChange={(event) => setInventory(event.target.value)} />
              <div className="add-available-checkbox">
                <span>Available</span>
                <input type="checkbox" checked={available} name="available" onChange={() => setAvailable(!available)} />
              </div>
              <input type="number" name="price" value={price} placeholder="price" onChange={(event) => setPrice(event.target.value)} />
              <input type="text" name="description" value={description} placeholder="description" onChange={(event) => setDescription(event.target.value)} />
              <input type="text" name="title" value={title} placeholder="title" onChange={(event) => setTitle(event.target.value)} />
              <input type="text" name="category" value={category} placeholder="category" onChange={(event) => setCategory(event.target.value)} />
              <input type="text" name="img" value={img} placeholder="Img Url" onChange={(event) => setImg(event.target.value)} />
              <div className="add-button-container">
                <div>
                  <Button handleClick={handleDelete} text="Delete" type="primary" color="null" />
                </div>
                <div>
                  <Button handleClick={handleEdit} text="Submit" type="primary" color="null" />
                </div>
              </div>
            </div>
          </div>
        </div>}
      <div className="account-header-stats-container">
        <div className="account-header-conatiner">
          <span>Admin Page</span>
          <div className="account-header-img-conatiner">
            <img
              src={imgUrl}
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
              <span>{sales}</span>
              <p>Sales</p>
            </div>
          </div>
          <div className="account-outer-stat-container">
            <div className="account-stats-icon-container">
              <Icons type={"bike"} color={"black"} />
            </div>
            <div className="account-inner-stat-container">
              <span>{rentedBikes}</span>
              <p>Rides</p>
            </div>
          </div>
          <div className="account-outer-stat-container">
            <div className="account-stats-icon-container">
              <Icons type={"star"} color={"black"} />
            </div>
            <div className="account-inner-stat-container">
              <span>{users}</span>
              <p>Users</p>
            </div>
          </div>
        </div>
      </div>
      <div className="admin-content-container">
        <span>
          <Button text="Add Bike" type="primary" color="black" handleClick={() => setAdd(!add)} />
        </span>
        <span>
          <Button text="Edit Bikes" type="primary" color="black" handleClick={() => setEdit(!edit)} />
        </span>
      </div>
      <Nav />
    </div>
  );
}
