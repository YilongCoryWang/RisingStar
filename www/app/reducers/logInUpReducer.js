let initState = {
    "authRole" : "",
    "investor" : {
        "username": "",
        "email": "",
        "university": "",
        "project_name": "",
        "industry": "",
        "investment_amount": "",
        "Date_start": "",
        "Date_end": "",
        "project_description": "",
        "project_invested" : [],
    },
    "student" : {
        "username" : "",
        "email": "",
        "university": "",
        "project_name": "",
        "industry": "",
        "investment_amount": "",
        "Date_start": "",
        "Date_end": "",
        "project_description": "",
    },
}

export default (state = initState, action)=>{
    switch (action.type) {
        case "SET_USER":
            if(action.role == "investor"){
                console.log("SET_USER role/investor =", action.role, action.investor);
                return {
                    authRole:action.role,
                    investor:action.user,
                }
            } else {
                console.log("SET_USER role/student =", action.role, action.student);
                return {
                    authRole:action.role,
                    student:action.user,
                }
            }

        case "DOINVESTMENT":
            let newInvestments = state.investor.project_invested;
            newInvestments.push(action.newInvestment);
            // console.log("investReducer DOINVESTMENT new state =", {
            //     ...state,
            //     "investor" : {
            //         ...state.investor,
            //         project_invested : newInvestments
            //     },
            // });
            return {
                ...state,
                "investor" : {
                    ...state.investor,
                    project_invested : newInvestments
                },
            }

        case "UPDATESTUDENTPROJECT":
            return {
                ...state,
                "student" : {
                    ...state.student,
                    ...action.newStudentProject,
                }
            }

        case "UPDATEINVESTOR":
            return {
                ...state,
                "investor" : {
                    ...state.investor,
                    ...action.newInvestor,
                }
            }
        default:
            console.log("logInUpReducer received unrecognized action.type =", action.type);
            break;
    }

    return state;
}