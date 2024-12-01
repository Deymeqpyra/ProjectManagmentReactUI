export interface CommentDto {
    id: string;           // UUID
    projectId: string;    // UUID
    commentMessage: string;
    userId: string;       // UUID
    createdAt: string;    // ISO 8601 DateTime
  }