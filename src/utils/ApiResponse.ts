
export class ApiRespinse{

    static successResponse(res,msg){
        var data = {
            status: 200,
            message: msg
        };
        return res.status(200).json(data);
    }

    static successResponseWithData(res,msg,data){
        var resData = {
            status: 1,
            message: msg,
            data: data
        };
        return res.status(200).json(resData);
    }


    static ErrorResponse = function (res, msg) {
        var data = {
            status: 500,
            message: msg,
        };
        return res.status(500).json(data);
    };
    
    static notFoundResponse = function (res, msg) {
        var data = {
            status: 404,
            message: msg,
        };
        return res.status(404).json(data);
    };
    
    static validationErrorWithData = function (res, msg, data) {
        var resData = {
            status: 400,
            message: msg,
            data: data
        };
        return res.status(400).json(resData);
    };
    
    static unauthorizedResponse = function (res, msg) {
        
        var data = {
            status: 401,
            message: msg,
        };
        return res.status(401).json(data);
    };
    
    static tokenExpiredResponse = function (res, msg) {
        var data = {
            status: 408,
            message: msg,
        };
        return res.status(408).json(data);
    }

}