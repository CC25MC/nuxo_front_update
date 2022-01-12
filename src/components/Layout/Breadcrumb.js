import { Breadcrumbs as MuiBreadcrumbs, Link, Container } from '@mui/material';
import { useLocation } from '../../hooks';
export const Breadcrumbs = () => {
    const { path, setPath } = useLocation();
    return <Container component="main" maxWidth="sm" sx={{
        marginTop: 2,
    }}>
        <MuiBreadcrumbs aria-label="breadcrumb">
            <Link underline="hover" color="inherit" href="#" onClick={() => setPath("/")} >
                NUXO
            </Link>
            <Link
                underline="hover"
                color="text.primary"
                aria-current="page"
            >
                {path === '/' ? "INICIO" : `${path.slice(1, path.lenght).toUpperCase()}`}
            </Link>
        </MuiBreadcrumbs>
    </Container>
}