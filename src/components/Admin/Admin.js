import React from "react";
import AddProduct from "../AddProduct/AddProduct";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import ManageProduct from "../ManageProduct/ManageProduct";
import { Container, Row, Col } from "react-bootstrap";

const Admin = () => {
  let { path, url } = useRouteMatch();
  console.log(path);
  return (
    <Container>
      <Row>
        <Col>
          <h3>Admin Area</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link to={`${url}/manageProduct`}>Manage Product</Link>
          <Link to={`${url}/addProduct`}>Add Product</Link>
        </Col>
      </Row>
      <Row>
        <Switch>
          <Route exact path={`${path}`}>
            <ManageProduct />
          </Route>

          <Route exact path={`${path}/addProduct`}>
            <AddProduct />
          </Route>

          <Route exact path={`${path}/manageProduct`}>
            <ManageProduct />
          </Route>
        </Switch>
      </Row>
    </Container>
  );
};

export default Admin;
