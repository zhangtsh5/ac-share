import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'
import moment from 'moment';
// import ReactDOM from 'react-dom';
import styles from './index.module.scss';
import TopBar from '../../components/TopBar/index'
// import { useHistory } from "react-router-dom";
import like from '../../assets/svgs/like-outline.svg';
import going from '../../assets/svgs/check-samll.svg';
import time from '../../assets/svgs/time.svg';
import goingGreen from '../../assets/svgs/check-green.svg';
import likeRed from '../../assets/svgs/like-red.svg';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';


let resToken = ''
let avatar = ''
let listParams = {
    offset:0,
    limit:5
}
let hasMore = true
function AcList() {
    let scrollDom: HTMLDivElement | null
    const [scrollHeight,setScrollHeight] = useState(0)
    const [eventList, setEventList] = useState<EventObject[]>([]);
    // const [eventList, setEventList] = useState<EventObject[]>([]);



    // const [resToken,setResToken] = useState('')
    // const [avatar,setAvatar] = useState('')

    const baseUrl="http://localhost:3000"
    // let resToken = ''
    // let avatar = ''
    //跳转详情页

    // 控制详情描述字符串在 300 字符以内
    function stringHandle(originStr:string) {
        let len = originStr.length
        // console.log(len)
        return len<301 ? originStr : originStr.substring(0,301) + "..."
    }

    const params = {
        username: "aaaa", password: "123456"
    }


    // 刷新事件列表
    function getEventList(token:string){
        axios.get(`${baseUrl}/api/v1/events?offset=${listParams.offset}&limit=${listParams.limit}`, {
            headers: {"X-BLACKCAT-TOKEN":token }
        })
            .then(
                function(response){
                    hasMore = response.data.hasMore
                    setEventList(eventList.concat(response.data.events))
                    // console.log(response.data.events)
                    console.log("hello:")

                }
            )
            .catch(function (error) {
                console.log(error)
            })
    }

    // 分页请求数据
    function handleOnScroll(){

        if(!hasMore){
            return ;
        }
        // @ts-ignore
        //距离底部 20 px 时再加载
        if(scrollDom.scrollTop + scrollDom.clientHeight >= scrollDom.scrollHeight - 20){
            listParams.offset = listParams.offset + 5
            getEventList(resToken)
        }

    }

    useEffect(() => {
        setScrollHeight(window.innerHeight - 40)

        axios.post(`${baseUrl}/api/v1/auth/token`,params)
            .then(
                function(response){
                    // setResToken(response.data.token)
                    // setAvatar(response.data.user.avatar)
                    resToken = response.data.token
                    avatar = response.data.user.avatar
                    getEventList(resToken)

                }
            )
            .catch(function (error) {
                console.log(error)
            })



    },[]);
    console.log(eventList)

    //加入活动
    function goingEvent(eventId:number,index:number){
        // console.log("1111")
        // console.log(resToken)
        axios.post(`${baseUrl}/api/v1/events/${eventId}/participants`,JSON.stringify(params),
            {headers: {"X-BLACKCAT-TOKEN":resToken }})
            .then(
                () => {
                    eventList[index].me_going = true
                    let tempList = [...eventList]
                    setEventList(tempList)
                }
            )
            .catch(function (error) {
                console.log(error)
            })


    }

    //取消加入活动
    function deleteGoing(eventId:number,index:number){
        axios.delete(`${baseUrl}/api/v1/events/${eventId}/participants`,
            {headers: {"X-BLACKCAT-TOKEN":resToken }})
            .then(
                () => {
                    eventList[index].me_going = false
                    let tempList = [...eventList]
                    setEventList(tempList)
                }
            )
            .catch(function (error) {
                console.log(error)
            })
    }
    //收藏活动
    function likeEvent(eventId:number,index:number){
        axios.post(`${baseUrl}/api/v1/events/${eventId}/likes`,JSON.stringify(params),
            {headers: {"X-BLACKCAT-TOKEN":resToken }})
            .then(
                () => {
                    eventList[index].me_likes = true
                    let tempList = [...eventList]
                    setEventList(tempList)
                }
            )
            .catch(function (error) {
                console.log(error)
            })
    }

    //取消收藏活动
    function deleteLikes(eventId:number,index:number){
        axios.delete(`${baseUrl}/api/v1/events/${eventId}/likes`,
            {headers: {"X-BLACKCAT-TOKEN":resToken }})
            .then(
                () => {
                    eventList[index].me_likes = false
                    let tempList = [...eventList]
                    setEventList(tempList)
                }
            )
            .catch(function (error) {
                console.log(error)
            })
    }

    //加入或取消加入活动
    function handleGoingBtn(isGoing:boolean,eventId:number,index:number){
        if(isGoing){
            deleteGoing(eventId,index)
        }
        else{
            goingEvent(eventId,index)
        }
    }

    //收藏或者取消收藏活动
    function handleLikesBtn(isLikes:boolean,eventId:number,index:number){
        if(isLikes){
            deleteLikes(eventId,index)
        }
        else{
            likeEvent(eventId,index)
        }
    }

    //条件渲染加入活动logo 是否已加入活动
    let isMeGoing = function(isGoing:boolean){
        return isGoing ? <img src={goingGreen} className={styles.goLogo} alt="isGoing"/> : <img src={going} className={styles.goLogo} alt="notGoing"/>
    }

    //条件渲染收藏活动logo 是否likes
    let isMeLikes = function(isLikes:boolean){


        return isLikes ? <img src={likeRed} className={styles.likeLogo} alt="isLikes"/> : <img src={like} className={styles.likeLogo} alt="notLikes"/>
    }

    function picture(images:string[]){
        return images.length !== 0 ? (
            <img src={images[1]} className={styles.picture} />
        ) : null
    }

    // 活动列表
    let acList = eventList.map((item,index) => {
        return (
            <li key={index} className={styles.itemWrap}>
                    <div className={styles.topInfo}>
                        <img src={item.creator.avatar} className={styles.img} alt="avatar"/>
                        <div className={styles.username}>{item.creator.username}</div>
                        <div className={styles.channel}>{item.channel.name}</div>
                    </div>
                    <div className={styles.titleAndTimeWrap}>
                        <div className={styles.wrapLeft}>
                            <Link to={"/detail/"+item.id} className={styles.title}>
                                {item.name}
                            </Link>
                            <div className={styles.time}>
                                <img src={time} className={styles.clock} alt="time" />
                                <div className={styles.date}>
                                    {moment(item.begin_time).format('DD MMM YYYY')} - {moment(item.end_time).format('DD MMM YYYY')}
                                </div>
                            </div>
                        </div>

                        {picture(item.images)}
                    </div>


                    <Link to={"/detail/"+item.id} className={styles.detail}>
                        {stringHandle(item.description)}
                    </Link>
                    <div className={styles.operate}>
                        <div onClick={() => handleGoingBtn(item.me_going,item.id,index)}>
                            {isMeGoing(item.me_going)}
                            <div className={styles.going}>I am going!</div>
                        </div>
                        <div onClick={() => handleLikesBtn(item.me_likes,item.id,index)}>
                            {isMeLikes(item.me_likes)}
                            <div className={styles.like}>I like it</div>
                        </div>
                    </div>
                </li>
        )
    })
    return (
        <div>
            <TopBar avatar={avatar}></TopBar>
            <div className={styles.acList}
                 onScroll={() => handleOnScroll()}
                ref={dom => {scrollDom = dom}}>{acList}</div>
        </div>
    )
}

export default AcList;
