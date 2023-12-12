import React, { useEffect, useState } from 'react'
import styled, { css } from "styled-components";
import { friendRequest, searchRoute } from '../utils/APIRoutes';
import axios from 'axios';
import { useDataLayer } from '../datalayer';

function Search() {
    const [state, dispatch] = useDataLayer();
    const [search, setSearch] = useState("");
    const [result, setResult] = useState([]);
    const sendRequest = async(user) =>{
        try {
            const result = await axios.post(`${friendRequest}/requestfriends/${state._id}/${user}`);
            handleSearch()
        } catch (error) {
            alert("Error!");
        }
    }

    const handleSearch = async () => {
        if(search === ""){
            setResult([]);
        }
        else{
            const search_url = `${searchRoute}/${search}/${state._id}`
            
            const data = await axios.get(search_url)
            
            console.log(data.data)
            
            setResult(data.data)
        }
    }

    useEffect(handleSearch, [search])
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
                                <div className="item-info">
                                    <img src="https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc?auto=format&dpr=1&w=1000" alt="" />
                                    <h3 className="username">{item.username}</h3>
                                </div>
                                <div className='add-friend'>
                                    <button onClick={() => {sendRequest(item._id)}} className= {`${item.request.includes(state._id.toString()) ? "add-friend-success" : "add-friend-send"}`}>
                                        {
                                            item.request.includes(state._id.toString()) === true?
                                            ("Added !")
                                            :
                                            "Add Friend"
                                        }
                                    </button>
                                </div>
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
            <div className="alert">
                <div className="alert-info" bg = {bg}>
                    Friend Request Send Successfully
                </div>
                <div className="alert-bar">
                    <div className="alert-timer">

                    </div>
                </div>
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
    .alert{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: fixed;
        right: 30px;
        bottom: 50px;
    }
    .alert-info{
        padding: 20px 20px;
        background-color: rgba(19,19,36,255);
        color: white;
    }
    .alert-bar{
        height: 10px;
        width: 100%;
        background-color: blue;
    }
`

const Item = styled.button`
    /* align-items: center; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    border: none;
    color: white;
    width: 100%;
    height: 60px;
    padding: 0px 5px;
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
    button{
        padding: 4px 3px;
        cursor: pointer;
        /* background-color: blue; */
        border: none;
        border-radius: 2px;
        font-weight: 500;
    }
    .add-friend-success{
        background-color: green;
    }
    .add-friend-send{
        background-color: blue;
    }
    .item-info{
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .add-friend{
        display: none;
    }
    /* .add-friend-send :hover{
        background-color: #0000e1;
        transition: background-color 100ms;
    } */
    :hover{
        .add-friend{
            display: block;
        }
    }
`
export default Search