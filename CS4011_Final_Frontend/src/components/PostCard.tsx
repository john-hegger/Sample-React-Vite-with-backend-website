import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import { type BlogPost } from '../types';

interface PostCardProps {
    post: BlogPost;
    isEditing: boolean;
    onEdit: () => void;
    onUpdate: (data: { title: string; author: string; content: string }) => void;
    onCancelEdit: () => void;
}


const PostCard: React.FC<PostCardProps> = ({
    post,
    isEditing,
    onEdit,
    onUpdate,
    onCancelEdit,
}) => {
    const [title, setTitle] = useState(post.title);
    const [author, setAuthor] = useState(post.author);
    const [content, setContent] = useState(post.content);

    const handleSave = () => {
        onUpdate({ title, author, content });
    };

    if (isEditing) {
        return (
            <Card sx={{ backgroundColor: '#263343', color: 'white' }}>
                <CardContent>
                    <Stack spacing={2}>
                        <TextField
                            label="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            fullWidth
                        />
                        <TextField
                            label="Content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            multiline
                            rows={4}
                            fullWidth
                        />
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
                                Save
                            </Button>
                            <Button variant="outlined" color="secondary" startIcon={<CancelIcon />} onClick={onCancelEdit}>
                                Cancel
                            </Button>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card sx={{ backgroundColor: '#263343', color: 'white' }}>
            <CardContent>
                <Typography variant="h5">{post.title}</Typography>
                <Typography variant="subtitle1">By {post.author}</Typography>
                <Typography variant="body1" sx={{ mt: 2 }}>
                    {post.content}
                </Typography>
                <Button onClick={onEdit} sx={{ mt: 2 }} variant="outlined" color="info" startIcon={<EditIcon/> }>
                    Edit
                </Button>
            </CardContent>
        </Card>
    );
};

export default PostCard;

