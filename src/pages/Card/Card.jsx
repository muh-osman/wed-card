import "./Card.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// MUI icons
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PrintIcon from "@mui/icons-material/Print";
// Me(Axios)
import api from "../../api";
// sweetalert
import Swal from "sweetalert2";

export default function Card() {
  //
  const nav = useNavigate();
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
  const [audioType, setAudioType] = useState("");

  async function fetchData() {
    try {
      const res = await api.get(`api/cards/${id}`);
      // console.log(res);
      setData(res.data);

      if (res.data) {
        document.title = res.data.title;

        if (res.data.audio) {
          const audioFileExtension = res.data.audio.split(".").pop();
          setAudioType(audioFileExtension);
        }
      }
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 404) {
        console.log("this page was deleted");
        nav("/this-page-has-been-deleted");
      }
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

  // Audio btn
  const [isPlaying, setIsPlaying] = useState(false);

  const audioBtnClick = () => {
    const audio = document.getElementById("myAudio");
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="card_container">
      {/* image box */}
      <div className="card_img_box">
        {data && <img src={data.image} alt="card image" />}
      </div>

      <div className="form_card_box" dir="rtl">
        {/* Location btn */}
        {data?.location && (
          <div className="location_box">
            <LocationOnIcon
              className="location-icon"
              sx={{ fontSize: "32px", color: "#000" }}
            />
            <a href={data?.location}>الموقع</a>
          </div>
        )}

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

      {/* Audio button */}
      {data?.audio && (
        <div className="audio_container">
          <audio id="myAudio" loop>
            <source src={data.audio} type={`audio/${audioType}`} />
            Your browser does not support the audio element.
          </audio>
          <div className="bg"></div>
          <button id="playPauseButton" onClick={audioBtnClick}>
            {isPlaying ? (
              <PauseIcon sx={{ color: "#fff" }} />
            ) : (
              <PlayArrowIcon sx={{ color: "#fff" }} />
            )}
          </button>
        </div>
      )}

      {/* footer */}
      <section className="footer">
        <p>
          Made with{" "}
          <span>
            {" "}
            &nbsp; <FavoriteIcon
              style={{ color: "red", fontSize: ".7em" }}
            />{" "}
            &nbsp;{" "}
          </span>{" "}
          by&nbsp;
          <a
            href="https://www.tsmimseham.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Tsmim Seham
          </a>
        </p>

        <button onClick={() => window.print()}>
          <PrintIcon />
        </button>
      </section>
    </div>
  );
}
