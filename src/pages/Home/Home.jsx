import "./Home.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// Logo
import logo from "../../assets/images/logo-slim.jpg";
// Me(Axios)
import api from "../../api";
// Test Image
// import cardOne from "../../assets/images/card-1.jpg";
// import cardTwo from "../../assets/images/card-2.jpg";
// import cardThree from "../../assets/images/card-3.jpg";
// import cardFour from "../../assets/images/card-4.jpg";
// import cardFive from "../../assets/images/card-5.jpg";

export default function Home() {
  const authState = localStorage.getItem("auth");

  // const [data, setData] = useState([]);

  // async function fetchData() {
  //   try {
  //     const res = await api.get("api/cards");
  //     setData(res.data);
  //     // console.log(res.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const cards = data.map(({ id, image, title }) => (
  //   <Link
  //     key={id}
  //     to={`card/${id}`}
  //     className="card text-decoration-none"
  //     style={{ width: "18rem" }}
  //   >
  //     <div className="img_home_box">
  //       <img src={image} className="card-img-top" alt="card image" />
  //     </div>
  //     <div className="card-body">
  //       <h5 className="card-title text-center m-0" dir="auto">
  //         {title}
  //       </h5>
  //     </div>
  //   </Link>
  // ));

  return (
    <>
      <nav className="home_nav fixed-top">
        <Link to={authState == "true" ? "/dashboard" : "/admin"}>
          {authState == "true" ? "DASHBOARD" : "LOGIN"}
        </Link>

        <div>
          <img src={logo} alt="logo" />
        </div>
      </nav>

      <div className="home_container">
        {/* <div className="cards_box">{cards}</div> */}
        <img src={logo} alt="logo" />
      </div>
    </>
  );
}
