import { addArchive } from "@/lib/archive.client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useReducer } from "react";

interface State {
  title: string;
  slug: string;
  content: string;
  date: Date | undefined;
  isOpen: boolean;
}

const initState: State = {
  title: "",
  slug: "",
  content: "",
  date: undefined,
  isOpen: false,
};

type Action =
  | { type: "TITLE_UPDATE"; payload: string }
  | { type: "SLUG_UPDATE"; payload: string }
  | { type: "CONTENT_UPDATE"; payload: string }
  | { type: "DATE_UPDATE"; payload: Date | undefined }
  | { type: "TOGGLE_DRAWER"; payload: boolean }
  | { type: "RESET" };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "TITLE_UPDATE":
      return {
        ...state,
        title: action.payload,
      };
    case "SLUG_UPDATE":
      return {
        ...state,
        slug: action.payload,
      };
    case "CONTENT_UPDATE":
      return {
        ...state,
        content: action.payload,
      };
    case "DATE_UPDATE":
      return {
        ...state,
        date: action.payload as Date | undefined,
      };
    case "TOGGLE_DRAWER":
      return {
        ...state,
        isOpen: action.payload,
      };
    case "RESET":
      return initState;
    default:
      return state;
  }
}

export function useCreateArticle() {
  const [state, dispatch] = useReducer(reducer, initState);

  const queryClient = useQueryClient();

  // function to create article
  async function onMutation() {
    const { title, slug, content, date } = state;
    if (!date) return;

    const localISODate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    ).toISOString();

    await addArchive({
      title,
      slug,
      content,
      date: localISODate,
    });
  }

  const mutation = useMutation({
    mutationFn: onMutation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      dispatch({ type: "RESET" });
    },
  });

  return { state, dispatch, mutation };
}
