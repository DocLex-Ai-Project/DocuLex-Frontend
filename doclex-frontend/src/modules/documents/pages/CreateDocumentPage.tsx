import React, { useState, useRef } from 'react';
import DocumentEditor from "../pages/components/DocumentsEditor"; // Update path if needed
import axiosInstance from '../../../utils/axiosInstance';
import { enqueueSnackbar } from 'notistack';

const CreateDocumentPage = () => {
  const [documentContent, setDocumentContent] = useState('');
  

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

const handleSaveDraft = async () => {
  if (!documentContent) {
    alert("Cannot save! Please type a draft first.");
    return;
  }

  try {
    const res = await axiosInstance.post("/api/documents/create", {
      title: "Untitled Document",
      content: documentContent,
    });

    console.log("Saved document:", res.data);

    enqueueSnackbar("Draft saved successfully!", {
      variant: "success",
    });

  } catch (err) {
    console.error(err);

    enqueueSnackbar("Failed to save draft", {
      variant: "error",
    });
  }
};
  // --- NEW: Dedicated API Upload Handler ---
  const handleUploadFile = async() => {
    if (!uploadedFile) {
      alert("Please select a file first.");
      return;
    }

  const formData = new FormData();
  formData.append("file",uploadedFile)
   try{
    const res= await axiosInstance.post('api/documents/upload',formData);
     console.log('Sucess to upload the file');
     enqueueSnackbar('Sucessfully Uploaded Document We can view Doucment in my Documents for more information',{variant:'success'});
      setUploadedFile(null);
   }

   catch(err){
    console.log(err);
    enqueueSnackbar('Failed to upload internal server error',{variant:'error'});
   
   }
    
  
  };

  // File Validation and Handling
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate File Size (Maximum 5 MB)
    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      alert("File is too large. Maximum allowed size is 5 MB.");
      e.target.value = ''; 
      return;
    }

    // Validate File Type (.pdf, .doc, .docx)
    const allowedTypes = [
      'application/pdf', 
      'application/msword', 
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      alert("Invalid file type. Please upload only PDF or DOC/DOCX files.");
      e.target.value = ''; 
      return;
    }

    setUploadedFile(file);
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const removeUploadedFile = () => {
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      
      {/* Header section */}
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-semibold">
            Create Legal Document
          </h1>
          <p className="text-gray-500 mt-2">
            Draft your document from scratch or upload an existing one for AI review.
          </p>
        </div>

        {/* Action Buttons for the Manual Draft */}
        <div className="flex gap-3">
          <button 
            onClick={handleSaveDraft}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-md font-medium transition-colors"
          >
            Save Draft
          </button>
          <button 
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors shadow-sm"
          >
            Finalize Document
          </button>
        </div>
      </div>

      {/* Upload Section */}
      <div className="mb-8 p-6 bg-indigo-50 border border-indigo-100 rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          
          {/* Caution Text */}
          <div className="flex-1">
            <h3 className="text-indigo-900 font-semibold text-lg mb-1">
              Upload for AI Review
            </h3>
            <p className="text-indigo-700 text-sm">
              <span className="font-bold">Caution:</span> Please upload only digital, text-based documents for AI review. 
              Accepted formats are <span className="font-semibold">.pdf</span> and <span className="font-semibold">.docx</span>. 
              Maximum file size is <span className="font-semibold">5 MB</span>.
            </p>
          </div>

          {/* Upload Controls */}
          <div className="flex-shrink-0 flex flex-col items-end gap-3">
            <input 
              type="file" 
              accept=".pdf, .doc, .docx" 
              className="hidden" 
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            {!uploadedFile ? (
              <button 
                onClick={triggerFileUpload}
                className="px-4 py-2 bg-white border border-indigo-300 text-indigo-700 hover:bg-indigo-100 rounded-md font-medium transition-colors shadow-sm"
              >
                Choose File
              </button>
            ) : (
              <div className="flex items-center gap-3">
                {/* File Info Box */}
                <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-md border border-indigo-200 shadow-sm">
                  <span className="text-sm font-medium text-slate-700 truncate max-w-[150px]" title={uploadedFile.name}>
                    {uploadedFile.name}
                  </span>
                  <button 
                    onClick={removeUploadedFile}
                    className="text-red-500 hover:text-red-700 text-sm font-semibold transition-colors"
                    aria-label="Remove file"
                  >
                    ✕
                  </button>
                </div>
                
                {/* --- NEW: Dedicated Upload Button --- */}
                <button 
                  onClick={handleUploadFile}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-medium transition-colors shadow-sm"
                >
                  Upload Document
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-gray-400 font-medium text-sm uppercase tracking-wider">OR DRAFT MANUALLY</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      {/* The Editor */}
      <DocumentEditor 
        content={documentContent} 
        setContent={setDocumentContent} 
      />

    </div>
  );
};

export default CreateDocumentPage;