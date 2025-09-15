import { getUser } from "@/lib/auth.actions"
import { useQuery } from "@tanstack/react-query"

/**
 * Retreive current user
 */
export const useGetUser = () => {
    const result = useQuery({
        queryKey: ["USER"],
        queryFn: async () => await getUser()
    })

    console.log(result.data)

    return {
        user: result.data,
        ...result
    }
}
