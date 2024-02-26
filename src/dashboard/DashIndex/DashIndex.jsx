import "./DashIndex.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// MUI
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
// Me(Axios)
import api from "../../api";

export default function DashIndex() {
  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const res = await api.get("api/cards");
      setData(res.data);
      // console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const cards = data.map(({ id, image, title }) => (
    <Link
      key={id}
      to={`/card/${id}`}
      className="card text-decoration-none"
      style={{ width: "18rem" }}
    >
      <div className="img_home_box">
        <img src={image} className="card-img-top" alt="card image" />
      </div>
      <div className="card-body">
        <h5 className="card-title text-center m-0" dir="auto">
          {title}
        </h5>
      </div>
    </Link>
  ));

  return (
    <div className="dash_index_cotainer">
      <h1>To edit, select the page from the sidebar.</h1>

      <div className="home_container">
        <div className="cards_box">{cards}</div>
      </div>

      <Link
        to="create"
        style={{
          position: "fixed",
          bottom: "32px",
          right: "32px",
        }}
      >
        <Fab
          sx={{
            color: "#fff",
            backgroundColor: "#b6ac9a",
            "&:hover": { backgroundColor: "#837966 " },
          }}
          aria-label="create"
        >
          <AddIcon />
        </Fab>
      </Link>
    </div>
  );
}
