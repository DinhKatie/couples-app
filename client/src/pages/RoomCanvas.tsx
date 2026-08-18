import type { ReactNode } from "react";

type RoomCanvasProps = {
    children?: ReactNode;
};

export default function RoomCanvas({ children }: RoomCanvasProps) {
    return (
        <div
            className="relative w-full max-w-[1920px] aspect-video bg-amber-100 bg-cover bg-center"
            style={{ backgroundImage: "url('/Board.png')" }}>
            {children}
        </div>
    );
}