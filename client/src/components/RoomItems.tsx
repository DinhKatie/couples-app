// Routes are assumed to be /room/[roomItem.route]

export interface RoomItem {
    id: string
    name?: string
    image: string
    route: string
}

export const roomItems: RoomItem[] = [
    {
        id: 'notes',
        name: 'Notes',
        image: "💌",
        route: '/notes'
    },
    {
        id: 'photos',
        name: 'Photos',
        image: "📷",
        route: '/photos'
    },
    {
        id: 'information',
        name: 'Information',
        image: "ℹ️",
        route: '/information'
    }
]