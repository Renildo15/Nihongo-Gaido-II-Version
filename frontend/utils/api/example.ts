import axios from 'axios';
import useSWR from 'swr';
import { fetcchSimple } from './user';

export interface IExampleList {
    example: string;
    reading: string;
    meaning: string;
    annotation: string;
    wordId: number;
    createdAt: string;
    updatedAt: string;
    createdBy: number;
}

export interface IExampleCreate {
    example: string;
    reading: string;
    meaning: string;
    annotation: string;
    wordId: number;
}

export interface IExampleUpdate {
    example?: string;
    reading?: string;
    meaning?: string;
    annotation?: string;
    wordId?: number;
}

export function useExamples(wordId: number){
    interface IExampleResponse {
        results: IExampleList[];
    }

    const {
        data,
        error,
        isLoading,
        isValidating,
        mutate
    } = useSWR<IExampleResponse>(`/api/example/${wordId}`, fetcchSimple);

    return {
        data: data?.results,
        error,
        isLoading,
        isValidating,
        mutate
    }
}

export function useExample(exampleId: number){
    interface IExampleResponse {
        example: IExampleList;
    }

    const {
        data,
        error,
        isLoading,
        isValidating,
        mutate
    } = useSWR<IExampleResponse>(`/api/example/detail/${exampleId}`, fetcchSimple);

    return {
        data: data?.example,
        error,
        isLoading,
        isValidating,
        mutate
    }
}

export async function createExample(id : number, {example, reading, meaning, annotation, wordId}: IExampleCreate){
    interface IExampleResponse {
        message: string;
    }

    try {
        const res = await axios.post<IExampleResponse>(`/api/example/${id}`, {
            example,
            reading,
            meaning,
            annotation,
            wordId
        });

        return res.data.message;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function updateExample(exampleId: number, {example, reading, meaning, annotation, wordId}: IExampleUpdate){
    interface IExampleResponse {
        message: string;
    }

    try {
        const res = await axios.patch<IExampleResponse>(`/api/example/detail/${exampleId}`, {
            example,
            reading,
            meaning,
            annotation,
            wordId
        });

        return res.data.message;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export async function deleteExample(exampleId: number){
    interface IExampleResponse {
        message: string;
    }

    try {
        const res = await axios.delete<IExampleResponse>(`/api/example/detail/${exampleId}`);

        return res.data.message;
    } catch (error: any) {
        throw new Error(error.message);
    }
}