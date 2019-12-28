import axios from "axios";
import jwtDecode from 'jwt-decode';

export const signIn = (loginCredentials, history, handleToggle)=>{
    return function (dispatch, getState) {
        axios.post("/login", loginCredentials).then(
        (response) => {
            console.log("client login response =", response.data);
            let location = {};
            if(loginCredentials.userType=="student"){
                switch (response.data.result) {
                    case 0: //Login failed, User not exist.
                        alert("Login failed, User not exist.");
                        break;
                    case 1: { // Login succeed.
                        localStorage.setItem("jwtToken", jwtDecode(response.data.token.token));
                        let studentInfo = {
                            "username": loginCredentials.username,
                            "email": response.data.investment_details[0].EMAIL || "",
                            "university": response.data.investment_details[0].UNIVERSITY || "",
                            "project_name": response.data.investment_details[0].PROJECTNAME || "",
                            "industry": response.data.investment_details[0].INDUSTRY || "",
                            "investment_amount": response.data.investment_details[0].EXPECTATION || "",
                            "Date_start": response.data.investment_details[0].PROJECT_START_DATE || "",
                            "Date_end": response.data.investment_details[0].PROJECT_END_DATE || "",
                            "project_description": response.data.investment_details[0].DESCRIPTION || "",
                        };
                        dispatch(setCurrentUser(studentInfo, "student"));
                        location = {
                            pathname: '/student',
                        }
                        history.push(location);
                        handleToggle();
                        break;
                    }
                    case -1: //database error
                        alert("database error, please check your network and try again later.");
                        break;
                    case -2: //Login failed, wrong password
                        alert("Login failed, wrong password.");
                        break;
                    case -3: //student only: Login failed, db error
                        alert("Login failed, db error.");
                        break;
                    case 2: { //student only: Login successful, user does not have project
                        console.log("Login successful, user does not have project, token/userType =", response.data.token.token, loginCredentials.userType);
                        localStorage.setItem("jwtToken", jwtDecode(response.data.token.token));
                        let studentInfo = {
                            "username": loginCredentials.username,
                            "email": "",
                            "university": "",
                            "project_name": "",
                            "industry": "",
                            "investment_amount": "",
                            "Date_start": "",
                            "Date_end": "",
                            "project_description": "",
                        };
                        dispatch(setCurrentUser(studentInfo, "student"));
                        location = {
                            pathname: '/student',
                        }
                        history.push(location);
                        handleToggle();
                        break;
                    }
                    default:
                        console.log("Login received unexpected return code: ", response.data.result);
                        break;
                }
            } else if (loginCredentials.userType=="investor"){
                switch (response.data.result) {
                    case 0: //Login failed, User not exist.
                        alert("Login failed, User not exist.");
                        break;
                    case 1: //Login succeed.
                        // console.log("Login successful, token/userType =", response.data.token.token, loginCredentials.userType);
                        localStorage.setItem("jwtToken", jwtDecode(response.data.token.token));
                        let investorInfo = {
                            "username": loginCredentials.username,
                            "email": response.data.email,
                            "phone": response.data.phone,
                            "address1": response.data.address1,
                            "address2": response.data.address2,
                            "city": response.data.city,
                            "state": response.data.state,
                            "zip": response.data.zip,
                            "total_funds": response.data.total_funds,
                            "project_invested": response.data.project_invested,
                        }
                        dispatch(setCurrentUser(investorInfo, "investor"));
                        location = {
                            pathname: '/invest',
                            state: {
                                "username": loginCredentials.username,
                            }
                        }
                        history.push(location);
                        handleToggle();
                        break;
                    case -1: //database error
                        alert("database error, please check your network and try again later.");
                        break;
                    case -2: //Login failed, wrong password
                        alert("Login failed, wrong password.");
                        break;
                    default:
                        console.log("Login investor received unexpected return code: ", response.data.result);
                        break;
                }
            }
        })
    }
}

export const signUp = (signUpCredentials, history, handleToggle)=>{
    return function (dispatch, getState) {
        axios.post("/signup", signUpCredentials).then(
            (response) => {
                console.log("client signup response.data =", response.data);
                if(signUpCredentials.userType=="student") {
                    switch (response.data.result) {
                        case 0: //Signup failed, duplicate username
                            alert("Signup failed, username already exist.");
                            break;
                        case 1: {
                            console.log("Login successful, user does not have project, token/userType =", response.data.token.token, signUpCredentials.userType);
                            localStorage.setItem("jwtToken", jwtDecode(response.data.token.token));
                            let studentInfo = {
                                "username": signUpCredentials.username,
                                "email": "",
                                "university": "",
                                "project_name": "",
                                "industry": "",
                                "investment_amount": "",
                                "Date_start": "",
                                "Date_end": "",
                                "project_description": "",
                            };
                            dispatch(setCurrentUser(studentInfo, "student"));
                            history.push('/student');
                            handleToggle();
                            break;
                        }
                        case -1: //database error
                            alert("database error, please check your network and try again later.");
                            break;
                        case -2: //Signup failed! username invalid
                            alert("Signup failed, username invalid.");
                            break;
                        case -3: //Signup failed! weak password
                            alert("Signup failed, weak password.");
                            break;
                        default:
                            console.log("Sign up received unexpected return code: ", response.data.result);
                            break;
                    }
                }
                else if (signUpCredentials.userType=="investor") {
                    switch (response.data.result) {
                        case 0: //Signup failed, duplicate username
                            alert("Signup failed, username already exist.");
                            break;
                        case 1: {
                            let token = response.data.result;
                            console.log("Signup success, token =", token);
                            localStorage.setItem("jwtToken", token);
                            let userInfo = {
                                "username": signUpCredentials.username,
                                "email": "",
                                "university": "",
                                "project_name": "",
                                "industry": "",
                                "investment_amount": "",
                                "Date_start": "",
                                "Date_end": "",
                                "project_description": "",
                                "project_invested" : [],
                            }
                            dispatch(setCurrentUser(userInfo, "investor"));
                            const location = {
                                pathname: signUpCredentials.userType=="student" ? '/student' : '/invest',
                                state: {
                                    "username": signUpCredentials.username,
                                }
                            }
                            history.push(location);
                            handleToggle();
                            break;
                        }
                        case -1: //database error
                            alert("database error, please check your network and try again later.");
                            break;
                        case -2: //Signup failed! username invalid
                            alert("Signup failed, username invalid.");
                            break;
                        case -3: //Signup failed! weak password
                            alert("Signup failed, weak password.");
                            break;
                        default:
                            console.log("Sign up received unexpected return code: ", response.data.result);
                            break;
                    }
                }
            }
        ).catch((error) => {
            console.log("client signup error =", error);
        });
    }
}

export const setCurrentUser = (user, role) => {// reducer/auth.js
    return function (dispatch) {
        console.log("setUser user/role =", user, role);
        dispatch({
            "type" : "SET_USER",
            user,
            role
        });
    }
}

export const updateStudent = (updatedDocument)=>{
    return function (dispatch, getState) {
        console.log("updateStudent updatedDocument =", updatedDocument);
        axios.post("/updateStudent", updatedDocument).then(
        (res) => {
                if(res.data.result == -1){
                    console.log("Updating student failed, server database err!");
                    alert("Failed, server database error!");
                    return;
                } else if(res.data.result == 1){
                    console.log("Updating student project succeed!!", updatedDocument);
                    dispatch({"type":"UPDATESTUDENTPROJECT", "newStudentProject" : updatedDocument});
                    alert("Updating student project succeed!");
                    return;
                } else {
                    console.log("Updating student project, res =", res);
                }
            }
        )
    }
}

export const updateInvestor = (updatedDocument)=>{
    return function (dispatch, getState) {
        console.log("updateInvestor updatedDocument =", updatedDocument);
        axios.post("/updateInvestor", updatedDocument).then(
            (res) => {
                console.log("client updateInvestor, received response =", res)
                if(res.data.result == -1){
                    console.log("Updating investor failed, server database err!");
                    alert("Updating failed, server database error!");
                    return;
                } else if(res.data.result == 1){
                    console.log("Updating investor succeed!!");
                    dispatch({"type":"UPDATEINVESTOR", "newInvestor" : updatedDocument});
                    alert("Updating investor info succeed!");
                    return;
                }
            }
        )
    }
}

export const logout = ()=>{
    return function (dispatch, getState) {
        console.log("logInUpActions.js logout setting user as empty.");
        dispatch(setCurrentUser({}, ""));
    }
}

export const doInvestment = (updatedDocument, project)=>{
    return function (dispatch, getState) {
        console.log("doInvestment updatedDocument =", updatedDocument);
        axios.post("/doInvestment", updatedDocument).then(
            (res) => {
                if(res.data.result == -1){
                    console.log("client doInvestment failed, server database err!");
                    alert("Failed, server database err!");
                    return;
                } else if(res.data.result == 1){
                    dispatch({"type":"DOINVESTMENT", "newInvestment" : project});
                    alert("Investment succeed!");
                    return;
                }
            }
        )
    }
}
