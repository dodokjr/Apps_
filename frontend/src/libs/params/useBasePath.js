import { useLocation, useParams } from 'react-router-dom';

export const useBasePath = () =>
{
    return location.pathname.slice(0, location.pathname.lastIndexOf('/'))
};