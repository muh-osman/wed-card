import "./CardEditPage.css";
import { useEffect, useState } from "react";
// import api from "../../api";
// import saleImage from "../../assets/images/dashboard/sale.jpg";
// icon
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

export default function CardEditPage() {
  const [sale, setSale] = useState("");
  const [clickedButton, setClickedButton] = useState(true);



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
    <div className="sale-container">
      <div
        className="alert alert-success d-flex align-items-center alert_hide_me"
        role="alert"
        id="success-alert"
      >
        <CheckCircleOutlineIcon className="me-2 fs-4" />
        <div>All changes saved</div>
      </div>

      <div className="sale-box">
        <div className="img-box">
          {/* <img src={saleImage} alt="sale" /> */}
        </div>
        <form onSubmit={submitData}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Enter the discount value %
            </label>
            <input
              value={sale}
              onChange={(e) => setSale(e.target.value)}
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary"
            >
              {clickedButton ? (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              ) : (
                "Edit"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
