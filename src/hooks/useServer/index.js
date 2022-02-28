import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { persistState, getPersistedState } from "../../utils";

const serverAtom = atom(getPersistedState("server") ?? "");
const useServer = () => {
    const [server, setServer] = useAtom(serverAtom);

    useEffect(() => persistState("server", server), [server]);

    return {
        server, setServer
    };
};

export { useServer };