import { Card, CardDeck, Container } from 'react-bootstrap'
import { EmojiHeartEyesFill } from 'react-bootstrap-icons'
import { useHistory } from 'react-router'
import React, { useState } from 'react';
import ModalConfirm from '../Modal/Modal';

export default function FootItems({ data /*  numberOfitemsShown = 4  */ }) {
  const history = useHistory();
  const [textModal, setTextModal] = useState('');
  const [modalback, setModalBack] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [item, setItem] = useState({});

  const clickClose = () => {
    setTextModal('');
    setModalBack(false);
    setVisibleModal(false);
  }

  const clickConfirm = () => {
    console.log("Confirmed");
  }

  const onItemClick = (i) => {
    console.log(i);
    setItem(i);
    setVisibleModal(true);
  }

  return (
    <>
      {data.slice(0, 2).map((i, index) => {
        const { id, image, item, price, ingredient } = i
        return (
          <Container>
            <CardDeck
              key={index}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                flexDirection: 'row',
              }}
            >
              <Card
                style={{
                  width: '19rem',
                  margin: '0.5rem',
                  border: 'none',
                }}
                onClick={() => onItemClick(i)}
              >
                {image === '' ? (
                  <EmojiHeartEyesFill
                    style={{
                      color: '#000',
                      cursor: 'pointer',
                    }}
                    width={100}
                    height="17.5rem"
                    onClick={() => history.push(`/item/${id}`)}
                  />
                ) : (
                  <Card.Img
                    variant="top"
                    src={image}
                    style={{
                      cursor: 'pointer',
                      borderRadius: '26px',
                      height: '17.5rem',
                      objectFit: 'cover',
                    }}
                    onClick={() => history.push(`/item/${id}`)}
                  ></Card.Img>
                )}
                <Card.ImgOverlay style={{ color: '#fff', width: '100%' }}>
                  <div
                    className=""
                    style={{
                      width: '',
                      marginTop: '10rem',
                      position: 'relative',
                      backgroundColor: 'black',
                    }}
                  >
                    <Card.Title>
                      {' '}
                      <h4>{item}</h4>
                    </Card.Title>
                    <Card.Text>
                      <h5>{ingredient}</h5>
                      <h5>{price} € (INC. Vat)</h5>
                    </Card.Text>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </CardDeck>
            <ModalConfirm
              textModal={textModal}
              modalback={modalback}
              visibleModal={visibleModal}
              data={item}
              itemList={data}
              clickClose={clickClose}
              clickConfirm={clickConfirm} />
          </Container>
        )
      })}
      {/*  <Container>
        <CardDeck
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {data.map((i, index) => {
            const { id, image, item, price, ingredient } = i;
            return (
              <Card
                key={index}
                style={{
                  width: "19rem",
                  margin: "0.5rem",
                  border: "none",
                }}
              >
                {image === "" ? (
                  <EmojiHeartEyesFill
                    style={{ color: "#000", cursor: "pointer" }}
                    width={100}
                    height="17.5rem"
                    onClick={() => history.push(`/item/${id}`)}
                  />
                ) : (
                  <Card.Img
                    variant="top"
                    src={image}
                    style={{
                      cursor: "pointer",
                      borderRadius: "26px",
                      height: "17.5rem",
                      objectFit: "cover",
                    }}
                    onClick={() => history.push(`/item/${id}`)}
                  ></Card.Img>
                )}
                <Card.ImgOverlay style={{ color: "#fff", width: "100%" }}>
                  <div
                    className=""
                    style={{
                      width: "",
                      marginTop: "10rem",
                      position: "relative",
                      backgroundColor: "black",
                    }}
                  >
                    <Card.Title>
                      {" "}
                      <h4>{item}</h4>
                    </Card.Title>
                    <Card.Text>
                      <h5>{ingredient}</h5>
                      <h5>{price} € (INC. Vat)</h5>
                    </Card.Text>
                  </div>
                </Card.ImgOverlay>
              </Card>
            );
          })}
        </CardDeck>
      </Container> */}
    </>
  )
}
