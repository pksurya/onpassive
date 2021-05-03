import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    Col, Row, Card, CardBody, CardTitle, Button, Table, Input, Popover, PopoverBody, Pagination, PaginationItem, PaginationLink
} from 'reactstrap';
import { useActions } from '../../../../actions';
import { RootState } from '../../../../reducers';
import * as EmpService from "../../../../actions/emp";
import { deepClone } from '../../../../utility';
import { constant } from '../../../../constant';
declare var window: any;
declare var confirm: any;
declare var $: any;

interface IEmployee {
    name: string,
    jobTitle: string,
    department: string,
    location: string,
    age: string,
    salary: string,
    sort: string,
    limit: number,
    page: number
}

const EmpComponent = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const employee = useSelector((state: RootState) => state.emp);
    const empService = useActions(EmpService);
    const InitEmp: IEmployee = {
        name: "",
        jobTitle: "",
        department: "",
        location: "",
        age: "",
        salary: "",
        sort: "",
        limit: 5,
        page: 0
    }
    const [page, setPage] = useState(0);
    const [showAdd, setShowAdd] = useState(false);
    const [emp, setEmp] = useState(InitEmp);
    const [search, setSearch] = useState(InitEmp);
    const [isSearch, setIsSearch] = useState(false);
    const [isEdit, setEdit] = useState(false);
    const [editObj, setEditObj] = useState({});

    const handler = (e: any) => {
        let k = e.target.name;
        let v = e.target.value;
        setEmp({ ...emp, [k]: v });
    }
    const fhandler = (e: any) => {
        setIsSearch(true);
        setSearch({ ...search, [e.target.name]: e.target.value })
    }

    const add = () => {
        if (validate()) {
            if (isEdit) {
                let a = deepClone(editObj);
                a.name = emp.name;
                a.jobTitle = emp.jobTitle;
                a.department = emp.department;
                a.location = emp.location;
                a.age = emp.age;
                a.salary = emp.salary;
                empService.updateEmp(a);
            }
            else {
                let a = deepClone(emp);
                empService.addEmp(a);
            }
            reset();
        }
    }
    const validate = () => {
        if (emp.name == "") {
            alert("Employee name is mandatory");
            return false;
        }
        else if (emp.jobTitle == "") {
            alert("Job Title is mandatory");
            return false;
        }
        else if (emp.department == "") {
            alert("Department is mandatory");
            return false;
        }
        else if (emp.location == "") {
            alert("Location is mandatory");
            return false;
        }
        else if (emp.salary == "") {
            alert("Salary is mandatory");
            return false;
        }
        else if (emp.age == "") {
            alert("Age is mandatory");
            return false;
        }
        else {
            return true;
        }
    }
    const filter = () => {
        setPage(0);
        reload(search);
    }
    const reset = () => {
        setPage(0);
        setShowAdd(false);
        setEdit(false);
        setEditObj({});
        setEmp(InitEmp);
    }
    const freset = () => {
        setIsSearch(false);
        setSearch(InitEmp);
        reload(InitEmp);
    }
    const remove = (x: any) => {
        var result = confirm("Want to delete?");
        if (result) {
            empService.deleteEmp(x);
        }
    }
    const edit = (x: any) => {
        setShowAdd(true);
        setEdit(true);
        setEmp({ ...x });
        setEditObj(x);
    }
    const getPages = () => {
        let total = employee.count;
        let limit = InitEmp.limit;
        let pages = Math.ceil(total / limit);
        var arr: any[] = [];
        for (var i = 0; i < pages; i++) {
            arr.push(
                <PaginationItem active={page == i}>
                    <PaginationLink onClick={() => setPage(i)}>{i + 1}</PaginationLink>
                </PaginationItem>);
        }
        return arr;
    }
    const reload = (filter: any) => {
        empService.getEmp(filter);
        empService.getEmpCount(filter);
    }
    useEffect(() => {
        reload(search);
    }, [])
    useEffect(() => {
        empService.getEmp({ ...search, page: page });
    }, [page])
    return (
        <div>
            <Row>
                <Col sm={12} xs={12} lg={12}>
                    <div>
                        <Button className="btn pull-right add-btn-rnd" onClick={() => setShowAdd(!showAdd)} color="success">{showAdd ? 'Hide' : 'Add'}</Button>
                    </div>
                </Col>
                <Col sm={12} xs={12} lg={showAdd ? 8 : 12}>
                    <Card>
                        <CardTitle className="bg-light border-bottom p-3 mb-0">
                            <Row>
                                <Col className="mt-1" xs="12" sm={12} lg={2}>
                                    <input type="text" name="name" onChange={(e) => fhandler(e)} value={search.name} className="form-control" placeholder="Search by name" />
                                </Col>
                                <Col className="mt-1" xs="12" sm={12} lg={2}>
                                    <input type="text" name="jobTitle" onChange={(e) => fhandler(e)} value={search.jobTitle} className="form-control" placeholder="Job Title" />
                                </Col>
                                <Col className="mt-1" xs="12" sm={12} lg={2}>
                                    <input type="text" name="department" onChange={(e) => fhandler(e)} value={search.department} className="form-control" placeholder="Department" />
                                </Col>
                                <Col className="mt-1" xs="12" sm={12} lg={2}>
                                    <input type="text" name="location" onChange={(e) => fhandler(e)} value={search.location} className="form-control" placeholder="Location" />
                                </Col>
                                <Col className="mt-1" xs="12" sm={12} lg={2}>
                                    <Input type="select" name="sort" className="custom-select" onChange={(e) => fhandler(e)}>
                                        <option selected={emp.sort == ""} value=''>Sort By</option>
                                        <option selected={emp.sort == "name 1"} value="name 1">Name Asc</option>
                                        <option selected={emp.sort == "name -1"} value="name -1">Name Desc</option>
                                        <option selected={emp.sort == "salary 1"} value="salary 1">Salary Asc</option>
                                        <option selected={emp.sort == "salary -1"} value="salary -1">Salary Desc</option>
                                    </Input>
                                </Col>
                                <Col className="mt-1" xs="12" sm={12} lg={2}>
                                    <Button className="btn pull-right" onClick={filter} color="success"><i className=" c-white mdi mdi-magnify"></i></Button>
                                    {isSearch ? <Button className="btn pull-right" onClick={freset} color="danger"><i className=" c-white mdi mdi-close"></i></Button>
                                        : null}
                                </Col>
                            </Row>
                        </CardTitle>
                        <CardBody>
                            <div className="d-flex align-items-center">
                            </div>
                            <Table className="no-wrap v-middle" responsive>
                                <thead>
                                    <tr className="border-0">
                                        <th className="border-0"><b>Emp Id.</b></th>
                                        <th className="border-0"><b>Name</b></th>
                                        <th className="border-0"><b>Job</b></th>
                                        <th className="border-0"><b>Department</b></th>
                                        <th className="border-0"><b>Location</b></th>
                                        <th className="border-0"><b>Age</b></th>
                                        <th className="border-0"><b>Salary</b></th>
                                        <th className="border-0"><b>Action</b></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {employee && employee.emp && employee.emp.map((x: any, i: any) =>
                                        <tr key={i}>
                                            <td>{x.Id}</td>
                                            <td>{x.name}</td>
                                            <td>{x.jobTitle}</td>
                                            <td>{x.department}</td>
                                            <td>{x.location}</td>
                                            <td>{x.age}</td>
                                            <td>{x.salary}</td>
                                            <td> <Button className="btn" color="danger" onClick={() => remove(x)} size="sm"><i className=" c-white mdi mdi-delete"></i></Button>
                                        &nbsp;<Button className="btn" color="info" onClick={() => edit(x)} size="sm"><i className=" c-white mdi mdi-pencil"></i></Button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                            <div className="pull-right">
                                <Pagination aria-label="Page navigation example">
                                    <PaginationItem disabled={page == 0}>
                                        <PaginationLink previous onClick={() => setPage(page - 1)} />
                                    </PaginationItem>
                                    {getPages()}
                                    <PaginationItem disabled={page == 0}>
                                        <PaginationLink next onClick={() => setPage(page + 1)} />
                                    </PaginationItem>
                                </Pagination>
                            </div>
                        </CardBody>
                    </Card >
                </Col>
                {showAdd &&
                    <Col sm={12} xs={12} lg={showAdd ? 4 : 12}>
                        <Card>
                            <CardTitle className="bg-light border-bottom p-3 mb-0"><i className="mdi mdi-apps mr-2"> </i>Add new Employee</CardTitle>
                            <CardBody className="">
                                <Row>
                                    <Col className="mt-1" xs="12" sm={12} lg={12}>
                                        <input type="text" name="name" onChange={(e) => handler(e)} value={emp.name} className="form-control" placeholder="Emp name" />
                                    </Col>
                                    <Col className="mt-1" xs="12" sm={12} lg={12}>
                                        <input type="text" name="jobTitle" onChange={(e) => handler(e)} value={emp.jobTitle} className="form-control" placeholder="Job Title" />
                                    </Col>
                                    <Col className="mt-1" xs="12" sm={12} lg={12}>
                                        <input type="text" name="department" onChange={(e) => handler(e)} value={emp.department} className="form-control" placeholder="Department" />
                                    </Col>
                                    <Col className="mt-1" xs="12" sm={12} lg={12}>
                                        <input type="text" name="location" onChange={(e) => handler(e)} value={emp.location} className="form-control" placeholder="Location" />
                                    </Col>
                                    <Col className="mt-1" xs="12" sm={12} lg={12}>
                                        <input type="text" name="age" onChange={(e) => handler(e)} value={emp.age} className="form-control" placeholder="Age" />
                                    </Col>
                                    <Col className="mt-1" xs="12" sm={12} lg={12}>
                                        <input type="text" name="salary" onChange={(e) => handler(e)} value={emp.salary} className="form-control" placeholder="Salary" />
                                    </Col>
                                    <Col className="mt-1" xs="12" sm={12} lg={12}>
                                        <Button className="btn pull-right" onClick={add} color="success">{isEdit ? "Save" : "Add"}</Button>
                                        {isEdit ? <Button className="btn pull-right" onClick={reset} color="danger">Cancel</Button> : null}
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                }
            </Row>
        </div >
    );
}

export default EmpComponent;
