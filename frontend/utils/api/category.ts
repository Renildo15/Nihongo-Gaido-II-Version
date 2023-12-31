import axios from "axios";
import { fetcchSimple } from "./user";
import useSWR from "swr";
export interface ICategoryList {
    id: number;
    name: string;
    isCreatedByUser: boolean;
    created_by: number;
    created_at: string;
    updated_at: string;
}

export function useCategories() {
    interface CategoriesResponse {
        results: ICategoryList[];
    }

    const { 
        data, 
        error, 
        isLoading, 
        isValidating, 
        mutate
    } = useSWR<CategoriesResponse>("/api/categories", fetcchSimple);
    return {
        data: data?.results,
        error,
        isLoading,
        isValidating,
        mutate
    }
}