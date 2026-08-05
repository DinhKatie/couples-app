
export interface Photo {
    id: string;
    couple_id: string;
    storage_path: string;
    caption: string;
    created_at: string;
    url: string;
    created_by: {
        display_name: string;
    }
}