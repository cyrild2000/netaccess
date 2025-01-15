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
    * getUsers : retrives all the user from the service
    */
    async getUsers(token: string) {
        const response = await fetch(ctx.srv + "/api/v1/users", {
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