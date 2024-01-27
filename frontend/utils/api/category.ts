import axios from "axios"
import useSWR from "swr"

import { fetcchSimple } from "./user"

export interface ICategoryList {
  id: number
  name: string
  isCreatedByUser: boolean
  created_by: number
  created_at: string
  updated_at: string
}

export function useCategories() {
  interface CategoriesResponse {
    results: ICategoryList[]
  }

  const { data, error, isLoading, isValidating, mutate } = useSWR<CategoriesResponse>("/api/categories", fetcchSimple)
  return {
    data: data?.results,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}
