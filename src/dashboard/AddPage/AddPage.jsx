import "./AddPage.css";
import { useEffect, useState } from "react";
// API
import api from "../../api";
// MUI icon
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
// MUI
import IconButton from "@mui/material/IconButton";
// sweetalert
import Swal from "sweetalert2";

// Test image
import testImage from "../../assets/images/card-1.jpg";
export default function AddPage() {
  const [sale, setSale] = useState("");
  const [clickedButton, setClickedButton] = useState(true);

  const [clickedButtonId, setClickedButtonId] = useState(null);

  async function fetchData() {
    try {
      // const res = await api.get("api/sale/1");
      // console.log(res.data.sale.sale);
      // setSale(res.data.sale.sale);
      setClickedButton(false);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function submitData(e) {
    e.preventDefault();
    setClickedButton(true);
    try {
      // await api.post("api/sale/1?_method=PATCH", {
      //   sale: sale,
      // });
      // Show the alert
      document.getElementById("success-alert").style.top = "77px";

      // Stop button animation
      setClickedButton(false);

      // Hide the alert after 5 seconds
      setTimeout(function () {
        document.getElementById("success-alert").style.top = "-5%";
      }, 4000);

      // Fetch data again
      // fetchData();
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="images-container">
      {/* Alert */}
      <div
        className="alert alert-success d-flex align-items-center alert_hide_me"
        role="alert"
        id="success-alert"
      >
        <CheckCircleOutlineIcon className="me-2 fs-4" />
        <div>All changes saved</div>
      </div>

      {/* form */}
      <form onSubmit={submitData} encType="multipart/form-data">
        {/* <div className="form-image-box">
          <img src={testImage} alt="card image" />
        </div> */}

        <div className="mb-3">
          <label htmlFor="exampleInputTitle" className="form-label">
            Add title:
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            id="exampleInputTitle"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputEmail" className="form-label">
            Add image:
          </label>
          <input
            type="file"
            name="image"
            className="form-control"
            id="exampleInputEmail"
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputTitle" className="form-label">
            Add location link:
          </label>
          <input
            // defaultValue={location}
            name="location"
            type="text"
            className="form-control"
            id="exampleInputTitle"
            aria-describedby="emailHelp"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputLink" className="form-label">
            Add google sheets API:
          </label>
          <input
            // defaultValue={api}
            name="api"
            type="text"
            className="form-control"
            id="exampleInputLink"
            aria-describedby="emailHelp"
            required
          />
        </div>

        <div className="btn_box">
          <button
            onClick={setClickedButtonId}
            type="submit"
            className="btn btn-primary mt-2 mb-2"
          >
            {clickedButtonId ? (
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              ></div>
            ) : (
              "Create page"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
