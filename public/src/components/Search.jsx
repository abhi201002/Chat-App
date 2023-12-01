import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { searchRoute } from '../utils/APIRoutes';
import axios from 'axios';
import { useDataLayer } from '../datalayer';

function Search() {
    const [state, dispatch] = useDataLayer();
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);

    useEffect(async () => {
        if(search === ""){
            setResult([]);
        }
        else{
            const search_url = `${searchRoute}/${search}/${state.username}`
            
            const data = await axios.get(search_url)
            
            console.log(data.data)
            
            setResult(data.data)
        }
    }, [search])
    return (
        <SearchBox>
            <div className="search-bar">
                <input type="text" className="bar" value={search} onChange={(e) => {setSearch(e.target.value)}} placeholder='Type to Search...'/>
            </div>
            <hr />
            <div className="search-item">
                {
                    result.length !==0 ?
                    result.map((item) => {
                        return(
                            <Item>
                                <img src="https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc?auto=format&dpr=1&w=1000" alt="" />
                                <h3 className="username">{item.username}</h3>
                            </Item>
                        )
                    })
                    :
                    search === "" ?
                        <div className="message"> Make new Friends! </div>
                    :
                        <div className="message"> No Result Found! </div>
                }
            </div>
        </SearchBox>
    )
}


const SearchBox = styled.div`
    height: 100%;
    .search-item{
        height: 100%;
        color: white;
    }
    .message{
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .search-bar input{
        width: 100%;
        border: none;
        height: 35px;
        font-size: 15px;
        padding: 0px 10px;
        margin: 10px 0px;
    }
    .search-bar hr{
        color: grey;
    }
    .search-bar input:focus{
        outline: none;
    }
`

const Item = styled.button`
    /* align-items: center; */
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    background-color: transparent;
    border: none;
    color: white;
    width: 100%;
    height: 60px;
    padding: 0px 15px;
    margin: 10px 0px;
    background-color: rgba(255, 255, 255, 0.204);
    div{
        margin-left: 10px;
    }
    img{
        height: 3rem;
        border-radius: 50%;
        margin-right: 10px;
    }
`
export default Search