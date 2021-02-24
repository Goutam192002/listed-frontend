import React, {Fragment, useEffect, useState} from "react";
import {Container, IconButton} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import ShareIcon from "@material-ui/icons/Share";
import './styles.css';
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import {useParams} from "react-router-dom";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";

const ListDetail = () => {
    const { id } = useParams();
    const [list, setList] = useState({
        title: '',
        items: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (list.items.length > 0) {
            updateList({ items: list.items });
        }
    }, [list.items.length]);

    useEffect(() => {
        getList(id);
    }, [id]);

    const getList = async (id) => {
        const response = await axios.get(`https://listed-backend.appspot.com/api/v1/lists/${id}`);
        setList(response.data);
        setLoading(false);
    }

    const onTitleChanged = (event) => {
        setList({
            ...list,
            title: event.target.value || ''
        });
    }

    const onTitleBlur = async (event) => {
        await updateList({ title: list.title });
    }

    const onItemNameChange = index => {
        return (event) => {
            const items = [...list.items];
            items[index].name = event.target.value;
            setList({
                title: list.title,
                items: items
            });
        }
    }

    const onItemNameBlur = async () => {
        await updateList({ items: list.items });
    }

    const onCheckboxStateChange = index => {
        return (event) => {
            const items = [...list.items];
            items[index].checked = event.target.checked;
            setList({
                title: list.title,
                items: items
            });
            updateList({ items: items });
        }
    }

    const onKeyPress = event => {
        if (event.key === 'Enter') {
            const items = [...list.items];
            items.push({
                name: '',
                checked: false
            });
            setList({
                title: list.title,
                items: items
            });
        }
    }

    const updateList = async payload => {
        setLoading(true);
        const response = await axios.put(`https://listed-backend.appspot.com/api/v1/lists/${id}`, payload);
        setLoading(false);
    }

    const onShare = () => {
        navigator.share({
            title: 'Listed',
            text: 'Checkout listed',
            url: window.location.href
        })
    }

    return (
        <Fragment>
            { loading && <LinearProgress />}
            <Container maxWidth="sm">
                <Box display="flex" alignItems="center" className="header">
                    <TextField size="small" variant="outlined" value={list.title} onChange={onTitleChanged} onBlur={onTitleBlur}/>
                    {
                        navigator.canShare && (
                            <IconButton aria-label="share" onClick={onShare}>
                                <ShareIcon />
                            </IconButton>
                        )
                    }
                </Box>
                <br />
                <Box display="flex" flexDirection="column">
                    {
                        list.items.map(
                            (item, index) => (
                                <Paper className="list-item" key={index}>
                                    <Checkbox className="list-item-checkbox" checked={item.checked} onChange={onCheckboxStateChange(index)} />
                                    <input className="list-item-input"
                                           value={item.name}
                                           onChange={onItemNameChange(index)}
                                           onKeyPress={onKeyPress}
                                           onBlur={onItemNameBlur}
                                           autoFocus={!item.name}
                                    />
                                </Paper>
                            )
                        )
                    }
                </Box>
            </Container>
        </Fragment>
    )
}

export default ListDetail;
