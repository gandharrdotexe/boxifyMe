
// import React, { useState } from "react";
// import { UploadCloud, X } from "lucide-react"; // Lucide icons
// import { useDropzone } from "react-dropzone"; // Drag-and-drop functionality
// import { Button } from "@/components/ui/button"; // shadcn Button component
// import Navbar from "./Navbar"; // Import the Navbar component

// const ImageUploadPage = () => {
//   const [files, setFiles] = useState([]);

//   // Handle file drop/upload
//   const onDrop = (acceptedFiles) => {
//     setFiles([...files, ...acceptedFiles]);
//   };

//   // Remove a file
//   const removeFile = (index) => {
//     const newFiles = files.filter((_, i) => i !== index);
//     setFiles(newFiles);
//   };
//   const handleReferenceObjectChange = (event) => {
//     setReferenceObject(event.target.value);
//   };
//   // Drag-and-drop zone configuration
//   const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

//   return (
//     <div className="min-h-screen bg-custom-primary">
//       {/* Navbar */}
//       <Navbar />

//       {/* Main Content */}
//       <div className="pt-16 px-8"> {/* Add padding-top to account for the fixed Navbar */}
//         {/* Header */}
//         <header className="my-11">
//           <div>
//           <h1 className="text-3xl font-bold text-custom-accent">Upload Your Object Photos</h1>
//           <p className="mt-2 text-custom-accent/80">Upload photos from multiple angles for accurate dimension measurement.
//           </p>
//           </div>
//           <div>
//               <label htmlFor="referenceObject" className="block text-sm font-medium text-custom-accent">
//                 Select Reference Object
//               </label>
//               <select
//                 id="referenceObject"
//                 value={referenceObject}
//                 onChange={handleReferenceObjectChange}
//                 className="mt-1 block w-full p-2 border border-custom-accent rounded-md shadow-sm focus:ring-custom-highlight focus:border-custom-highlight sm:text-sm"
//               >
//                 <option value="" disabled>
//                   Choose a reference object
//                 </option>
//                 <option value="coin">Coin</option>
//                 <option value="debitCard">Debit Card</option>
//               </select>
//             </div>
//         </header>

//         {/* Drag-and-Drop Zone */}
//         <div
//           {...getRootProps()}
//           className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
//             isDragActive
//               ? "border-custom-highlight bg-custom-secondary"
//               : "border-custom-highlight bg-custom-secondary"
//           }`}
//         >
//           <input {...getInputProps()} />
//           {files.length === 0 ? (
//             // Default content when no files are uploaded
//             <>
//               <UploadCloud className="mx-auto h-12 w-12 text-custom-accent" />
//               <p className="mt-2 text-custom-accent">
//                 {isDragActive ? "Drop the files here..." : "Drag and drop your images here"}
//               </p>
//               <p className="text-custom-accent/80">or</p>
//               <Button className="mt-4 bg-custom-highlight hover:bg-custom-accent text-custom-primary">
//                 Choose from Device
//               </Button>
//             </>
//           ) : (
//             // Display uploaded images inside the drag-and-drop zone
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//               {files.map((file, index) => (
//                 <div key={index} className="relative group">
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt={`uploaded-${index}`}
//                     className="w-full h-48 object-cover rounded-lg"
//                   />
//                   <button
//                     onClick={(e) => {
//                       e.stopPropagation(); // Prevent triggering the dropzone
//                       removeFile(index);
//                     }}
//                     className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-custom-primary opacity-0 group-hover:opacity-100 transition-opacity"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
//               ))}
              
//             </div>
//           )}
//         </div>
//         <Button className="mt-4 bg-custom-se bg-custom-accent hover:bg-custom-accent/90 text-custom-primary">
//                 Upload
//               </Button>
//       </div>
//     </div>
//   );
// };

// export default ImageUploadPage;
//for commit
import React, { useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import Navbar from "./Navbar";

const ImageUploadPage = () => {
  const [files, setFiles] = useState([]);
  const [referenceObject, setReferenceObject] = useState("");

  const onDrop = (acceptedFiles) => {
    setFiles([...files, ...acceptedFiles]);
  };

  const removeFile = (index) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
  };

  const handleReferenceObjectChange = (event) => {
    setReferenceObject(event.target.value);
  };

  const uploadFiles = () => {
    if (files.length === 0) {
      alert("Please upload at least one image.");
      return;
    }
    console.log("Uploading files:", files);
    // Implement upload logic here
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className="min-h-screen bg-custom-primary">
      <Navbar />
      <div className="pt-16 px-8">
        {/* <header className="my-11">
          <div>
            <h1 className="text-3xl font-bold text-custom-accent">Upload Your Object Photos</h1>
            <p className="mt-2 text-custom-accent/80">Upload photos from multiple angles for accurate dimension measurement.</p>
          </div>
            <div>
          <label htmlFor="referenceObject" className="block text-sm font-medium text-custom-accent mt-4">
            Select Reference Object
          </label>
          <select
            id="referenceObject"
            value={referenceObject}
            onChange={handleReferenceObjectChange}
            className="mt-1 block w-full p-2 border border-custom-accent rounded-md shadow-sm focus:ring-custom-highlight focus:border-custom-highlight sm:text-sm"
          >
            <option value="" disabled>Choose a reference object</option>
            <option value="coin">Coin</option>
            <option value="debitCard">Debit Card</option>
          </select>
        </div>
        </header> */}
        <header className="my-11 lg:flex items-center justify-between">
  <div>
    <h1 className="text-3xl font-bold text-custom-accent">Upload Your Object Photos</h1>
    <p className="mt-2 text-custom-accent/80">
      Upload photos from multiple angles for accurate dimension measurement.
    </p>
  </div>
  <div className="mt-4 lg:mt-0">
    <label htmlFor="referenceObject" className="block text-sm font-medium text-custom-accent">
      Select Reference Object
    </label>
    <select
      id="referenceObject"
      value={referenceObject}
      onChange={handleReferenceObjectChange}
      className="mt-1 block w-full p-2 border border-custom-accent rounded-md shadow-sm focus:ring-custom-highlight focus:border-custom-highlight sm:text-sm"
    >
      <option value="" disabled>Choose a reference object</option>
      <option value="coin">Coin</option>
      <option value="debitCard">Debit Card</option>
    </select>
  </div>
</header>


        <div
          {...getRootProps()}
          className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
            isDragActive ? "border-custom-highlight bg-custom-secondary" : "border-custom-highlight bg-custom-secondary"
          }`}
        >
          <input {...getInputProps()} />
          {files.length === 0 ? (
            <>
              <UploadCloud className="mx-auto h-12 w-12 text-custom-accent" />
              <p className="mt-2 text-custom-accent">{isDragActive ? "Drop the files here..." : "Drag and drop your images here"}</p>
              <p className="text-custom-accent/80">or</p>
              <Button onClick={() => document.querySelector('input[type="file"]').click()} className="mt-4 hover:bg-custom-highlight bg-custom-accent text-custom-primary">
                Choose from Device
              </Button>
            </>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {files.map((file, index) => (
                <div key={index} className="relative group">
                  <img src={URL.createObjectURL(file)} alt={`uploaded-${index}`} className="w-full h-48 object-cover rounded-lg" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-custom-primary opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <Button onClick={uploadFiles} className="mt-4 bg-custom-accent hover:bg-custom-accent/90 text-custom-primary">
          Upload
        </Button>
      </div>
    </div>
  );
};

export default ImageUploadPage;
