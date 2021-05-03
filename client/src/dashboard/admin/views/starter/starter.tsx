import React, { useEffect } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Row, Input, Col, Badge, Table } from 'reactstrap';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../reducers';
import { useHistory } from "react-router-dom";
import * as AuthActions from "../../../../actions/auth";
import * as EmpService from "../../../../actions/emp";
import { useActions } from '../../../../actions';

declare var window: any;
declare var $: any;
const Starter = () => {

    const auth = useSelector((state: RootState) => state.auth);
    const empStore = useSelector((state: RootState) => state.emp);
    const empService = useActions(EmpService);
    const history = useHistory();

    const authActions = useActions(AuthActions);
    const chagneRoute = (url: string) => {
        history.push(url);
    }
    useEffect(() => {
        empService.getEmp();
    }, [])
    return (
        <div>
            <Row>
                <Col sm={12} xs={12} lg={12}>
                    {/* no-overflow */}
                    <Card className="">
                        <CardBody className="">
                            <Row>
                                <Col sm={6} xs={6} lg={3}>
                                    <Card className="blue-card no-overflow">
                                        <CardTitle className="bg-light border-bottom p-3 mb-0">
                                            <i className="mdi mdi-apps mr-2 d-none d-sm-inline"></i>Employees</CardTitle>
                                        <CardBody className="">
                                            <div onClick={() => chagneRoute("/admin/employee")}>
                                                {empStore && empStore.emp &&
                                                    <h1 className="dash-counter">
                                                        {empStore.emp.length || 0}
                                                    </h1>
                                                }
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>                               
                            </Row>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div >
    );
}

export default Starter;
