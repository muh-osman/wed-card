import "./DashIndex.css";
import { Link } from "react-router-dom";
// MUI
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

export default function DashIndex() {
  return (
    <div className="dash_index_cotainer">
      <h1>To edit the card page, choose the page from the sidebar.</h1>

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
