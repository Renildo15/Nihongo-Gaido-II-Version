import axios from "axios";
import useSWR from "swr";
import { fetcchSimple } from "./user";

export interface IGrammarList {
    id: number;
    grammar: string;
    structure: string;
    level: string;
    explain: string;
    created_by: number;
    created_at: string;
    updated_at: string;
}

export function useGrammars() {
    interface GrammarsResponse {
        results: IGrammarList[];
    }

    const { 
        data, 
        error, 
        isLoading, 
        isValidating, 
        mutate
    } = useSWR<GrammarsResponse>("/api/grammar", fetcchSimple);
    console.log(data);
    return {
        data: data?.results,
        error,
        isLoading,
        isValidating,
        mutate
    }
}