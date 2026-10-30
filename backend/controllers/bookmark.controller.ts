import type { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import BookmarkSchema from "../validators/bookmark.validator";

export const CreateBookmark = async (req : Request, res : Response) => {
    const validationResult = BookmarkSchema.safeParse(req.body);
    if(!validationResult.success) return res.status(400).json({message: "Invalid Inputs", details: validationResult.error.format()});

    const {title, description, link} = validationResult.data;
    const userId = (req as any).userId;

    const getLogo = await fetch(`https://www.google.com/s2/favicons?domain=${link}&sz=128`);
    const logo = getLogo?.url || "";

    const newBookmark = await prisma.bookmark.create({
        data: {
            title,
            description,
            logo,
            link,
            userId
        },
        select: {id: true}
    })

    return res.status(200).json({message: "New Bookmark added", id: newBookmark.id});
}

export const GetAllBookmarks = async (req : Request, res : Response) => {
    const userId = (req as any).userId;
    const bookmarks = await prisma.bookmark.findMany({where: {userId: userId}});

    return res.status(200).json({bookmarks});
}

export const GetBookmarkGivenId = async (req : Request, res : Response) => {
    const userId = (req as any).userId;
    const bookmarkId = parseInt((req as any).params.id);
    const bookmark = await prisma.bookmark.findUnique({where: {id: bookmarkId, userId: userId}});

    return res.status(200).json({bookmark});
}

export const UpdateBookmark = async (req : Request, res : Response) => {
    const validationResult = BookmarkSchema.safeParse(req.body);
    if(!validationResult.success) return res.status(400).json({message: "Invalid Inputs", details: validationResult.error.format()});

    const {title, description, link} = validationResult.data;
    const userId = (req as any).userId;
    const bookmarkId = parseInt((req as any).params.id);

    const bookmark = await prisma.bookmark.findUnique({where: {userId: userId, id: bookmarkId}});
    if(!bookmark) return res.status(404).json({message: "Bookmark not found or you are not authorized to update it"});

    const getLogo = await fetch(`https://www.google.com/s2/favicons?domain=${link}&sz=128`);
    const logo = getLogo?.url || "";

    const updatedBookmark = await prisma.bookmark.update({where: {userId: userId, id: bookmarkId}, data: {title, description, link, logo}});
    return res.status(200).json({message: "Bookmark updated successfully", bookmark: updatedBookmark});
}

export const DeleteBookmark = async (req : Request, res : Response) => {
    const userId = (req as any).userId;
    const bookmarkId = parseInt((req as any).params.id);

    const bookmark = await prisma.bookmark.findUnique({where: {userId: userId, id: bookmarkId}});
    if(!bookmark) return res.status(404).json({message: "Bookmark not found or you are not authorized to delete it"});

    const deletedBookmark = await prisma.bookmark.delete({where: {userId: userId, id: bookmarkId}});
    return res.status(200).json({message: "Bookmark deleted successfully", bookmark: deletedBookmark});
}

export const IncrementVisitedCount = async (req : Request, res : Response) => {
    const userId = (req as any).userId;
    const bookmarkId = parseInt((req as any).params.id);

    const bookmark = await prisma.bookmark.findUnique({where: {userId: userId, id: bookmarkId}});
    if(!bookmark) return res.status(404).json({message: "Bookmark not found or you are not authorized to udpate the visited count"});

    let currentVisitedCount = bookmark.visitedCount;

    const updateVisitedCount = await prisma.bookmark.update({where: {userId: userId, id: bookmarkId}, data: {visitedCount: currentVisitedCount + 1}});
    return res.status(200).json({message: "Incremented Visited Count", bookmark: updateVisitedCount});
}