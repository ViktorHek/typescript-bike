import Link from "next/link.js"
import Icons from "./Icons"
import "../styles/home.css"

export default function nav() {
  return (
    <div className="link-container">
      <div className="link-inner-container">
        <Link href={"/bikes"}>
          <Icons type={"bike"} color={"black"} />
        </Link>
        <Link href={"/card"}>
          <Icons type={"card"} color={"black"} />
        </Link>
        <Link href={"/account"}>
          <Icons type={"userBox"} color={"black"} />
        </Link>
      </div>
    </div>
  )
}