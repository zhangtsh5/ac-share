interface EventObject {
    begin_time: string
    channel: {
        createdAt: string
        id: number
        name: string
        updatedAt: string
    }
    channel_id: number
    create_time: string
    createdAt: string
    creator: {
        avatar: string
        createdAt: string
        email: string
        id: number
        password: string
        salt: string
        updatedAt: string
        username: string
    }
    creator_id: number
    description: string
    end_time: string
    goings_count: number
    id: number
    images: string[]
    likes_count: number
    location: string
    location_detail: string
    me_going: boolean
    me_likes: boolean
    name: string
    update_time: string
    updatedAt: string
}


interface CommentObject {
    comment: string
    create_time: string
    createdAt: string
    eventId: number
    id: number
    updatedAt: string
    user: {
        avatar: string
        createdAt: string
        email: string
        id: number
        password: string
        salt: string
        updatedAt: string
        username: string
    }
    userId: number
}

interface ParticipantsObject{
    avatar: string
    createdAt: string
    email: string
    id: number
    participation: {
        createdAt: string
        eventId: number
        id: number
        updatedAt: string
        userId: number
    }
    password: string
    salt: string
    updatedAt: string
    username: string
}

interface LikesObject{
    avatar: string
    id: number
    username: string
}

// declare module '*'