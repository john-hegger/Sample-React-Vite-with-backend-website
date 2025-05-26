import React, { useEffect, useState } from 'react';
import { Box, Button, Typography, Alert, Stack, IconButton, CircularProgress } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import PostCard from '../components/PostCard';
import { fetchPosts, updatePost, deletePost } from '../services/api';
import { type BlogPost } from '../types';
import { useNavigate } from 'react-router';

const BlogPage: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
    const [editPostId, setEditPostId] = useState<string | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true);
        fetchPosts()
            .then(setPosts)
            .catch(() => setError('Failed to load posts'))
            .finally(() => setLoading(false));
    }, []);


        const handleAdd = () => {
            navigate('/new')
        }

        const handleDelete = async (id: string) => {
            try {
                await deletePost(id);
                setPosts((prev) => prev.filter((p) => p.id !== id));
                setDeleteConfirmId(null);
            } catch {
                setError('Failed to delete post');
            }
        };

    const handleUpdate = async (id: string, data: { title: string, author: string, content: string }) => {
        try {
            const updatedPost = await updatePost(id, data);
            
            setPosts((prev) =>
                prev.map((post) => (post.id === id ? updatedPost : post))
            );
            setEditPostId(null); 
        } catch {
            setError('Error updating post.');
        }
        };

        const triggerDeleteConfirm = (id: string) => {
            setDeleteConfirmId(id);
        };

        const cancelDelete = () => {
            setDeleteConfirmId(null);
        };

        return (
            <Box
                sx={{
                    backgroundColor: '#15202b',
                    minHeight: '100vh',
                    py: 4,
                    px: 2,
                    display: 'flex',
                    gap: 4,
                }}
            >
                {/* Title and New Post button */}
                <Box
                    sx={{
                        width: 240,
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'white',
                    }}
                >
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        Bob Loblaw's Law Blog
                    </Typography>
                    <Button variant="contained"
                        color="primary"
                        sx={{ mb: 1 }}
                        onClick={handleAdd}>
                        New Post
                    </Button>
                </Box>

                {/* Main content */}
                <Box
                    sx={{
                        flexGrow: 1,
                        overflowY: 'auto',
                        maxHeight: 'calc(100vh - 64px)',
                    }}
                >
                    <Stack spacing={2} sx={{ maxWidth: 600, margin: '0 auto' }}>
                        {loading && <CircularProgress color="inherit" />}
                        {error && <Alert severity="error">{error}</Alert>}
                        {!loading && posts.length === 0 && (
                            <Typography variant="h6" color="gray" textAlign="center">
                                No blog posts right now.
                            </Typography>
                        )}


                        {posts.map((post) => (
                            <Box
                                key={post.id}
                                sx={{
                                    position: 'relative',
                                    backgroundColor: '#1e2a38',
                                    borderRadius: 2,
                                    p: 2,
                                }}
                            >
                                <PostCard
                                    post={post}
                                    isEditing={editPostId === post.id}
                                    onEdit={() => setEditPostId(post.id)}
                                    onUpdate={(data) => handleUpdate(post.id, data)}
                                    onCancelEdit={() => setEditPostId(null)}
                                />
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 8,
                                        right: 8,
                                        display: 'flex',
                                        gap: 1,
                                    }}
                                >
                                    
                                    <IconButton
                                        onClick={() => triggerDeleteConfirm(post.id)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                </Box>

                <Dialog open={!!deleteConfirmId} onClose={cancelDelete}>
                    <DialogTitle>Delete Post</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this blog post? This action cannot be undone.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={cancelDelete} color="primary">
                            Cancel
                        </Button>
                        <Button
                            onClick={() => handleDelete(deleteConfirmId!)}
                            color="error"
                            variant="contained"
                        >
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>

            </Box>
        );
    };


export default BlogPage;
