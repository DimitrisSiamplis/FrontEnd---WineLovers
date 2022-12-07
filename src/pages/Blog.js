import React from "react";
import "./Blog.css";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import { dateFormater, getAge } from "./Functions/functions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { BsFillChatDotsFill } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
const Blog = () => {
  const [initialBlogs, setInitialBlogs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState([]);
  const [question, setQuestion] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [activeSpinner, setActiveSpinner] = useState(false);
  // --------------- Filter Hooks ------------------
  const [blogSearch, setBlogSearch] = useState("");
  const [topReviewSearch, setTopReviewSearch] = useState(false);
  const [myQuestion, setMyQuestion] = useState(false);

  // ----------- width size -----------------------
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);
  useEffect(() => {
    const resizeW = () => changeDeviceSize(window.innerWidth);

    window.addEventListener("resize", resizeW); // Update the width on resize
    return () => window.removeEventListener("resize", resizeW);
  });

  const cookies = new Cookies();
  var userEmail = cookies.get("email");

  // --------- get All Blogs ----------------
  const getBlogs = () => {
    setActiveSpinner(true);
    fetch(`https://winelovers.onrender.com/getBlogs`)
      .then((res) => res.json())
      .then((json) => {
        setActiveSpinner(false);
        setBlogs([json]);
        setInitialBlogs([json]);
      });
  };

  useEffect(() => {
    getBlogs();
    getUser(userEmail);
  }, []);

  const getUser = (email) => {
    setUser([]);
    fetch(`https://winelovers.onrender.com/getUser/${email}`)
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setUser([json]);
        setUserName(json.user.Name);
        setUserId(json.user._id);
      });
  };

  const popover = (
    <Popover id="popover-basic">
      {user.length !== 0 && (
        <div>
          <Popover.Header as="h3">{user[0].user.Name}</Popover.Header>
          <Popover.Body>
            Email : <strong>{user[0].user.Email}</strong> <br />
            Tel. : <strong>{user[0].user.Mobile}</strong> <br />
            Address : <strong>{user[0].user.Address}</strong> <br />
            Age : <strong>
              {getAge(new Date(user[0].user.Birthday))}
            </strong>{" "}
            <br />
          </Popover.Body>
        </div>
      )}
    </Popover>
  );


  const onCreateQuestion = () => {
    let blogDetails = {
      email: userEmail,
      id: userId,
      Name: userName,
      question: question,
    };
    fetch("https://winelovers.onrender.com/createQuestion", {
      method: "POST",
      body: JSON.stringify(blogDetails),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((json) => {
        setQuestion("");
        getBlogs();
      });
  };

  const filterQuestion = () => {
    var oldBlogs = initialBlogs;
    var newBlogArray = [];
    var newArray = oldBlogs[0].numberOfApplies.filter(function (el) {
      return el.blogs.Question.includes(blogSearch);
    });

    if (myQuestion) {
      newArray = newArray.filter(function (el) {
        return el.blogs.UserEmail.includes(userEmail);
      });
    }

    if (topReviewSearch) {
      newArray.sort((a, b) => {
        return b.numberOfApplies - a.numberOfApplies;
      });
    }
    console.log(newArray);

    newBlogArray.push({ numberOfApplies: newArray });
    setBlogs(newBlogArray);
    window.scrollTo(0, 0);
  };

  const onClearHandler = () => {
    setMyQuestion(false);
    setTopReviewSearch(false);
    setBlogSearch("");
    setBlogs(initialBlogs);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <div className="title">
        <div class="container py-4">
          <header class="pb-3 mb-4 border-bottom">
            <a class="d-flex align-items-center text-dark text-decoration-none">
              <span class="fs-4">
                <BsFillChatDotsFill className="initial-icons" />
                &nbsp; Blog
              </span>
            </a>
          </header>{" "}
        </div>

        <Row>
          <Col
            md={{
              span: deviceSize < 1000 ? 8 : 4,
              offset: deviceSize < 1000 ? 0 : 0,
            }}
          >
            <div className="bg-white rounded-3 shadow-sm p-4">
              <h4>Search&nbsp;for&nbsp;questions</h4>
              <div className="">
                <Container>
                  <Row>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Filter Blogs</Form.Label>
                        <Form.Control
                          type="search"
                          placeholder="Filter Blog"
                          value={blogSearch}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              filterQuestion();
                            }
                          }}
                          onChange={(e) => {
                            setBlogSearch(e.target.value);
                          }}
                        />
                      </Form.Group>
                      <br />
                      <div className="rateCheckBox">
                        <input
                          type="checkbox"
                          checked={topReviewSearch}
                          onChange={(e) => {
                            setTopReviewSearch(e.target.checked);
                          }}
                        />
                        <label className="rateLabel">
                          &nbsp;Search&nbsp;by&nbsp;top&nbsp;question.
                        </label>
                      </div>
                      <div className="rateCheckBox">
                        <input
                          type="checkbox"
                          checked={myQuestion}
                          onChange={(e) => {
                            setMyQuestion(e.target.checked);
                          }}
                        />
                        <label className="rateLabel">
                          &nbsp;My&nbsp;questions.
                        </label>
                      </div>
                      <br />
                      <hr />
                      <Row>
                        <Col xs={4}>
                          <Button variant="warning" onClick={onClearHandler}>
                            Clear
                          </Button>
                        </Col>
                        <Col xs={6}>
                          <Button variant="success" onClick={filterQuestion}>
                            Search
                          </Button>
                        </Col>
                      </Row>
                      &nbsp;
                    </Form>
                  </Row>
                </Container>
              </div>
            </div>
          </Col>
          <Col
            md={{
              span: deviceSize < 1000 ? 8 : 8,
              offset: deviceSize < 1000 ? 0 : 0,
            }}
          >
            <div>
              <div>
                {activeSpinner && (
                  <Spinner
                    className="spinner"
                    animation="border"
                    variant="primary"
                  />
                )}
                {!activeSpinner && (
                  <div className="bg-white rounded-3 shadow-sm p-4">
                    <h4 className="mb-4">Leave a Question</h4>

                    {/* <div className="alert alert-danger" role="alert"></div> */}

                    <div className="d-flex">
                      {/* <img
                      className="rounded-circle me-3"
                      src={`https://via.placeholder.com/128/{{this.randomColor}}/ffcbde.png?text=AA`}
                    /> */}
                      <div className="flex-grow-1">
                        <div className="hstack gap-2 mb-1">
                          <a href="#" className="fw-bold link-dark"></a>
                        </div>
                        <div className="form-floating mb-3">
                          <textarea
                            className="form-control w-100"
                            value={question}
                            onChange={(e) => {
                              setQuestion(e.target.value);
                            }}
                            required
                          ></textarea>
                          <label>Leave a message here</label>
                        </div>

                        <div className="hstack justify-content-end gap-2">
                          <button
                            className="btn btn-sm btn-link link-secondary text-uppercase"
                            title="Clear form"
                            onClick={() => {
                              setQuestion("");
                            }}
                          >
                            Clear
                          </button>
                          <button
                            disabled={question.trim() === ""}
                            className="btn btn-sm btn-primary text-uppercase"
                            onClick={onCreateQuestion}
                          >
                            comment
                          </button>
                        </div>
                      </div>
                    </div>

                    <br />
                    <hr />
                    <h4 className="mb-4">Questions</h4>

                    <div></div>
                    <br />

                    <hr />

                    <div className="">
                      <div className="py-3">
                        {blogs.length !== 0 && (
                          <div className="table-wrapper">
                            {blogs[0].numberOfApplies.map((blog) => (
                              <div className="d-flex comment">
                                <img
                                  className="rounded-circle me-3"
                                  src={`https://via.placeholder.com/130/${Math.floor(
                                    Math.random() * 16777215
                                  ).toString(16)}/ffcbde.png?text=${
                                    blog.blogs.UserName.split(" ")[0][0] +
                                    blog.blogs.UserName.split(" ")[1][0]
                                  }`}
                                />
                                <div className="flex-grow-1 ms-3">
                                  <div className="mb-1">
                                    <OverlayTrigger
                                      trigger={
                                        user.length === 0 ? "click" : "focus"
                                      }
                                      placement="right"
                                      overlay={popover}
                                    >
                                      <Button
                                        onClick={() => {
                                          getUser(blog.blogs.UserEmail);
                                        }}
                                        className="popoverButton"
                                      >
                                        {blog.blogs.UserName}
                                      </Button>
                                    </OverlayTrigger>
                                    <FontAwesomeIcon
                                      className="eyeFaIcon"
                                      title={`Reply to ${blog.blogs.UserName}`}
                                      onClick={() => {
                                        window.open(
                                          `/blogInfo/${blog.blogs._id}`
                                        );
                                      }}
                                      icon={faReply}
                                      size="lg"
                                    />{" "}
                                    <br />{" "}
                                    <span className="text-muted text-nowrap">
                                      {dateFormater(
                                        new Date(blog.blogs.QuestionDate)
                                      )}
                                    </span>
                                  </div>

                                  <div className="mb-2 css">
                                    {blog.blogs.Question}
                                  </div>
                                  <div className="hstack align-items-center mb-2">
                                    <a className="link-primary me-2" href="#">
                                      <i className="zmdi zmdi-thumb-up"></i>
                                    </a>
                                    <span className="me-3 small">
                                      <strong>{blog.numberOfApplies}</strong>{" "}
                                      aplies.
                                    </span>
                                    <a className="link-secondary me-4" href="#">
                                      <i className="zmdi zmdi-thumb-down"></i>
                                    </a>

                                    {blog.blogs.UserEmail === userEmail && (
                                      <MdDeleteForever
                                        title="Delete Question"
                                        className="delete-icon"
                                      
                                      />
                                    )}

                                    <div
                                      className="modal fade"
                                      id="exampleModal"
                                      role="dialog"
                                      aria-labelledby="exampleModalLabel"
                                      aria-hidden="true"
                                    >
                                      <div
                                        className="modal-dialog"
                                        role="document"
                                      >
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h5
                                              className="modal-title"
                                              id="exampleModalLabel"
                                            >
                                              Modal title
                                            </h5>
                                            <button
                                              type="button"
                                              className="close"
                                              data-dismiss="modal"
                                              aria-label="Close"
                                            >
                                              <span aria-hidden="true">
                                                &times;
                                              </span>
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <a
                                    className="fw-bold d-flex align-items-center"
                                    href="#"
                                  >
                                    <i className="zmdi zmdi-chevron-down fs-4 me-3"></i>
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        <br />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Blog;
