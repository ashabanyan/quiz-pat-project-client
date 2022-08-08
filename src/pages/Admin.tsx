import { Button } from '@mui/material';
import React from 'react';
import { useHistory } from 'react-router-dom';

const AdminPage: React.FC = () => {
    const history = useHistory()

    const handleCreateQuizButton = () => history.push('/admin/quiz/create')

    return (
        <>
            <h1>Admin page</h1>
            <Button onClick={handleCreateQuizButton} variant="contained">Создать квиз</Button>
        </>
    )
}

export default AdminPage;