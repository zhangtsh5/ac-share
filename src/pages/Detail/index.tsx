import React, { useState, useEffect }from 'react';
// import ReactDOM from 'react-dom';
import moment from 'moment';

import styles from './index.module.scss';
import TopBar from '../../components/TopBar/index'

import likePurple from '../../assets/svgs/like-outline.svg';
import likeBlack from '../../assets/svgs/like-black.svg';
import going from '../../assets/svgs/check-samll.svg';
import check from '../../assets/svgs/check-outline.svg';
import reply from '../../assets/svgs/reply.svg';

import likeGreen from '../../assets/svgs/like-green.svg';
import checkBlack from '../../assets/svgs/check-black.svg';


import info from '../../assets/svgs/info-outline.svg';
import infoActive from '../../assets/svgs/info.svg';
import people from '../../assets/svgs/people-outline.svg';
import peopleActive from '../../assets/svgs/people.svg';
// import comment from '../../assets/svgs/comment-outline.svg';
import commentActive from '../../assets/svgs/comment.svg';
import commentSingle from '../../assets/svgs/comment-single.svg';


import dateFrom from '../../assets/svgs/date-from.svg';
import dateTo from '../../assets/svgs/date-to.svg';
import commentOutline from '../../assets/svgs/comment-outline.svg';


import more from '../../assets/svgs/no-activity.svg'; //占位下拉箭头
import cross from '../../assets/svgs/cross.svg';
import send from '../../assets/svgs/send.svg';

import map from '../../assets/images/gmap.png'
import axios from "axios";



let currentAvatar = ''
let resToken = ''
const params = {
    username: "aaaa", password: "123456"
}

function Detail(props:any) {
    let eventId = 1
    let eleInput:any = null
    let scrollDom0: HTMLDivElement | null
    let scrollDom1: HTMLDivElement | null
    let scrollDom2: HTMLDivElement | null

    // const [resToken, setResToken] = useState('')
    const [currentEvent, setCurrentEvent] = useState<EventObject|null>(null)
    const [eventComment,setEventComment] = useState<CommentObject[]>([])
    const [participants,setParticipants] = useState<ParticipantsObject[]>([])
    const [likes,setLikes] = useState<LikesObject[]>([])
    const [imgList,setImgList] = useState<string[]>([])
    const [isViewAll,setIsViewAll] = useState(false)
    const [commentBarShow,setCommentBarShow] = useState(false)
    const [operateShow,setOperateShow] = useState(true)

    const [moreParticipants,setMoreParticipants] = useState(false)
    const [moreLikes,setMoreLikes] = useState(false)
    const [activeIndex,setActiveIndex] = useState(0)
    // let currentEvent = {}
    const baseUrl="http://localhost:3000"
    // console.log(window.location.href)

    // 获取参数 当前活动id值
    function getEventId(){
        eventId = props.match.params.id
        console.log("eventId:")
        console.log(eventId)

    }

    // 计算更新时间距离当前时间多少小时
    function getHowLong(timeString:string){
        return moment(timeString).startOf('day').fromNow()
    }


    // 跳转到底部
    // function  scrollToBottom(id:string) {
    //     let target = document.getElementById(id)
    //     if(target.scrollTop + target.clientHeight >= target.scrollHeight - 20)
    //
    // }
    // 滚动跳转
    function  scrollToAnchor (id:string){
        // @ts-ignore
        let element = document.getElementById(id)
        // @ts-ignore
        //计算需要向上移动的距离
        let height = document.getElementById(id).offsetTop

        // @ts-ignore

        // document.getElementById(id).scroll(0, 87);
        // document.getElementById('detail').scrollTop = 400

        // element.scroll({
        //     top: height - 87, //向上移动的距离，如果有fixede布局， 直接减去对应距离即可
        //     behavior: 'smooth', // 平滑移动
        // });
        if(id === 'info'){
            document.documentElement.scrollTop = height - 105

        }
        if(id === 'Participants'){
            document.documentElement.scrollTop = height - 86

        }
        if(id === 'comments'){
            document.documentElement.scrollTop = height - 102
        }

        // document.documentElement.scrollTop = height - 101
        console.log(height)
        console.log(document.documentElement.scrollTop)
    }
    //监听滚动
    function handleOnScroll(){
        let st = document.documentElement.scrollTop;
        console.log("888888")
        console.log(st)
        // @ts-ignore
        if(st > document.getElementById('info').offsetTop - 105 && st < document.getElementById('Partcipants').offsetTop - 86){
            setActiveIndex(0)
        }
        // @ts-ignore
        if(st > document.getElementById('Partcipants').offsetTop - 86 && st < document.getElementById('comments').offsetTop - 102){
            setActiveIndex(1)
        }
        // @ts-ignore
        if(st > document.getElementById('comments').offsetTop - 102){
            setActiveIndex(2)
        }
    }





    useEffect(() => {
        axios.post(`${baseUrl}/api/v1/auth/token`,JSON.stringify(params))
            .then(
                function(response){
                    // setResToken(response.data.token)
                    resToken = response.data.token
                    currentAvatar = response.data.user.avatar
                    getEventId()



                    axios.all([
                        // 获取当前活动
                        axios.get(`${baseUrl}/api/v1/events/${eventId}`, {
                            headers: {"X-BLACKCAT-TOKEN":resToken }
                        }),

                        // 获取当前活动评论
                        axios.get(`${baseUrl}/api/v1/events/${eventId}/comments`, {
                            headers: {"X-BLACKCAT-TOKEN":resToken }
                        }),

                        // 获取当前活动参与者
                        axios.get(`${baseUrl}/api/v1/events/${eventId}/participants`, {
                            headers: {"X-BLACKCAT-TOKEN":resToken }
                        }),

                        // 获取当前活动收藏者
                        axios.get(`${baseUrl}/api/v1/events/${eventId}/likes`, {
                            headers: {"X-BLACKCAT-TOKEN":resToken }
                        })

                    ])
                        .then(axios.spread(function (eventResp, commentsResp,participantsResp,likesResp) {

                            setCurrentEvent(eventResp.data.event)
                            setImgList(eventResp.data.event.images)
                            console.log("event:")
                            console.log(eventResp.data.event)
                            console.log("pictures:")
                            console.log(eventResp.data.event.images)

                            setEventComment(commentsResp.data.comments)
                            console.log("comments:")
                            console.log(commentsResp.data.comments)

                            setParticipants(participantsResp.data.users)
                            console.log("participants:")
                            console.log(participantsResp.data.users)

                            setLikes(likesResp.data.users)
                            console.log("likes:")
                            console.log(likesResp.data.users)

                        }))
                }
            )
            .catch(function (error) {
                console.log(error)
            })




    },[])


    //评论列表
    let commentList = eventComment.map((item,index) => {
        return (
            <li key={index} className={styles.itemComments}>
                <img src={item.user.avatar} className={styles.avatar} alt="userAvatar" />
                <div className={styles.commentRight}>
                    <div className={styles.nameAndTime}>
                        <span className={styles.commentName}>{item.user.username}</span>
                        <span className={styles.commentTime}>
                            {getHowLong(item.updatedAt)}
                        </span>
                        <img onClick={() => {replyComment(item.user.username)}} src={reply} className={styles.reply} alt="reply"/>
                    </div>
                    <div className={styles.commentDesc}>{item.comment}</div>

                </div>
            </li>
        )
    })

    //加入活动
    function goingEvent(eventId:number){
        // console.log("1111")
        // console.log(resToken)
        axios.post(`${baseUrl}/api/v1/events/${eventId}/participants`,JSON.stringify(params),
            {headers: {"X-BLACKCAT-TOKEN":resToken }})
            .then(
                () => {
                    axios.all([
                        axios.get(`${baseUrl}/api/v1/events/${eventId}`, {
                            headers: {"X-BLACKCAT-TOKEN":resToken }
                        }),
                        axios.get(`${baseUrl}/api/v1/events/${eventId}/participants`, {
                            headers: {"X-BLACKCAT-TOKEN":resToken }
                        })

                    ])
                        .then(
                            axios.spread(
                                function (eventResponse, goingResponse) {
                                    setCurrentEvent(eventResponse.data.event)
                                    setParticipants(goingResponse.data.users)
                                }
                            )
                        )
                }
            )
            .catch(function (error) {
                console.log(error)
            })


    }

    //取消加入活动
    function deleteGoing(eventId:number){
        axios.delete(`${baseUrl}/api/v1/events/${eventId}/participants`,
            {headers: {"X-BLACKCAT-TOKEN":resToken }})
            .then(
                () => {
                    axios.all([
                        axios.get(`${baseUrl}/api/v1/events/${eventId}`, {
                            headers: {"X-BLACKCAT-TOKEN":resToken }
                        }),
                        axios.get(`${baseUrl}/api/v1/events/${eventId}/participants`, {
                            headers: {"X-BLACKCAT-TOKEN":resToken }
                        })

                    ])
                        .then(
                            axios.spread(
                                function (eventResponse, goingResponse) {
                                    setCurrentEvent(eventResponse.data.event)
                                    setParticipants(goingResponse.data.users)
                                }
                            )
                        )
                }
            )
            .catch(function (error) {
                console.log(error)
            })
    }

    //收藏活动
    function likeEvent(eventId:number){
        axios.post(`${baseUrl}/api/v1/events/${eventId}/likes`,JSON.stringify(params),
            {headers: {"X-BLACKCAT-TOKEN":resToken }})
            .then(
                () => {

                    axios.all([
                        axios.get(`${baseUrl}/api/v1/events/${eventId}`, {
                            headers: {"X-BLACKCAT-TOKEN":resToken }
                        }),
                        axios.get(`${baseUrl}/api/v1/events/${eventId}/likes`, {
                            headers: {"X-BLACKCAT-TOKEN":resToken }
                        })

                    ])
                        .then(
                            axios.spread(
                                function (eventResponse, likeResponse) {
                                    setCurrentEvent(eventResponse.data.event)
                                    setLikes(likeResponse.data.users)
                                }
                            )
                        )


                }
            )
            .catch(function (error) {
                console.log(error)
            })
    }

    //取消收藏活动
    function deleteLikes(eventId:number){
        axios.delete(`${baseUrl}/api/v1/events/${eventId}/likes`,
            {headers: {"X-BLACKCAT-TOKEN":resToken }})
            .then(
                () => {
                    axios.all([
                        axios.get(`${baseUrl}/api/v1/events/${eventId}`, {
                            headers: {"X-BLACKCAT-TOKEN":resToken }
                        }),
                        axios.get(`${baseUrl}/api/v1/events/${eventId}/likes`, {
                            headers: {"X-BLACKCAT-TOKEN":resToken }
                        })

                    ])
                        .then(
                            axios.spread(
                                function (eventResponse, likeResponse) {
                                    setCurrentEvent(eventResponse.data.event)
                                    setLikes(likeResponse.data.users)
                                }
                            )
                        )
                }
            )
            .catch(function (error) {
                console.log(error)
            })
    }

    //加入或取消加入活动
    function handleGoingBtn(isGoing:boolean,eventId:number){
        if(isGoing){
            deleteGoing(eventId)
        }
        else{
            goingEvent(eventId)
        }
    }

    //收藏或者取消收藏活动
    function handleLikesBtn(isLikes:boolean,eventId:number){
        if(isLikes){
            deleteLikes(eventId)
        }
        else{
            likeEvent(eventId)
        }
    }

    //回复评论
    function replyComment(username:string){
        setOperateShow(false)
        setCommentBarShow(true)
        if(eleInput !== null){
            eleInput.value = `@${username}:`
        }
        // let ele = (document.getElementById('message')) as HTMLInputElement
    }


    // 图片列表
    let eventImgsList = imgList.length > 0
    ?
        imgList.map((item:string,index:number) => {
        return (
            <img src={item} key={index} alt="item_pic"/>
            // <img src="https://tse2-mm.cn.bing.net/th?id=OIP.NI9vpiDmGzrQLPKq23e2_wHaFj&w=234&h=173&c=7&o=5&dpr=2&pid=1.7" key={index} alt="item_pic"/>
        )
        })
    : null

    //是否下拉活动参与列表
    function isMoreParticipantsOrNot(moreParticipants:boolean){
        setMoreParticipants(!moreParticipants)
    }

    //是否下拉活动收藏列表
    function isMoreLikesOrNot(moreLikes:boolean){
        setMoreLikes(!moreLikes)
    }

    //活动参与列表
    let participantsList = participants.length > 7 && !moreParticipants
    ?
        participants.slice(0,6).map((item,index) => {
            return (
                <li><img src={item.avatar} alt={item.username} /></li>
            )
        })
            .concat(
            <li onClick={() => {isMoreParticipantsOrNot(moreParticipants)}}><img src={more} alt="more" /></li>
        )
    :
        participants.map((item,index) => {
            return (
                <li><img src={item.avatar} alt={item.username} /></li>
            )
        })

    //活动收藏列表
    let likesList = likes.length > 7 && !moreLikes
    ?
        likes.slice(0,6).map((item,index) => {
            return (
                <li><img src={item.avatar} alt={item.username} /></li>
            )
        })
            .concat(
            <li onClick={() => {isMoreLikesOrNot(moreLikes)}}><img src={more} alt="more" /></li>
        )
    :
        likes.map((item,index) => {
            return (
                <li><img src={item.avatar} alt={item.username} /></li>
            )
        })

    // 活动详情
    function Description(desc:string,isViewAll:boolean) {
        if(!isViewAll) {
            return(
                <div className={styles.desc}>
                    <div className={styles.manyTxt}>{desc}</div>
                    <div className={styles.view} onClick={() => {setIsViewAll(true)}}>
                        VIEW ALL
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className={styles.desc}>
                    <div className={styles.allTxt}>{desc}</div>
                    <div className={styles.view} onClick={() => {setIsViewAll(false)}}>
                        VIEW SOME
                    </div>
                </div>
            )
        }
    }

    // 底部发送消息栏
    function ifCommentBar(commentBarShow:boolean) {
        return commentBarShow ? (
            <div className={styles.CommentBar}>
                <span className={styles.left}>
                    <img className={styles.cross} onClick={() => {setOperateShow(true);setCommentBarShow(false)}} src={cross} alt="cross"/>
                    <input ref={el => {eleInput = el}} id="message" placeholder="Leave your comment here" type="text"/>
                </span>
                    <span className={styles.right}>
                    <img className={styles.send} onClick={() => {
                        // @ts-ignore
                        sendComment(currentEvent.id)}} src={send} alt="send"/>
                </span>
            </div>
        ) : null
    }

    //底部活动收藏、评论、加入
    // @ts-ignore
    function ifOperateBar(operateShow:boolean) {

        return operateShow ? (
            <div className={styles.operate}>
                <div className={styles.operateLeft}>
                    <div onClick={() => {setOperateShow(false);setCommentBarShow(true)}} className={styles.commentLogoWrap}>
                        <img src={commentSingle} className={styles.commentLogo} alt="comment"/>
                    </div>
                    <div onClick={() => {if(currentEvent)  {handleLikesBtn(currentEvent.me_likes, currentEvent.id)}}} className={styles.likeLogoWrap}>
                        <img src={currentEvent && currentEvent.me_likes ? likeGreen : likeBlack} className={styles.likeLogo} alt="like"/>
                    </div>
                </div>
                <div className={styles.operateRight} onClick={() => {if(currentEvent)  {handleGoingBtn(currentEvent.me_going, currentEvent.id)}}}>
                    <img src={currentEvent && currentEvent.me_going ? checkBlack : check} className={styles.checkLogo} alt="check"/>
                    <span className={styles.join}>Join</span>
                </div>
            </div>
        ) : null
    }

    // 发送评论
    function sendComment(eventId:number) {
        let ele = (document.getElementById('message')) as HTMLInputElement
        let message = ele.value
        if(message.length === 0){
            alert("请输入评论内容")
        }
        else{
            axios.post(`${baseUrl}/api/v1/auth/token`,JSON.stringify(params))
                .then(
                    function (response) {
                        resToken = response.data.token
                        let messageParam = {
                            comment:message
                        }
                        console.log("resToken:")
                        console.log(resToken)
                        axios.post(`${baseUrl}/api/v1/events/${eventId}/comments`,JSON.stringify(messageParam),{headers: {"X-BLACKCAT-TOKEN":resToken }})
                            .then(
                                function (response) {
                                    axios.get(`${baseUrl}/api/v1/events/${eventId}/comments`, {
                                        headers: {"X-BLACKCAT-TOKEN":resToken }
                                    }).then(
                                        function (sendResp) {
                                            setEventComment(sendResp.data.comments)
                                        }
                                    )
                                    alert("Successfully submitted !")
                                    ele.value = ''
                                }
                            )
                    }
                ).catch(
                function (error) {
                    console.log(error)
                }
            )
        }
    }


    // 信息栏 Detail
    function infoMenu(activeIndex:number) {
        return activeIndex === 0 ? (
                <div className={styles.infoMenuActive}>
                    <img src={infoActive} alt="infoActive"/>
                    <span>Details</span>
                </div>
            )
            : (
                <div className={styles.infoMenu} onClick={() => {scrollToAnchor('info');setActiveIndex(0);setCommentBarShow(false);setOperateShow(true)}}>
                    <img src={info} alt="info"/>
                    <span>Details</span>
                </div>
            )
    }

    // 参与栏 particpants
    function peopleMenu(activeIndex:number) {
        return activeIndex === 1 ? (
                <div className={styles.peopleMenuActive}>
                    <img src={peopleActive} alt="peopleActive"/>
                    <span>Participants</span>
                </div>
            )
            : (
                <div onClick={() => {scrollToAnchor('Participants');setActiveIndex(1);setCommentBarShow(false);setOperateShow(true);scrollToAnchor('Participants')}} className={styles.peopleMenu}>
                    <img src={people} alt="people"/>
                    <span>Participants</span>
                </div>
            )
    }

    // 信息栏 comments
    function commentMenu(activeIndex:number) {
        return activeIndex === 2 ? (
                <div onClick={() => {setCommentBarShow(true);setOperateShow(false)}} className={styles.commentMenuActive}>
                    <img src={commentActive} alt="commentActive"/>
                    <span>Comments</span>
                </div>
            )
            : (
                <div onClick={() => {scrollToAnchor('comments');setActiveIndex(2);setCommentBarShow(true);setOperateShow(false)}} className={styles.commentMenu}>
                    <img src={commentOutline} alt="commentOutline"/>
                    <span>Comments</span>
                </div>
            )
    }

    // console.log('当前活动:')
    // console.log(currentEvent)

    return currentEvent === null ? null : (
        <div className={styles.detail}
             // onScrollCapture={() => handleOnScroll()}
        >
            <TopBar avatar={currentAvatar}></TopBar>
            <span className={styles.channel} >
                {currentEvent.channel.name}
            </span>
            <div className={styles.title}>
                {currentEvent.name}
            </div>
            <div className={styles.userInfo}>
                <img src={currentEvent.creator.avatar} className={styles.header} alt="user_avaTar"/>
                <div className={styles.username}>{currentEvent.creator.username}</div>
                <div className={styles.publish}>
                    {`Published ${getHowLong(currentEvent.creator.updatedAt)}`}
                </div>
            </div>
            <div className={styles.menu}>
                {infoMenu(activeIndex)}
                <span className={styles.line1}></span>
                {peopleMenu(activeIndex)}
                <span className={styles.line2}></span>
                {commentMenu(activeIndex)}
            </div>

            <div id="info" className={styles.pictureWrapper} ref={(el) => { scrollDom0 = el}}>
                <div className={styles.pictureContent}
                     style={{ transform: `translate3d(0px, 0px, 0px)` }}
                >
                    {eventImgsList}
                </div>
            </div>

            {Description(currentEvent.description,isViewAll)}
            <div className={styles.time}>
                <div className={styles.whenBar}>
                    <span className={styles.before}></span>
                    <span className={styles.when}>when</span>
                </div>

                <div className={styles.timeDetail}>
                    <div className={styles.start}>
                        <div className={styles.startTop}>
                            <img src={dateFrom} alt="dateFrom"/>
                            <span className={styles.leftTime}>
                                {moment(currentEvent.begin_time).format('DD MMM YYYY')}
                            </span>
                        </div>
                        <div className={styles.startHour}>
                            <span className={styles.startHourWord}>
                                {moment(currentEvent.begin_time).format('HH:mm')}
                                <span>
                                    {moment(currentEvent.begin_time).format('a')}
                                </span>
                            </span>
                        </div>
                    </div>

                    <div className={styles.end}>
                        <div className={styles.endTop}>
                            <img src={dateTo} alt="dateTo"/>
                            <span className={styles.rightTime}>
                                {moment(currentEvent.end_time).format('DD MMM YYYY')}
                            </span>
                        </div>
                        <div className={styles.endHour}>
                            <span className={styles.endHourWord}>
                                {moment(currentEvent.end_time).format('HH:mm')}
                                <span>
                                    {moment(currentEvent.end_time).format('a')}
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.place}>
                <div className={styles.whereBar}>
                    <span className={styles.before}></span>
                    <span className={styles.where}>where</span>
                </div>
                <div className={styles.location}>
                    {currentEvent.location}
                </div>
                <div className={styles.locationDetail}>
                    {currentEvent.location_detail}
                </div>
                <img src={map} className={styles.map} alt="map" />
            </div>
            <div id="Participants" className={styles.people} ref={(el) => { scrollDom1 = el}}>

                <div className={styles.going}>
                    <div className={styles.goingLeft}>
                        <img src={going} alt="going"/>
                        <span>{participants.length} going</span>
                    </div>
                    <ul className={styles.goingRight}>
                        {participantsList}
                    </ul>
                </div>

                <div className={styles.likes}>
                    <div className={styles.likesLeft}>
                        <img src={likePurple} alt="like"/>
                        <span>{likes.length} likes</span>
                    </div>
                    <ul className={styles.likesRight}>
                        {likesList}
                    </ul>

                </div>

            </div>


            <div id="comments" className={styles.comments} ref={(el) => { scrollDom2 = el}}>
                {commentList}
            </div>

            {ifCommentBar(commentBarShow)}

            {ifOperateBar(operateShow)}

        </div>
    );
}

export default Detail;
