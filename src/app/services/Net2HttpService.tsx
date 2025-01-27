import { Net2Context, ctx } from "./Net2Ctx";

class Net2HttpClient {
    /*
    * getToken : retrieves a token from the service
    */
    async getToken() {
        const response = await fetch(ctx.srv + "/api/v1/authorization/tokens", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({'username': ctx.username, 'password': ctx.password, 'grant_type': 'password', 'client_id': ctx.clientId})
        });
        if(!response.ok) {
            console.log("error fetching data");
        }
        return await response.json();
    }

    /*
    * getUsers : retrives all the users from the service
    */
    async getUsers(token: string) {
        try {
            const response = await fetch(ctx.srv + "/api/v1/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "applicationi/json",
                        "Authorization" : "bearer " + token
                    },
            });
            if(!response.ok) {
                throw new Error("getUsers - Error Fetching data : " + response.statusText);
            }
            return await response.json();
        } catch(error) {
            console.log(error);
        }
    }

     /*
    * getUserById : retrives a unique user
    */
     async getUserById(id: string, token: string) {
        try {
            const response = await fetch(ctx.srv + "/api/v1/users/" + id, {
                    method: "GET",
                    headers: {
                        "Content-Type": "applicationi/json",
                        "Authorization" : "bearer " + token
                    },
            });
            if(!response.ok) {
                throw new Error("getUsers - Error Fetching data : " + response.statusText);
            }
            return await response.json();
        } catch(error) {
            console.log(error);
        }
    }

    /*
    * getDepartments : retrives all the departments from the service
    */
    async getDepartments(token: string) {
        const response = await fetch(ctx.srv + "/api/v1/departments", {
                method: "GET",
                headers: {
                    "Content-Type": "applicationi/json",
                    "Authorization" : "bearer " + token
                },
        });
        return await response.json();
    }

}//end of Net2HttpClient

export const Net2Client = new Net2HttpClient();