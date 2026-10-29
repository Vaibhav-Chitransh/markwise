import { z } from 'zod';

export const CreateBookmarkSchema = z.object({
    title: z.string().nonempty({message: "Title is required"}),
    description: z.string().nonempty({message: "Description is required"}),
    link: z.string().nonempty({message: "Link is required"}),
})