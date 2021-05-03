const option = {
    definition: {
        info: {
            title: "Demo APP Employee Endpoint",
            description: "Open API Documntation for Demo APP",
            version: "1.0.0",
        },
        tags: [{
            name: "Employee"
        }, {
            name: "Auth"
        }],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },
            schemas: {
                Emps: {
                    type: Array,
                    properties: [{
                        _id: {
                            type: String,
                            description: "Mongo Id of the Employee",
                            example: "121231231231"
                        },
                        Id: {
                            type: String,
                            description: "Id of the Employee",
                            example: "10002"
                        },
                        name: {
                            type: String,
                            description: "Name of the book",
                            example: "Swagger Tutorial Book"
                        },
                        jobTitle: {
                            type: String,
                            description: "Job Title",
                            example: "Andriod Developer"
                        },
                        department: {
                            type: String,
                            description: "Department",
                            example: "HR"
                        },
                        loction: {
                            type: String,
                            description: "Location",
                            example: "Delhi"
                        },
                        age: {
                            type: String,
                            description: "Age of Employee",
                            example: "23"
                        },
                        salary: {
                            type: String,
                            description: "Salary of Employee",
                            example: "25000"
                        }
                    }]
                },
                Emp: {
                    type: Object,
                    properties: {
                        _id: {
                            type: String,
                            description: "Mongo Id of the Employee",
                            example: "121231231231"
                        },
                        Id: {
                            type: String,
                            description: "Id of the Employee",
                            example: "10002"
                        },
                        name: {
                            type: String,
                            description: "Name of the book",
                            example: "Swagger Tutorial Book"
                        },
                        jobTitle: {
                            type: String,
                            description: "Job Title",
                            example: "Andriod Developer"
                        },
                        department: {
                            type: String,
                            description: "Department",
                            example: "HR"
                        },
                        loction: {
                            type: String,
                            description: "Location",
                            example: "Delhi"
                        },
                        age: {
                            type: String,
                            description: "Age of Employee",
                            example: "23"
                        },
                        salary: {
                            type: String,
                            description: "Salary of Employee",
                            example: "25000"
                        }
                    }
                },
                Login: {
                    type: Object,
                    properties: {
                        token: {
                            type: String,
                            description: "Token",
                            example: "121231223423423431231"
                        },
                        refreshToken: {
                            type: String,
                            description: "Refesh Token",
                            example: "32434234234234"
                        },
                        user: {
                            type: Object,
                            description: "User details"
                        }
                    }
                }
            }
        }
    },
    apis: ["./routes/api/emp.js", "./routes/api/auth.js"]
}

module.exports = option