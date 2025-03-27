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
                        "Content-Type": "application/json",
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
                        "Content-Type": "application/json",
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
    * getUserTokens : retrives tokens for a user
    */
     async getUserTokens(id: string, token: string) {
        try {
            const response = await fetch(ctx.srv + "/api/v1/users/" + id + "/tokens", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization" : "bearer " + token
                    },
            });
            if(!response.ok) {
                throw new Error("getUserTokens - Error Fetching data : " + response.statusText);
            }
            return await response.json();
        } catch(error) {
            console.log(error);
        }
    }

    async setUserTokenLost(badgeId: string, userId: string, tokenId: string, token: string){
        try {
            const response = await fetch(ctx.srv + "/api/v1/users/" + userId + "/tokens/" + badgeId, {
                    method: "PUT",
                    body: JSON.stringify({id: badgeId, tokenType:"Proxcard", tokenValue:tokenId, isLost:"True"}),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization" : "bearer " + token
                    },
            });
            if(!response.ok) {
                throw new Error("setUserTokenLost - Error Fetching data : " + response.statusText);
            }
            return response.status;
        } catch(error) {
            console.log(error);
        }
    }

    async setUserTokenFound(badgeId: string, userId: string, tokenId: string, token: string){
        try {
            const response = await fetch(ctx.srv + "/api/v1/users/" + userId + "/tokens/" + badgeId, {
                    method: "PUT",
                    body: JSON.stringify({id: badgeId, tokenType:"Proxcard", tokenValue:tokenId, isLost:"False"}),
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization" : "bearer " + token
                    },
            });
            if(!response.ok) {
                throw new Error("setUserTokenFound - Error Fetching data : " + response.statusText);
            }
            return response.status;
        } catch(error) {
            console.log(error);
        }
    }

     /*
    * getUserDepartments : retrives Departments for a user
    */
     async getUserDepartments(id: string, token: string) {
        try {
            const response = await fetch(ctx.srv + "/api/v1/users/" + id + "/departments", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization" : "bearer " + token
                    },
            });
            if(!response.ok) {
                throw new Error("getUserDepartments - Error Fetching data : " + response.statusText);
            }
            return await response.json();
        } catch(error) {
            console.log(error);
        }
    }

     /*
    * getUserDoorPermissionSet : retrives DoorPermissionSet for a user
    */
     async getUserDoorPermissionSet(id: string, token: string) {
        try {
            const response = await fetch(ctx.srv + "/api/v1/users/" + id + "/doorpermissionset", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization" : "bearer " + token
                    },
            });
            if(!response.ok) {
                throw new Error("getUserDepartments - Error Fetching data : " + response.statusText);
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
                    "Content-Type": "application/json",
                    "Authorization" : "bearer " + token
                },
        });
        return await response.json();
    }

    /*
    * getDoors : retrives all the departments from the service
    */
    async getDoors(token: string) {
        const response = await fetch(ctx.srv + "/api/v1/doors", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : "bearer " + token
                },
        });
        return await response.json();
    }

    async setCard(id: string, tokenId: number, token: string) {
        try {
            const response = await fetch(ctx.srv + "/api/v1/users/" + id + "/tokens", {
                method: "POST",
                body: JSON.stringify({'tokenType': 'ProxCard', 'tokenValue': tokenId, 'isLost': 'False'}),
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": "bearer " + token,
                },
            });
            if(!response.ok) {
                return response.text().then(text => {throw new Error(text)})
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log("Echec création badge : " + error);
        }
    }

}//end of Net2HttpClient

export const Net2Client = new Net2HttpClient();