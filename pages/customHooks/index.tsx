// モダンJavaScriptの基本から始めるReact実践の教科書 p.245

import { useState } from "react";
import axios from "axios";

export const App = () => {
    const [userList, setUserList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    const onClickFetchUser =  () => {

    }
}
