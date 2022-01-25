import { request, versionApi } from "./base";
import { User, Version, Licence } from "./services";

// request.auth = auth;
// request.ticket = Ticket;
request.user = User;
request.licence = Licence;
versionApi.version = Version;
export { request, versionApi };
