import "./Index.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// MUI icons
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import TableRowsIcon from "@mui/icons-material/TableRows";

// Me(Axios)
import api from "../../api";

export default function Index() {
  // Copy button
  const [copyDone, setCopyDone] = useState(false);
  const [pageLink, setPageLink] = useState(null);
  const domain = window.location.origin; //Ex: http://localhost:3000

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

  const goToTable = (e, id) => {
    e.preventDefault();
    window.open(`${domain}/table/${id}`, "_blank");
  };

  const cards = data.map(({ id, image, title }) => (
    <Link
      key={id}
      to={`/card/${id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="card text-decoration-none"
      style={{ width: "18rem" }}
    >
      <div className="img_home_box">
        <img src={image} className="card-img-top" alt="card image" />
      </div>
      <div className="card-body">
        <h5 className="card-title m-0" dir="auto">
          {title}
        </h5>

        <div>
          {/* table Button */}
          <IconButton
            onClick={(e) => goToTable(e, id)}
            aria-label="table"
            sx={{ "&:hover": { color: "#000" } }}
          >
            <TableRowsIcon />
          </IconButton>

          {/* Copy Button */}
          <IconButton
            onClick={(e) => handleCopy(e, id)}
            aria-label="copy"
            sx={{ "&:hover": { color: "#000" } }}
          >
            {copyDone && pageLink === `${domain}/card/${id}` ? (
              <DoneOutlineIcon />
            ) : (
              <ContentCopyIcon />
            )}
          </IconButton>
        </div>
      </div>
    </Link>
  ));

  const handleCopy = (e, id) => {
    e.preventDefault();
    let newPageLink = `${domain}/card/${id}`;

    navigator.clipboard
      .writeText(newPageLink)
      .then(() => {
        console.log(newPageLink);
        setPageLink(newPageLink);

        // Show sccusess icon
        setCopyDone(true);
      })
      .catch((error) => {
        console.error("Failed to copy page link to clipboard", error);
      });
  };

  return (
    <div className="dash_index_cotainer">
      {/* <h1>To edit, select the page from the sidebar.</h1> */}

      <div className="home_container">
        <div className="cards_box">{cards}</div>
      </div>

      {/* Floating + to add page */}
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
