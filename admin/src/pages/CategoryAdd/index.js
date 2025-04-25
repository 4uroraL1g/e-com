import Breadcrumb from '@/material/Breadcrumb';
import HomeIcon from '@mui/icons-material/Home';
import ExpandmoreIcon from '@mui/icons-material/ExpandMore';
import {emphasize, styled} from '@mui/material/styles';
import {Box, Button, Card, CardContent, CardHeader, Grid, Typography} from '@mui/material';
import Chip from '@mui/material/Chip';
import {useState} from 'react';
import {FaCloudUploadAlt} from 'react-icons/fa';
import Button from '@/material/Button';
import { postDataToAPI} from '../../utils/app';

//breadcrumbs
const StyledBreadcrumbs = styled(Chip)(({theme}) => {

});
const ProductUpLoad = () => {

    const [formFields, setFormFields] = useState({
        name: '',
        image: [],
        color: '',
        description: '',
    });

    const changeInput = (e) => {
        setFormFields({
            ...formFields,
            [e.target.name]: e.target.value,
        });
    }

    const addCategory = (e) => {
        e.preventDefault();
        postDataToAPI('api/category/',formFields).then(res=> {
            console.log(res);
            alert('Category added successfully');
        }).catch((err) => {
            console.error(err);
            alert('Error adding category');
        });
    }
}