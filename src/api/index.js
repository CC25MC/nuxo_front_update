import { request } from "./base";
import { auth, Ticket, User } from "./services";

request.auth = auth;
request.ticket = Ticket;
request.user = User;

export default request;