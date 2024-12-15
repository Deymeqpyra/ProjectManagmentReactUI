// TagFilter.tsx
import React from 'react'
import { TagDto } from '../../../dto/TagDto'

interface TagFilterProps {
  availableTags: TagDto[]
  selectedTag: string | null
  setSelectedTag: React.Dispatch<React.SetStateAction<string | null>>
}

const TagFilter: React.FC<TagFilterProps> = ({ availableTags, selectedTag, setSelectedTag }) => {
  return (
    <div className="filter-container">
      <label htmlFor="tag-filter">Filter by Tag: </label>
      <select
        id="tag-filter"
        value={selectedTag || ''}
        onChange={(e) => setSelectedTag(e.target.value || null)}
      >
        <option value="">All</option>
        {availableTags.map((tag) => (
          <option key={tag.tagId} value={tag.name}>
            {tag.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default TagFilter
