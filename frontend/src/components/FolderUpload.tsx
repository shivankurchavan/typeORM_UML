import React from "react";


const FolderUpload: React.FC = () => {
  const handleFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => console.log(file.name));
    }
  };

  return (
    <div>
      <input type="file" {...({ webkitdirectory: "true" } as any)} multiple onChange={handleFiles} />
    </div>
  );
};

export default FolderUpload;
