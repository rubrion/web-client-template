import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react';

export interface ProjectType {
  id?: number;
  title: string;
  category: string;
  image: string;
  description: string;
}

interface ProjectCardProps {
  project: ProjectType;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardMedia
        component="div"
        sx={{
          pt: '56.25%', // 16:9 aspect ratio
          bgcolor: 'primary.light',
          backgroundImage: `url(${project.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {project.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {project.category}
        </Typography>
        <Typography variant="body2">{project.description}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
