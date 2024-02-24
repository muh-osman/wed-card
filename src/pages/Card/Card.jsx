import "./Card.css";
import { useEffect, useState } from "react";
// MUI icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
// Me(Axios)
import api from "../../api";

// Test image
import testImage from "../../assets/images/card-1.jpg";

export default function Card() {
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [message, setMessage] = useState("");

  const handleRadioChange = (event) => {
    setAttendance(event.target.value);
  };

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

      console.log(name);
      console.log(attendance);
      console.log(message);

      // Stop button animation
      setClickedButton(false);

      // Fetch data again
      // fetchData();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="card_container">
      <div className="card_img_box">
        <img src={testImage} alt="card image" />
      </div>

      <div className="form_card_box" dir="rtl">
        <div className="location_box">
          <LocationOnIcon sx={{ fontSize: "32px", color: "#fff" }} />
          <a href="https://maps.app.goo.gl/7fdjLdKZXUZnaUXZA">الموقع</a>
        </div>

        <form onSubmit={submitData}>
          {/* الاسم */}
          <div className="mb-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              الاسم:<span>*</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
          </div>

          {/* الحضور */}
          <label className="form-label">
            بتشرفينا بحضورك؟<span>*</span>
          </label>
          <div className="form-check rad">
            <input
              value="بحضر بإذن الله"
              checked={attendance === "بحضر بإذن الله"}
              onChange={handleRadioChange}
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
              بحضر بإذن الله
            </label>
          </div>
          <div className="form-check rad mb-4">
            <input
              value="أعتذر عن الحضور"
              checked={attendance === "أعتذر عن الحضور"}
              onChange={handleRadioChange}
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault2"
            />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
              أعتذر عن الحضور
            </label>
          </div>

          {/* الرسالة */}
          <div className="form-group mb-4">
            <label className="form-label" htmlFor="exampleFormControlTextarea1">
              اذا حابة تكتبين شي (اختياري):
            </label>
            <textarea
              className="form-control"
              name="message"
              id="exampleFormControlTextarea1"
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary custom_btn">
              {clickedButton ? (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              ) : (
                "ارسال"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
