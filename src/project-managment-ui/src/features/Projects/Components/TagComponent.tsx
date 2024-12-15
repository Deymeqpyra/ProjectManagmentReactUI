import { FC } from "react";
import { TagDto } from "../../../dto/TagDto";
import { ProjectService } from "../../Projects/Services/ProjectServices";
import { ProjectDto } from "../../../dto/ProjectDto";

interface TagProps {
  availableTags: TagDto[];
  selectedTag: string | null;
  setSelectedTag: (tagId: string | null) => void;
  projectId: string;
  projectTags: TagDto[]; 
  setError: (message: string | null) => void;
  setProjects: React.Dispatch<React.SetStateAction<ProjectDto[]>>;
}

const TagComponent: FC<TagProps> = ({
  availableTags,
  selectedTag,
  setSelectedTag,
  projectId,
  projectTags,
  setError,
  setProjects,
}) => {
  const tagsToDisplay = availableTags.filter(
    (tag) => !projectTags.some((projectTag) => projectTag.tagId === tag.tagId)
  );

  const handleAddTag = async () => {
    if (selectedTag) {
      try {
        // Add the selected tag to the project
        await ProjectService.addTagToProject(selectedTag, projectId);

        const tagToAdd = tagsToDisplay.find((tag) => tag.tagId === selectedTag);
        if (tagToAdd) {
          setProjects((prevProjects) =>
            prevProjects.map((project) =>
              project.projectId === projectId
                ? {
                    ...project,
                    tagProjects: [
                       ( 
                      project.tagProjects,
                      { tag: { tagId: tagToAdd.tagId, name: tagToAdd.name } })
                    ],
                  }
                : project
            )
          );
        }

        setSelectedTag(null); // Clear the selected tag after adding
      } catch (err) {
        setError("Failed to add the tag.");
      }
    } else {
      setError("Please select a tag first.");
    }
  };

  return (
    <div>
      <select
        value={selectedTag || ""}
        onChange={(e) => setSelectedTag(e.target.value)}
      >
        <option value="" disabled>Select a tag</option>
        {tagsToDisplay.map((tag) => (
          <option key={tag.tagId} value={tag.tagId}>
            {tag.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddTag} style={{ width: "15%"
       }}>
        +
      </button>
    </div>
  );
};

export default TagComponent;
