import axios from "axios"
import useSWR from "swr"
import { fetcchSimple } from "./user"

export interface ISentenceList {
    id: number;
    sentence: string;
    translate: string;
    annotation: string;
    grammar: number;
    created_by: number;
    created_at: string;
    updated_at: string;
}

export interface ISentenceCreate {
    sentence: string;
    translate: string;
    annotation: string;
    grammar: number;
    created_by?: number;
}

export interface ISentenceUpdate {
    sentence?: string;
    translate?: string;
    annotation?: string;
    grammar?: number;
}

export function useSentences(grammarId: number | undefined) {
    interface SentenceReponse {
        results: ISentenceList[];
    }

    const { 
        data, 
        error, 
        isLoading, 
        isValidating, 
        mutate
    } = useSWR<SentenceReponse>(`/api/sentences/${grammarId}`, fetcchSimple);

    return {
        data: data?.results,
        error,
        isLoading,
        isValidating,
        mutate
    }
}

export async function createSentence({sentence, translate, annotation, grammar, created_by }:ISentenceCreate){
    interface ISentenceResponse{
        message: string
    }

    try {
        const res = await axios.post<ISentenceResponse>(`/api/sentences`, {sentence, translate, annotation, grammar, created_by})
        return res.data.message
    } catch (error: any) {
        throw new Error(error.message)
    }
}