import "./Table.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api";

export default function Table() {
  const [data, setData] = useState([]);
  const [tableFooter, setTableFooter] = useState("Loading..");

  const { id } = useParams();

  async function fetchData() {
    try {
      const res = await api.get(`api/cards/${id}/Data`);
      setData(res.data.form_data);
      // console.log(res.data.form_data);

      res.data.form_data.length === 0
        ? setTableFooter("لايوجد ردود حتى الآن")
        : (document.getElementById("table-footer").style.display = "none");
    } catch (err) {
      console.error(err);
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
      <h1 className="mb-5">ردود ضيوفك</h1>

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
  );
}
