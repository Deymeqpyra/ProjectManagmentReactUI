export interface ProjectDto {
    projectId: string;
    title: string;
    description: string;
    priority: {
      priorityId: string;
      name: string;
    };
    status: {
      statusId: string;
      statusName: string;
    };
    tagProjects: [{
      tag:{
        tagId: string;
        name: string;
      }}
    ]
  }
  