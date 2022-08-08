import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useSelector } from "react-redux";

export default function NoteList() {
  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const [noteid, setNoteid] = useState("");
  const [notes, setNotes] = useState([]);
  const [pagecount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [enable, setEnable] = useState(true);
  const [modal, setModal] = useState(false);

  const auth = useSelector((state) => state.auth);
  const { LoggedUser } = auth;
  console.log("auth", auth);

  let prevClass = "page-item ",
    nextClass = "page-item ";

  useEffect(() => {
    axios
      .get("notes/getAllNotes/?page=1&limit=5")
      .then((res) => {
        setNotes(res.data.existingNotes);
        setPageCount(res.data.pages);
        setLoading(false);
        console.log("res", res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);
  const pages = [];

  async function handlePageChange(page) {
    setLoading(true);
    await axios
      .get("notes/getAllNotes/?page=" + page + "&limit=5")
      .then((res) => {
        setNotes(res.data.existingNotes);
        setCurrentPage(page);
        updatePagination();
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  async function updatePagination() {
    if (currentPage == 1) {
      prevClass = "page-item disabled";
    }
    if (currentPage == pagecount) {
      nextClass = "page-item disabled";
    }

    for (let i = 1; i <= pagecount; i++) {
      if (i === currentPage) {
        pages.push(
          <li className="page-item active">
            <a className="page-link" onClick={() => handlePageChange(i)}>
              {i}
            </a>
          </li>
        );
      } else {
        pages.push(
          <li className="page-item">
            <a className="page-link" onClick={() => handlePageChange(i)}>
              {i}
            </a>
          </li>
        );
      }
    }
  }
  async function handleUpdate(id) {
    setLoading(true);
    setEnable(true);
    await axios
      .put("notes/updateNote/" + id, {
        email,
        title,
        note,
      })
      .then((res) => {
        setLoading(false);

        axios
          .get("notes/getAllNotes?page=" + currentPage + "&limit=5")
          .then((res) => {
            setNotes(res.data.existingNotes);
            setPageCount(res.data.pages);
            setLoading(false);
          })
          .catch((err) => {
            alert(err.message);
          });
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  async function handleDelete(id) {
    let ans = window.confirm("Do you want to delete this note ?");

    if (ans) {
      setLoading(true);
      setEnable(true);
      axios
        .delete("notes/deleteNote/" + id)
        .then((res) => {
          setLoading(false);
          setModal(false);

          alert("Note Deleted Successfully");
          console.log(res);
          window.location.reload(false);
        })
        .catch((err) => {
          alert(err.message);
        });
      axios
        .get("notes/getAllNotes?page=" + currentPage + "&limit=5")
        .then((res) => {
          setNotes(res.data.existingNotes);
          setPageCount(res.data.pages);
          setLoading(false);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  }

  updatePagination();

  async function handleSetData(data) {
    setEmail(data.email);
    setTitle(data.title);
    setNote(data.note);
    setNoteid(data._id);
    setModal(true);
  }
  return (
    <div>
      <div className="py-4 container mt-5">
        <table class="table table-striped table-light">
          <thead class="thread-light">
            <tr style={{ textAlign: "center" }}>
              <th scope="col" className="col-2">
                Title
              </th>
              <th scope="col" className="col-2">
                Note
              </th>
              <th scope="col" className="col-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {notes?.map((note) => (
              <tr>
                <td className="py-3 ">{note.title}</td>
                <td className="py-3 ">{note.note}</td>
                <td className="py-3 ">
                  <button
                    className="btn btn-warning  "
                    data-bs-toggle="modal"
                    onClick={() => handleSetData(note)}
                  >
                    <i className="fa fa-eye"></i>&nbsp;View
                  </button>

                  {/* <a
                    className="btn btn-danger me-5"
                    style={{ marginLeft: "15%" }}
                    href="/delete"
                  >
                    <i className="far fa-trash-alt"></i>&nbsp;Delete
                  </a> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-end">
            <li className={prevClass}>
              <a
                className="page-link"
                href="#"
                tabindex="-1"
                aria-disabled="true"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </a>
            </li>
            {pages}

            <li className={nextClass}>
              <a
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </a>
            </li>
          </ul>
        </nav>

        <div
          class="modal fade"
          id="viewNote"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          {/* Popup modal */}
          <Modal
            centered
            size="lg"
            isOpen={modal}
            toggle={() => setModal(!modal)}
          >
            <ModalHeader toggle={() => setModal(!modal)}>
              <h5>View Note</h5>
            </ModalHeader>
            <ModalBody>
              <form>
                <div className="form-group">
                  <label>Title: </label>
                  <input
                    disabled={enable}
                    className="form-control"
                    type="text"
                    name="first_name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Title: </label>
                  <textarea
                    disabled={enable}
                    className="form-control"
                    rows="3"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <button
                className="btn btn-danger"
                data-bs-dismiss="modal"
                onClick={() => handleDelete(noteid)}
              >
                <i className="fas fa-trash-alt"></i>&nbsp;Delete
              </button>

              <button
                type="button"
                class="btn btn-info"
                onClick={() => setEnable(false)}
              >
                Edit
              </button>
              <button
                type="button"
                class="btn btn-success"
                data-bs-dismiss="modal"
                disabled={enable}
                onClick={() => handleUpdate(noteid)}
              >
                Save
              </button>
            </ModalFooter>
          </Modal>
        </div>
      </div>
    </div>
  );
}
