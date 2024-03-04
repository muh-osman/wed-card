import "./Table.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api";
// MUI
import FavoriteIcon from "@mui/icons-material/Favorite";
import PrintIcon from "@mui/icons-material/Print";

export default function Table() {
  //
  const nav = useNavigate();
  //
  const [data, setData] = useState([]);
  const [pageTitle, setPageTitle] = useState(null);
  const [tableFooter, setTableFooter] = useState("Loading..");

  const { id } = useParams();

  async function fetchData() {
    try {
      const res = await api.get(`api/cards/${id}/Data`);
      setData(res.data.form_data);
      // console.log(res.data.form_data);
      // console.log(res.data.card_title);
      setPageTitle(res.data.card_title);

      res.data.form_data.length === 0
        ? setTableFooter("لايوجد ردود حتى الآن")
        : (document.getElementById("table-footer").style.display = "none");
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

  const rows = data.map(({ id, name, attendance, message }) => (
    <tr key={id}>
      <th scope="row">{id}</th>
      <td>{name}</td>
      <td>{attendance}</td>
      <td>{message}</td>
    </tr>
  ));

  return (
    <div className="table_container" dir="rtl">
      <div className="w-100">
        <h1 className="mb-5 text-center">
          ردود ضيوف <span>"{pageTitle}"</span>
        </h1>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">الاسم</th>
              <th scope="col">الحضور</th>
              <th scope="col">الرسالة</th>
            </tr>
          </thead>

          <tbody>{rows}</tbody>

          <tfoot id="table-footer">
            <tr>
              <td
                dir="ltr"
                colSpan="4"
                className="text-center"
                style={{ color: "#757575" }}
              >
                {tableFooter}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* footer */}
      <section className="table-footer" dir="ltr">
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
