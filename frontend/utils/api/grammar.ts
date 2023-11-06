import axios from "axios";
import useSWR from "swr";
import { fetcchSimple } from "./user";

interface GrammarList {
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
        grammars: GrammarList[];
    }

    const { 
        data, 
        error, 
        isLoading, 
        isValidating, 
        mutate
    } = useSWR<GrammarsResponse>("/api/grammar", fetcchSimple);

    return {
        data: data?.grammars,
        error,
        isLoading,
        isValidating,
        mutate
    }
}