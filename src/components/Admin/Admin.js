import React from "react";
import AddProduct from "../AddProduct/AddProduct";
import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import ManageProduct from "../ManageProduct/ManageProduct";
import { Container, Row, Col } from "react-bootstrap";

const Admin = () => {
  let { path, url } = useRouteMatch();
  return (
    <Container className="bg-light">
      <Row>
        <Col md={3} className="bg-color sidebar">
          <h3 className="pl-2 pt-3">Food Market</h3>
          <ul className="py-4 px-2">
            <li>
              <Link to={`${url}/manageProduct`}>Manage Product</Link>
            </li>
            <li>
              <Link to={`${url}/addProduct`}>Add Product</Link>
            </li>
          </ul>
        </Col>
        <Col md={9} className="py-3">
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
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;
