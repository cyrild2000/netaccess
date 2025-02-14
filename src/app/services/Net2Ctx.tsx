class Net2Context {

    srv: string;
    username: string;
    password: string;
    clientId: string;
    
    constructor(srv: string, username: string, password: string, clientId: string) {
        this.srv = srv;
        this.username = username;
        this.password = password;
        this.clientId = clientId;
    }
}//end of Net2Context

export { Net2Context };
export const ctx = new Net2Context("your_server_name", "your_api_username", "your_api_pwd", "your_client_id");
export const a = !1;



