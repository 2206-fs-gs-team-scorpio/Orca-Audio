import React, { Fragment } from "react";
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import { addToCart } from "../store/cart";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { deleteProductThunk } from "../store/products";

const ProductCard = (props) => {
  const { id, name, imageURL, price, category, noiseCancelling, inventory } =
    props.product;

  const history = useHistory();

  const editProduct = () => {
    let path = `/manage/products/${id}/edit`;
    history.push(path);
  };

  const deleteProduct = (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      props.deleteProduct(id);
    }
  };

  const addNotify = () => toast("Item added to cart!");
  const deleteNotify = () => toast("Product Successfully Deleted!");

  return (
    <div data-aos="fade-up" data-aos-duration="1500">
      <Col>
        <Card>
          <Link to={`/products/${id}`}>
            <Card.Img
              src={imageURL}
              style={{ objectFit: "contain", height: "300px", width: "300px" }}
            />
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text>${price}</Card.Text>
              {props.isAdmin &&
                history.location.pathname === "/manage/products" && (
                  <Card.Text>Inventory: {inventory}</Card.Text>
                )}
            </Card.Body>
          </Link>
          <Card.Footer>
            {history.location.pathname !== "/manage/products" && (
              <Button
                variant="primary"
                onClick={() => {
                  props.onClick(props.product);
                  addNotify();
                }}
              >
                Add to Cart
              </Button>
            )}
            {props.isAdmin && history.location.pathname === "/manage/products" && (
              <Fragment>
                <Button variant="warning" onClick={editProduct}>
                  Edit Product
                </Button>
                <Button
                  variant="danger"
                  onClick={() => {
                    deleteProduct(id);
                  }}
                >
                  Delete Product
                </Button>
              </Fragment>
            )}
          </Card.Footer>
        </Card>
      </Col>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    deleteProduct: (id) => dispatch(deleteProductThunk(id, history)),
  };
};

export default connect(null, mapDispatchToProps)(ProductCard);
