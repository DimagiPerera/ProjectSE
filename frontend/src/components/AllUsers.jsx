import React, { useState, useEffect } from "react";
import axios from "axios";
import './CSS/note.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useSelector } from "react-redux";

export default function UserList() {
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [mobile, setMobile] = useState("");
    const [accountType, setAccountType] = useState("");
    const [id, setId] = useState("");
    const [users, setUsers] = useState([]);
    const [pagecount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [enable, setEnable] = useState(true);
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const closeBtn = (
        <button className="close" onClick={toggle} type="button">
            &times;
        </button>
    );

    const auth = useSelector((state) => state.auth);
    const { LoggedUser } = auth;
    console.log("auth", auth);

    let prevClass = "page-item ",
        nextClass = "page-item ";

    useEffect(() => {
        axios
            .get("user/allUsers/?page=1&limit=5")
            .then((res) => {
                setUsers(res.data);
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
            .get("user/allUsers/?page=" + page + "&limit=5")
            .then((res) => {
                setUsers(res.data.existingUsers);
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
    //   async function handleUpdate(id) {
    //     setLoading(true);
    //     setEnable(true);
    //     await axios
    //       .put("notes/updateNote/" + id, {
    //         email,
    //         title,
    //         note,
    //       })
    //       .then((res) => {
    //         setLoading(false);

    //         axios
    //           .get("notes/getAllNotes?page=" + currentPage + "&limit=5")
    //           .then((res) => {
    //             setNotes(res.data.existingNotes);
    //             setPageCount(res.data.pages);
    //             setLoading(false);
    //           })
    //           .catch((err) => {
    //             alert(err.message);
    //           });
    //       })
    //       .catch((err) => {
    //         alert(err.message);
    //       });
    //   }

    //   async function handleDelete(id) {
    //     let ans = window.confirm("Do you want to delete this note ?");

    //     if (ans) {
    //       setLoading(true);
    //       setEnable(true);
    //       axios
    //         .delete("notes/deleteNote/" + id)
    //         .then((res) => {
    //           setLoading(false);
    //           setModal(false);

    //           alert("Note Deleted Successfully");
    //           console.log(res);
    //           window.location.reload(false);
    //         })
    //         .catch((err) => {
    //           alert(err.message);
    //         });
    //       axios
    //         .get("notes/getAllNotes?page=" + currentPage + "&limit=5")
    //         .then((res) => {
    //           setNotes(res.data.existingNotes);
    //           setPageCount(res.data.pages);
    //           setLoading(false);
    //         })
    //         .catch((err) => {
    //           alert(err.message);
    //         });
    //     }
    //   }

    updatePagination();

    async function handleSetData(data) {
        setFirstname(data.firstName);
        setLastname(data.lastName)
        setEmail(data.email);
        setDateOfBirth(data.dateOfBirth)
        setMobile(data.mobile);
        setAccountType(data.accountType);
        setId(data._id);
        setModal(true);
    }
    return (
        <div>
            <div className="notediv">
            <table class="table table-striped table-light" style={{width:880,marginLeft:"25%"}}>
                    <thead class="thread-light">
                        <tr style={{ textAlign: "center", backgroundColor: "#524949", color: "white" }}>
                            <th scope="col" className="col-2">
                                Full Name
                            </th>
                            <th scope="col" className="col-2">
                                E-mail
                            </th>
                            <th scope="col" className="col-2">
                                User Type
                            </th>
                            <th scope="col" className="col-2">
                               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Action
                            </th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: "center" }}>
                        {users?.map((user) => (
                            <tr >
                                <td className="py-3 " style={{ padding:"7px 25px"}}>{user.firstName} &nbsp;{user.lastName}</td>
                                <td className="py-3 " style={{ padding:"7px 20px"}}>{user.email}</td>
                                <td className="py-3 " style={{ padding:"7px 25px"}}>{user.accountType}</td>
                                <td className="py-3 " style={{ padding:"7px 10px"}}>
                                    <button
                                        className="viewbutton1  "
                                        data-bs-toggle="modal"
                                        onClick={() => handleSetData(user)}
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
                <div className="page">
                    <div aria-label="Page navigation example">
                        <div className="pagination justify-content-end">
                            <div className={prevClass} id="pagination1">
                                <a
                                    // href="#"
                                    // tabindex="-1"
                                    aria-disabled="true"
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    Previous
                                </a>
                            </div><br /><br />
                            <div style={{ textAlign: "center", left: 879, position: 'absolute', color: "#ffc500" }}>
                                {pages}
                            </div>

                            <div className={nextClass} id="pagination2">
                                <a onClick={() => handlePageChange(currentPage + 1)}> Next </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    class="modal fade"
                    id="viewNote"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                >
                    {/* Popup modal */}
                    <div className="model">
                        <Modal className="model2"
                            centered
                            size="lg"
                            isOpen={modal}
                            toggle={() => setModal(!modal)}
                        >
                            <ModalHeader toggle={() => setModal(!modal)}>
                            </ModalHeader>
                            <ModalBody>
                                <form className="popup"><br />
                                  <br/><br/>
                                        <label className="modeltg">First Name&nbsp;&nbsp;&nbsp;&nbsp;:  </label>
                                        <div className="form-group1">
                                        {firstName}
                                    </div><br /><br />
                                    <label className="modeltg">Last Name&nbsp;&nbsp;&nbsp;&nbsp;: </label>
                                    <div className="form-group1"> {lastName}</div>


                                    <br /><br />
                                    <label className="modeltg">Email&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>
                                    <div className="form-group1">
                                        {email}
                                    </div>



                                    <br /><br />
                                    <label className="modeltg">Mobile&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: </label>
                                    <div className="form-group1">
                                        {mobile}

                                    </div>   <br /><br />
                                    <label className="modeltg">Date Of Birth: </label>
                                    <div className="form-group1">
                                        {dateOfBirth}

                                    </div>   <br /><br />
                                    <label className="modeltg">Account Type: </label>
                                    <div className="form-group1">
                                        {accountType}
                                    </div>
                                </form>
                            </ModalBody><br /><br />
                            <ModalFooter>
                                {/* <button
             type="btn"
             class="btn btn-info"
                // onClick={() => handleDelete(noteid)}
              >Delete
              </button>

              <button
                type="btn"
                class="btn btn-info"
                onClick={() => setEnable(false)}
              >
                Edit
              </button>
              <button
                type="btn"
                class="btn btn-success"
                data-bs-dismiss="modal"
                disabled={enable}
                // onClick={() => handleUpdate(noteid)}
              >
                Save
              </button> */}
                                <button style={{ borderRadius: "50%", font: 20, width: 30, height: 30, fontWeight: 550, position: "absolute", top: 10, right: 15 }}
                                    onClick={toggle}
                                >
                                    X
                                </button>
                                <br />
                            </ModalFooter>
                        </Modal>
                    </div>


                </div>
            </div>
        </div>
    );
}