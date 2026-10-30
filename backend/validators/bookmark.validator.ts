import { z } from 'zod';

const BookmarkSchema = z.object({
    title: z.string().nonempty({message: "Title is required"}),
    description: z.string().nonempty({message: "Description is required"}),
    link: z.string().nonempty({message: "Link is required"}),
});

export default BookmarkSchema;