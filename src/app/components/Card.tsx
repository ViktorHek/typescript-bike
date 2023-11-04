import Icons from "./Icons";
import "../styles/components.css";
import Bike from "../bikes/bikeInterface"

interface props {
  bike: Bike,
  handleClick: (id: string) => void
}

export default function Card(props: props) {
  console.log({props})
  const { bike, handleClick } = props;
  const bikeImg =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCaFa5S5I_ZGML8N7JSAa3EJsm7yU4r8w3Gw&usqp=CAU";

  function handleSelect() {
    return handleClick(bike.id);
  }

  return (
    <div className="main-card-container center">
      <div className="inner-card-container" onClick={() => handleSelect()}>
        <p>{bike.title}</p>
        <div className="card-img-container center">
          <img src={bike.imgUrl} alt="pic" />
        </div>
        <div className="card-info-footer">
          <span>{bike.priceRange}Kr</span>
          {"shit" === "shit" ? <Icons type={"star"} color={""} /> : <Icons type={"hollow-star"} color={""} />}
        </div>
      </div>
    </div>
  );
}
