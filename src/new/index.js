import React, {useEffect} from "react";
import axios from "axios";
import {useHistory} from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";

const NewList = () => {
    const history = useHistory();

    useEffect(() => {
        createList();
    });

    const createList = async () => {
        const response = await axios.post('https://listed-backend.appspot.com/api/v1/lists/');
        history.push(`/lists/${response.data._id}`);
    }

    return (
        <div>
          <LinearProgress />
        </div>
    )
}

export default NewList;
