"use client";

import { useReducer } from "react";
import dynamic from "next/dynamic";
import "react-markdown-editor-lite/lib/index.css";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addArchive } from "@/lib/archive.client";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Lazy load UIW Markdown Editor
const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

interface InitState {
  title: string;
  slug: string;
  content: string;
  date: Date | undefined;
}

const initState: InitState = {
  title: "",
  slug: "",
  content: "",
  date: undefined,
};

type Action =
  | { type: "TITLE_UPDATE"; payload: string }
  | { type: "SLUG_UPDATE"; payload: string }
  | { type: "CONTENT_UPDATE"; payload: string }
  | { type: "DATE_UPDATE"; payload: Date | undefined }
  | { type: "RESET" };

function reducer(state: InitState, action: Action) {
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
    case "RESET":
      return initState;
    default:
      return state;
  }
}

export function AddArchiveSheet() {
  const [open, setOpen] = useState(false);

  const [state, dispatch] = useReducer(reducer, initState);

  // Auto-generate slug
  function updateTitleAndSlug(value: string) {
    dispatch({ type: "TITLE_UPDATE", payload: value });
    let generatedSlug = "";

    if (value) {
      generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-");
    }

    dispatch({ type: "SLUG_UPDATE", payload: generatedSlug });
  }

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
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
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      dispatch({ type: "RESET" });
      setOpen(false);
    },
  });

  async function handleSubmit() {
    const { title, slug, content, date } = state;
    if (!title || !slug || !content || !date) return;

    mutation.mutate();
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="secondary">Add Archive</Button>
      </SheetTrigger>
      <SheetContent side="right" className="md:min-w-2xl p-10">
        <SheetHeader>
          <SheetTitle>Add New Archive</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 m-3">
          <div className="space-y-2.5">
            <Label>Title</Label>
            <Input
              value={state.title}
              onChange={(e) => updateTitleAndSlug(e.target.value)}
            />
          </div>

          <div className="space-y-2.5">
            <Label>Slug (auto)</Label>
            <Input value={state.slug} readOnly />
          </div>

          <div className="space-y-2.5">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  data-empty={!state.date}
                  className="data-[empty=true]:text-muted-foreground w-54 md:w-[280px] justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {state.date ? (
                    format(state.date, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={state.date}
                  onSelect={(selectedDate) =>
                    dispatch({ type: "DATE_UPDATE", payload: selectedDate })
                  }
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <Label className="space-y-2.5">Content</Label>
            <MdEditor
              style={{ height: "300px" }}
              value={state.content}
              renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
              onChange={({ text }) =>
                dispatch({ type: "CONTENT_UPDATE", payload: text })
              }
            />
          </div>

          <Button onClick={handleSubmit} className="w-full">
            Add Article
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
