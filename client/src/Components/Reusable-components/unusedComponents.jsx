import axios from 'axios'
import { useEffect, useState } from 'react'
//import useSWR from 'swr'
import { end_points } from '../../utils'

export default function FilterableProductTable() {
  const { getallItems } = end_points
  const [allItems, setAllItems] = useState([])
  const [isChecked, setIsChecked] = useState(false)
  //const [allList, setAllList] = useState(false)
  const [forceUpdate, setForceUpdate] = useState()

  const getAllItems = async () => {
    try {
      const respond = await axios.get(getallItems)
      if (isChecked) {
        setAllItems(respond.data.slice(-3))
      } else if (!isChecked) {
        setAllItems(respond.data)
        setForceUpdate(!forceUpdate)
      } else {
        setAllItems(respond.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //const forceupdate = useCallback(() => forceUpdate(2000), [])
  //setForceUpdate(!forceUpdate)
  useEffect(() => {
    getAllItems()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!isChecked])

  /*  async function fetcher(url) {
    return await axios.get(url)
  }
  const { data } = useSWR(getallItems, fetcher)

  const foodData = data.data
  console.log('data', data) */
  const filtered = allItems.filter((ele) => {
    if (!isChecked && !ele.length > 0 && !ele) {
      return false
    }
    /* if (!allItems && ele.item.toLowerCase().includes(ele.item.toLowerCase())) {
      return false
    } */

    return true
  })

  //console.log('setAllList', allList)
  console.log('filtered', filtered)

  /*  const handleClicked = (e) => {
    if (!isChecked) {
      allItems.map((el) => el)
    } else {
      allItems.map((el) => el)
    }
  } */

  return (
    <div className="container-fluid p-5">
      <div>
        <input
          type="checkbox"
          /*  isChecked={!isChecked} */
          onClick={forceUpdate}
        ></input>
        <label>all results</label>

        <input type="checkbox" onClick={() => setIsChecked(!isChecked)}></input>
        <label>three</label>
      </div>
      {allItems &&
        allItems.map((el) => {
          return <div key={el.id}>{el.item}</div>
        })}
    </div>
  )
}

/* 
import React, { useEffect, useState } from "react";
import { foodChoices } from "../../utils/Options";
export default function FilterableProductTable() {
  const [select, setSelect] = useState([]);
  const [itemSelect, setItemSelect] = useState({});
  const getAllItem = () => {
    
    setSelect(foodChoices);
  };
  useEffect(() => {
    getAllItem();
  });
  console.log(select);
  console.log(itemSelect);
  return (
    <div>
      {select.map((i) => (
        <div key={i.label} onClick={() => setItemSelect(i)}>
          {i.label}
        </div>
      ))}
    </div>
  );
}

 */

/* foodData component 


import React, { useEffect, useState } from "react";
import { paginate } from "../utils";
//import { FoodData } from "../utils/foodData";
import Count from "./Reusable-components/count";
import { Card, Col, FormControl, ListGroup } from "react-bootstrap";
import FootItems from "./Reusable-components/foodItem";
import { Container, Jumbotron, Button, Row } from "react-bootstrap";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import Pagination from "./Reusable-components/Pagination";
import axios from "axios";
import { end_points } from "../utils/BACKEND_URL";
import useSWR from "swr";

function FoodContent({ searchField }) {
  async function fetcher(url) {
    return await axios.get(url);
  }
  const { getallItems, getAllOptions } = end_points;
  const { data } = useSWR(getallItems, fetcher);
  const [pageSize] = useState(4);
  const [options, setOptions] = useState([]);
   const [allData, setAllData] = useState([]); 
  const [distance, setDistance] = useState(0);
  const [itemSelect, setItemSelect] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [searchItemField, setSearchItemsField] = useState("");

   const getAllData = async () => {
    try {
      const respond = await axios.get(getallItems);
      setAllData(respond.data.foodData);
    } catch (error) {
      console.log(error.message);
    } 

  const getOptions = async () => {
    try {
      const respond = await axios.get(getAllOptions);
      setOptions(respond.data.Options);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOptions();
    // getAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) {
    return <p>Loading</p>;
  }

  const foodData = data.data.foodData;
  const filterItems = foodData.filter((el) => {
    if (
      searchField &&
      !el.item.toLowerCase().includes(searchField.toLowerCase())
    ) {
      return false;
    }
    if (
      itemSelect.length > 0 &&
      !itemSelect.some((catagory) => el.foodChoices.includes(catagory))
    ) {
      return false;
    }
    if (
      searchItemField &&
      el.ingredient.toLowerCase().includes(searchItemField.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onItemSelect = (ml) => {
    setSelectedMeal(ml);
    setCurrentPage(1);
  };

  const handleCheckCatagories = (e) => {
    if (e.target.checked) {
      setItemSelect(itemSelect.concat(e.target.name));
    } else {
      setItemSelect(
        itemSelect.filter((catagory) => e.target.name !== catagory)
      );
    }
  };

  const paginatedItem = paginate(filterItems, currentPage, pageSize);

  const mealClass = [
    { id: 1, label: "full meal" },
    { id: 2, label: "course meal" },
    { id: 3, label: "apetizer" },
    { id: 4, label: "drink" },
    { id: 5, label: "children's" },
  ];
  return (
    <>
      <div className="m-2" style={{ height: "100vh", width: "100%" }}>
        <Container
          style={{
            backgroundColor: "#fff",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <Jumbotron>
            <Container className="m-4 pt-5">
              <>
                <Container>
                  <Row>
                    <Col sm={12} md={10} lg={3} >
                      <Count item={filterItems} label="result" />
                    </Col>
                    <Col sm={12} md={10} lg={9}>
                      <ListGroup horizontal>
                        {mealClass.map((item) => {
                          return (
                            <Button
                              key={item.id}
                              onClick={() => {
                                onItemSelect(item.label);
                              }}
                              style={
                                item.label === selectedMeal
                                  ? {
                                      color: "#ffffff",
                                      cursor: "pointer",
                                      backgroundColor: "#808080",
                                      margin: "1.1rem",
                                      width: "100%",
                                    }
                                  : {
                                      color: "#000000",
                                      cursor: "pointer",
                                      backgroundColor: "#ffffff",
                                      margin: "1.1rem",
                                      width: "100%",
                                    }
                              }
                            >
                              {" "}
                              {item.label}
                            </Button>
                          );
                        })}
                      </ListGroup>
                    </Col>
                  </Row>
                </Container>
                <Container >
                  <Row>
                    <Col sm={12} md={10} lg={3}>
                      <Card
                        style={{
                          height: "50rem",
                          backgroundColor: "black",
                          borderRadius: "26px",
                          width: "100%",
                        }}
                      >
                        <Card.Body className="text-right m-3">
                          <Card.Title className="text-secondary">
                            Price
                          </Card.Title>
                          <Form.Group controlId="formBasicRange">
                            <OverlayTrigger
                              placement="top"
                              overlay={
                                <Tooltip>
                                  {distance}
                                  {"   "}€
                                </Tooltip>
                              }
                            >
                              <Form.Control
                                style={{ width: "12rem" }}
                                type="range"
                                className="mt-3"
                                placement="top"
                                defaultValue="{distance}"
                                onChange={(e) => setDistance(e.target.value)}
                              />
                            </OverlayTrigger>
                          </Form.Group>
                          <Card.Title className="text-secondary mt-3">
                            Foot Choices
                          </Card.Title>
                          <>
                            <Form.Group
                              as={Row}
                              className="mt-4"
                              style={{ color: "#fff" }}
                            >
                              <Col>
                                {options.foodChoices &&
                                  options.foodChoices?.map((i) => {
                                    return (
                                      <div
                                        key={i.id}
                                        style={{
                                          display: "flex",
                                          overflow: "auto",
                                          alignItems: "center",
                                          flexDirection: "row",
                                          justifyContent: "flex-start",
                                        }}
                                      >
                                        <Form.Check
                                          className=""
                                          style={{ color: "gray" }}
                                          type="checkbox"
                                          name={i.label}
                                          id={`default-${i.label}`}
                                          onClick={handleCheckCatagories}
                                        />
                                        <span>{i.label}</span>
                                      </div>
                                    );
                                  })}
                              </Col>
                            </Form.Group>
                          </>
                          <>
                            <Form.Group
                              as={Col}
                              controlId="formGridCity"
                              className="mt-2"
                            >
                              <Form.Label style={{ color: "gray" }}>
                                <Card.Title className="text-secondary mt-3">
                                  Alergic?
                                </Card.Title>
                              </Form.Label>
                              <FormControl
                                value={searchItemField || ""}
                                placeholder="type anything"
                                onChange={(e) =>
                                  setSearchItemsField(e.target.value)
                                }
                              />
                            </Form.Group>
                          </>
                        </Card.Body>
                      </Card>
                    </Col>

                    <Col sm={12} md={10} lg={9}>
                      <Container>
                        <FootItems data={paginatedItem} />
                        <Pagination
                          pageSize={pageSize}
                          onNextPage={onNextPage}
                          currentPage={currentPage}
                          onPageChange={handlePageChange}
                          onPreviousPage={onPreviousPage}
                          itemsCount={filterItems?.length}
                        />
                      </Container>
                    </Col>
                  </Row>
                </Container>
              </>
            </Container>
          </Jumbotron>
        </Container>
      </div>
    </>
  );
}
export default FoodContent;
*/

/*  const getFoodData = () => {
    setAllData(FoodData);
  }; */

/*  useEffect(() => {
  
    getFoodData();
  }, []); */

/*
import React, { useEffect, useState } from "react";
import { Options } from "../utils/Options";
import { paginate } from "../utils/paginate";
import { FoodData } from "../utils/foodData";
import Count from "./Reusable-components/count";
import { Button, Card, Col, FormControl } from "react-bootstrap";
import FootItems from "./Reusable-components/foodItem";
import { Container, Jumbotron, Row } from "react-bootstrap";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import Pagination from "../Components/Reusable-components/Pagination";

function FoodContent({ searchField }) {
  const [pageSize] = useState(4);
  const [currentPage, setCurrentPage] = useState(1);
  const [distance, setDistance] = useState(0);
  const [allData, setAllData] = useState([]);
  const [select, setSelect] = useState([]);
  const [itemSelect, setItemSelect] = useState([]);
  const [searchItemField, setSearchItemsField] = useState("");

  const getOptions = () => {
    setSelect(Options);
  };

  const getFoodData = () => {
    setAllData(FoodData);
  };
  useEffect(() => {
    getOptions();
    getFoodData();
  }, []);

  const filterItems = allData.filter((m) => {
    if (
      searchField &&
      !m.item.toLowerCase().includes(searchField.toLowerCase())
    ) {
      return false;
    }
    if (
      itemSelect.length > 0 &&
      !itemSelect.some((catagory) => m.foodChoices.includes(catagory))
    ) {
      return false;
    }
    if (
      searchItemField &&
      m.ingredient.toLowerCase().includes(searchItemField.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const onPreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const onNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleCheckCatagories = (e) => {
    if (e.target.checked) {
      setItemSelect(itemSelect.concat(e.target.name));
    } else {
      setItemSelect(
        itemSelect.filter((catagory) => e.target.name !== catagory)
      );
    }
  };

  const paginatedItem = paginate(filterItems, currentPage, pageSize);

  console.log("select", select);
  return (
    <>
      <div className="m-2">
        <Container
          style={{
            backgroundColor: "#fff",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            height: "100vh",
          }}
        >
          <Jumbotron>
            <Container className="m-4 pt-5">
              <>
                <Row>
                  <Col sm={12} md={6} lg={3} my={1}>
                    <Count item={filterItems} label="result" />
                  </Col>
                  <Col>
                    <Button
                      variant="dark"
                      size="m"
                      style={
                        {
                           width: "100px"
                        }
                      }
                    >
                      full-meal
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="dark"
                        size="m"
                      style={{  width: "115px", textAlign: "center" }}
                    >
                      course-meal
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="dark"
                      size="m"
                      style={
                        {
                          width: "100px"
                        }
                      }
                    >
                      apetizer
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="dark"
                      size="m"
                      style={
                        {
                          width: "100px"
                        }
                      }
                    >
                      drinks
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      variant="dark"
                      size="m"
                      style={
                        {
                          width: "100px"
                        }
                      }
                    >
                      children's
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <>
                    <Col sm={12} md={10} lg={3}>
                      <Card
                        style={{
                          height: "50rem",
                          backgroundColor: "black",
                          borderRadius: "26px",
                        }}
                      >
                        <Card.Body className="text-right m-3">
                          <>
                            <h5 className="m-1 mt-4" style={{ color: "gray" }}>
                              Price
                            </h5>
                            <Form.Group controlId="formBasicRange">
                              <OverlayTrigger
                                placement="top"
                                overlay={
                                  <Tooltip>
                                    {distance}
                                    {"   "}€
                                  </Tooltip>
                                }
                              >
                                <Form.Control
                                  style={{ width: "12rem" }}
                                  type="range"
                                  className="mt-3"
                                  placement="top"
                                  defaultValue="{distance}"
                                  onChange={(e) => setDistance(e.target.value)}
                                />
                              </OverlayTrigger>
                            </Form.Group>
                          </>
                          <h4 className="m-1 mt-5" style={{ color: "gray" }}>
                            Foot Choices
                          </h4>
                          <>
                            <Form.Group
                              as={Row}
                              className="mt-4"
                              style={{ color: "#fff" }}
                            >
                              <Col sm={10}>
                                {select.foodChoices &&
                                  select.foodChoices?.map((i) => {
                                    return (
                                      <div
                                        key={i.id}
                                        style={{
                                          display: "flex",
                                          overflow: "auto",
                                          alignItems: "center",
                                          flexDirection: "row",
                                          justifyContent: "flex-start",
                                        }}
                                      >
                                        <Form.Check
                                          className=""
                                          style={{ color: "gray" }}
                                          type="checkbox"
                                          name={i.label}
                                          id={`default-${i.label}`}
                                          onClick={handleCheckCatagories}
                                        />
                                        <span>{i.label}</span>
                                      </div>
                                    );
                                  })}
                              </Col>
                            </Form.Group>
                          </>
                          <>
                            <Form.Group
                              as={Col}
                              controlId="formGridCity"
                              className="mt-2"
                            >
                              <Form.Label style={{ color: "gray" }}>
                                <h4
                                  className="m-1 mt-5"
                                  style={{ color: "gray" }}
                                >
                                  {" "}
                                  Alergic?
                                </h4>
                              </Form.Label>
                              <FormControl
                                value={searchItemField || ""}
                                placeholder="type anything"
                                onChange={(e) =>
                                  setSearchItemsField(e.target.value)
                                }
                              />
                            </Form.Group>
                          </>
                        </Card.Body>
                      </Card>
                    </Col>
                  </>
                  <Col sm={12} md={10} lg={9}>

                    <FootItems data={paginatedItem} />
                    <Container className="justify-content-center mt-2">
                      <Pagination
                        pageSize={pageSize}
                        onNextPage={onNextPage}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                        onPreviousPage={onPreviousPage}
                        itemsCount={filterItems?.length}
                      />
                    </Container>
                  </Col>
                </Row>
              </>
            </Container>
          </Jumbotron>
        </Container>
      </div>
    </>
  );
}

export default FoodContent;


*/
