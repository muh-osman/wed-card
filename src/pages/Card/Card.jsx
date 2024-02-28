import "./Card.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// MUI icons
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// Me(Axios)
import api from "../../api";
// sweetalert
import Swal from "sweetalert2";

export default function Card() {
  // Form
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState("");
  const [message, setMessage] = useState("");

  const handleRadioChange = (event) => {
    setAttendance(event.target.value);
  };

  const [clickedButton, setClickedButton] = useState(false);

  const { id } = useParams();

  const [data, setData] = useState(null);
  async function fetchData() {
    try {
      const res = await api.get(`api/cards/${id}`);
      // console.log(res.data);
      setData(res.data);
      if (res.data) {
        document.title = res.data.title;
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // submit form
  const form = document.forms[`submit-to-google-sheet-${id}`];

  async function handleSubmit(e) {
    // let scriptURL = data.api;
    e.preventDefault();
    setClickedButton(true);
    const formData = new FormData(form);
    try {
      const res = await api.post(`api/cards/${id}/Data`, formData);
      console.log("Success!", res);
      setClickedButton(false);

      setName("");
      setAttendance("");
      setMessage("");

      Swal.fire({
        position: "center",
        icon: "success",
        title: "شكرا لك",
        text: "تم ارسال الرسالة بنجاح",
        showConfirmButton: false,
        timer: 2500,
      });
    } catch (error) {
      console.error("Error!", error.message);
      setClickedButton(false);
    }
  }

  return (
    <div className="card_container">
      <div className="card_img_box">
        {data && <img src={data.image} alt="card image" />}
      </div>

      <div className="form_card_box" dir="rtl">
        {/* <div className="location_box">
          <LocationOnIcon sx={{ fontSize: "32px", color: "#fff" }} />
          <a href={data?.link}>الموقع</a>
        </div> */}

        <form name={`submit-to-google-sheet-${id}`} onSubmit={handleSubmit}>
          <div style={{ textAlign: "center", marginBottom: "16px" }}>
            <h2>أكدي لنا حضورك</h2>
          </div>
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
              name="name"
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
              name="attendance"
              id="flexRadioDefault1"
              required
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
              name="attendance"
              id="flexRadioDefault2"
              required
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
            <button
              type="submit"
              className="btn btn-primary custom_btn"
              style={{ width: "64.38px" }}
            >
              {clickedButton ? (
                <div
                  className="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              ) : (
                "إرسال"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
