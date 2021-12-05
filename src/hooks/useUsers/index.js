import request from "../../api";
import { useMutation, useQuery } from 'react-query';
import { atom, useAtom } from "jotai";
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { persistState, getPersistedState } from "../../utils";
import { PERSISTOR_KEYS } from "../../variables";

const userAtom = atom(getPersistedState(PERSISTOR_KEYS.user) ?? {});
const authAtom = atom(getPersistedState(PERSISTOR_KEYS.auth) ?? { isAuthenticated: false, token: "" });
const useAuth = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [user, setUser] = useAtom(userAtom);
    const [auth, setAuth] = useAtom(authAtom);

    useEffect(() => persistState(PERSISTOR_KEYS.auth, auth), [auth]);
    useEffect(() => persistState(PERSISTOR_KEYS.user, user), [user]);

    const logOut = async () => {
        //eslint-disable-next-line
        try {
            await request.auth.logout();
            setUser({});
            //eslint-disable-next-line
            setAuth({ isAuthenticated: false, token: null });
            enqueueSnackbar('Cerraste Sesión ', { variant: 'success' });
        } catch (e) {
            enqueueSnackbar('Ucurrio un problema intentando cerrar sesión', { variant: 'error' });
        }



    };
    return {
        user, setUser, auth, setAuth, logOut
    };
};

// const useUsers = () => {
//     const bookshelf = window.bookshelf;
//     return useQuery(
//         "users",
//         () => bookshelf.users.findMany(),
//         { initialData: [] }
//     );
// };

const login = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { setAuth, setUser } = useAuth();
    const router = useNavigate();
    const {
        mutate: signIn,
        isLoading: isSigningIn,
        error: errorSigningIn,
    } = useMutation(
        ({ rut, password }) => request.auth.signIn({ rut, password }),
        {
            onSuccess: data => {
                if (data.user) {
                    console.log(data)
                    setUser(data.user);
                    setAuth({ isAuthenticated: true, token: data.token });
                    enqueueSnackbar('Bienvenido', { variant: 'success' });
                    router("/dashboard");
                }
            }
        }
    );

    return {
        isLoading: isSigningIn,
        error: errorSigningIn,
        signIn,
    };
};

const register = () => {
    const { enqueueSnackbar } = useSnackbar();
    const router = useNavigate();
    const {
        mutate: signUp,
        isLoading,
        error
    } = useMutation(
        ({ rut, password }) => request.auth.signUp({ rut, password }),
        {
            onSuccess: data => {
                if (data) {
                    enqueueSnackbar('Usuario Creado Satisfactoriamente', { variant: 'success' });
                    router("/");
                }
            },
        }
    );

    return {
        isLoading,
        error,
        signUp,
    };
};

const getUsers = () => {
    const { isLoading, data, error } = useQuery(
        "/users",
        () => request.user.getUsers()
    );
    return {
        isLoading,
        data,
        error,
    };
}

// const useMutateUser = () => {
//     const bookshelf = window.bookshelf;
//     const toasts = useToasts();
//     const { setAuth, setUser, user } = useAuth();
//     const router = useHistory();

//     return useMutation(
//         async (form) => {
//             //eslint-disable-next-line
//             const clientQuery = {
//                 ...(user[0].id ? {
//                     where: {
//                         id: user[0].id,
//                     }
//                 } : {}),
//                 data: {
//                     ...form
//                 }
//             };
//             const method = user[0].id ? "update" : "create";
//             const result = await bookshelf.users[method](clientQuery);
//             return result;
//         }, {
//         onSuccess: data => {
//             if (!Array.isArray(data)) {
//                 setUser([data]);
//                 setAuth({ isAuthenticated: true });
//                 enqueueSnackbar('Usuario Registrado', { variant: 'success' });
//                 router.push("/pos");
//             }
//         }
//     }
//     );
// };

export {
    // useUsers, useMutateUser, 
    login, register, useAuth, userAtom, getUsers
};