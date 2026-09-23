// Routes are assumed to be /room/[roomItem.route]

export interface RoomItem {
    id: string
    name?: string
    image: string
    route: string
    x?: number
    y?: number
}

interface RoomItemProps {
    x: number,
    y: number,
    width: number,
    height: number,
    image?: string,
    route?: string,
    children: React.ReactNode,
    onClick?: () => void,
}

export default function RoomItem({ x, y, width, height, children, onClick }: RoomItemProps) {
    return (
        <div className="absolute" onClick={onClick} style={{
                left: `${(x / 1920) * 100}%`,
                top: `${(y / 1080) * 100}%`,
                width: `${(width / 1920) * 100}%`,
                height: `${(height / 1080) * 100}%`,
            }}>
            {children}
        </div>
    );
}

export const roomItems: RoomItem[] = [
    {
        id: 'notes',
        name: 'Notes',
        image: "💌",
        route: '/notes',
        x: 800,
        y: 450,
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