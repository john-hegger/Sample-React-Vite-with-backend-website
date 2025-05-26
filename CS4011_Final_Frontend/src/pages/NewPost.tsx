import React, { useState } from 'react';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Stack,
    Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { type BlogPost } from '../types';

const NewPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const newPost = { title, author, content };
            await axios.post<BlogPost>('http://localhost:3000/posts', newPost);
            navigate('/'); 
        } catch (err) {
            console.error('Failed to create post:', err);
            setError('Failed to create post. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    


    return (
        <Box
            sx={{
                backgroundColor: '#15202b',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                px: 2,
            }}
        >
            <Container maxWidth="sm">
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        backgroundColor: '#1e2a38',
                        p: 4,
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    <Typography variant="h5" color="white">
                        Create New Post
                    </Typography>

                    {error && <Alert severity="error">{error}</Alert>}

                    <TextField
                        label="Title"
                        variant="outlined"
                        fullWidth
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        disabled={loading}
                    />
                    <TextField
                        label="Author"
                        variant="outlined"
                        fullWidth
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        disabled={loading}
                    />
                    <TextField
                        label="Content"
                        variant="outlined"
                        fullWidth
                        required
                        multiline
                        minRows={6}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        disabled={loading}
                    />

                    <Stack direction="row" justifyContent="space-between">
                        <Button
                            variant="contained"
                            type="submit"
                            color="primary"
                            disabled={loading}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => navigate('/')}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
};

export default NewPost;
